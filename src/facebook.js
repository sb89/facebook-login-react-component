import { useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';

const getIsMobile = () => {
  let isMobile = false;

  try {
    isMobile = !!((window.navigator && window.navigator.standalone) || navigator.userAgent.match('CriOS') || navigator.userAgent.match(/mobile/i));
  } catch (ex) {
    // continue regardless of error
  }

  return isMobile;
};

const FacebookLogin = ({
  appId,
  render,
  autoLoad,
  callback,
  onFailure = null,
  scope = 'public_profile,email',
  returnScopes = false,
  authType = '',
  fields = 'name',
  isMobile = getIsMobile(),
  disableMobileRedirect = false,
  redirectUri = typeof window !== 'undefined' ? window.location.href : '/',
  state = 'facebookdirect',
  responseType = 'code',
  language = 'en_US',
  isDisabled = false,
  xfbml = false,
  cookie = false,
  version = '9.0',
  onClick = null,
}) => {
  const [isSdkLoaded, setIsSdkLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const isMounted = useRef(false);

  const loadSdkAsynchronously = () => {
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element;
      let js = element;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = `https://connect.facebook.net/${language}/sdk.js`;
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  };

  const responseApi = (authResponse) => {
    window.FB.api('/me', { locale: 'en', fields }, (me) => {
      Object.assign(me, authResponse);
      callback(me);
    });
  };

  const checkLoginState = (response) => {
    if (isMounted.current) {
      setIsProcessing(false);
    }

    if (response.authResponse) {
      responseApi(response.authResponse);
    } else if (onFailure) {
      onFailure({ status: response.status });
    } else {
      callback({ status: response.status });
    }
  };

  const checkLoginAfterRefresh = (response) => {
    if (response.status === 'connected') {
      checkLoginState(response);
    } else {
      window.FB.login((loginResponse) => checkLoginState(loginResponse), true);
    }
  };

  const isRedirectedFromFb = () => {
    const params = new URLSearchParams(window.location.search);

    return (
      params.get('state') === 'facebookdirect' && (params.get('code') || params.get('granted_scopes'))
    );
  };

  const setFbAsyncInit = () => {
    window.fbAsyncInit = () => {
      window.FB.init({
        version: `v${version}`,
        appId,
        xfbml,
        cookie,
      });

      if (isMounted.current) {
        setIsSdkLoaded(true);
      }

      if (autoLoad || isRedirectedFromFb()) {
        window.FB.getLoginStatus(checkLoginAfterRefresh);
      }
    };
  };

  const click = (e) => {
    if (!isSdkLoaded || isProcessing || isDisabled) {
      return;
    }

    setIsProcessing(true);

    if (onClick) {
      onClick(e);
      if (e.defaultPrevented) {
        setIsProcessing(false);
        return;
      }
    }

    if (isMobile && !disableMobileRedirect) {
      const params = {
        client_id: appId,
        redirect_uri: redirectUri,
        state,
        return_scopes: returnScopes,
        scope,
        response_type: responseType,
        auth_type: authType,
      };

      const paramsString = new URLSearchParams(params).toString();
      window.location.href = `https://www.facebook.com/dialog/oauth?${paramsString}`;
    } else {
      if (!window.FB) {
        if (onFailure) {
          onFailure({ status: 'facebookNotLoaded' });
        }

        return;
      }

      window.FB.getLoginStatus((response) => {
        if (response.status === 'connected') {
          checkLoginState(response);
        } else {
          window.FB.login(checkLoginState, {
            scope, return_scopes: returnScopes, auth_type: authType,
          });
        }
      });
    }
  };

  useEffect(() => {
    isMounted.current = true;
    if (document.getElementById('facebook-jssdk')) {
      setIsSdkLoaded(true);
      return;
    }

    setFbAsyncInit();
    loadSdkAsynchronously();
    let fbRoot = document.getElementById('fb-root');
    if (!fbRoot) {
      fbRoot = document.createElement('div');
      fbRoot.id = 'fb-root';
      document.body.appendChild(fbRoot);
    }

    return () => { /* eslint-disable-line */
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (isSdkLoaded && autoLoad) {
      window.FB.getLoginStatus(checkLoginAfterRefresh);
    }
  }, [autoLoad]);

  const propsForRender = {
    onClick: click,
    isDisabled,
    isProcessing,
    isSdkLoaded,
  };

  if (!render) {
    throw new Error('ReactFacebookLogin requires a render proper to render');
  }

  return render(propsForRender);
};

FacebookLogin.propTypes = {
  appId: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  autoLoad: PropTypes.bool.isRequired,
  callback: PropTypes.func.isRequired,
  onFailure: PropTypes.func,
  scope: PropTypes.string,
  returnScopes: PropTypes.bool,
  authType: PropTypes.string,
  fields: PropTypes.string,
  isMobile: PropTypes.bool,
  disableMobileRedirect: PropTypes.bool,
  redirectUri: PropTypes.string,
  state: PropTypes.string,
  responseType: PropTypes.string,
  language: PropTypes.string,
  isDisabled: PropTypes.bool,
  xfbml: PropTypes.bool,
  cookie: PropTypes.bool,
  version: PropTypes.string,
  onClick: PropTypes.func,
};

export default FacebookLogin;
