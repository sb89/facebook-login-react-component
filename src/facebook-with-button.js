/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles/facebook.scss';

import FacebookLogin from './facebook';

const shouldAddDisabledProp = (tag) => [
  'button',
  'input',
  'select',
  'textarea',
  'optgroup',
  'option',
  'fieldset',
].indexOf((tag).toLowerCase()) >= 0;

const FacebookLoginWithButton = (props) => {
  const style = () => {
    const defaultCSS = 'kep-login-facebook';

    if (props.cssClass === defaultCSS) {
      return <style dangerouslySetInnerHTML={{ __html: styles }} />;
    }
    return false;
  };

  const containerStyle = (renderProps) => {
    const { isProcessing, isSdkLoaded, isDisabled } = renderProps;

    const containterStyle = { transition: 'opacity 0.5s' };
    if (isProcessing || !isSdkLoaded || isDisabled) {
      style.opacity = 0.6;
    }

    return Object.assign(containterStyle, props.containerStyle);
  };

  const renderButton = (renderProps) => {
    const {
      cssClass, size, icon, textButton, typeButton, buttonStyle,
    } = props;

    const { onClick, isDisabled } = renderProps;

    const isIconString = typeof icon === 'string';
    const optionalProps = {};
    if (isDisabled && shouldAddDisabledProp(props.tag)) {
      optionalProps.disabled = true;
    }

    return (
      <span style={containerStyle(renderProps)}>
        {isIconString && (
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
          />
        )}

        <props.tag
          type={typeButton}
          className={`${cssClass} ${size}`}
          style={buttonStyle}
          onClick={onClick}
          {...optionalProps}
        >
          {icon && isIconString && (
            <i className={`fa ${icon}`} />
          )}
          {icon && !isIconString && icon}
          {textButton}
        </props.tag>
        {style()}
      </span>
    );
  };

  return (
    <FacebookLogin {...props} render={(renderProps) => renderButton(renderProps)} />
  );
};

FacebookLoginWithButton.defaultProps = {
  textButton: 'Login with Facebook',
  typeButton: 'button',
  size: 'metro',
  fields: 'name',
  cssClass: 'kep-login-facebook',
  tag: 'button',
  buttonStyle: {},
  containerStyle: {},
  icon: null,
};

FacebookLoginWithButton.propTypes = {
  textButton: PropTypes.string,
  typeButton: PropTypes.string,
  size: PropTypes.string,
  cssClass: PropTypes.string,
  icon: PropTypes.any, /* eslint-disable-line react/forbid-prop-types */
  fields: PropTypes.string,
  containerStyle: PropTypes.objectOf(PropTypes.any),
  buttonStyle: PropTypes.objectOf(PropTypes.any),
  tag: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default FacebookLoginWithButton;