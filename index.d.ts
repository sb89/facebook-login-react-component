// Type definitions for facebook-login-react-component
// Project: facebook-login-react-component
// Definitions by: Steven Blake

import * as React from 'react';

export interface RenderProps {
    onClick(): void
}

export interface FacebookFailureResponse {
  status?: string;
}

export interface FacebookLoginInfo {
  first_name: string;
  last_name: string;
  email?: string;
  picture?: {
    data: {
      height?: number;
      is_silhouette?: boolean;
      url?: string;
      width?: number;
    }
  },
  birthday: string;
  id: string;
  "accessToken": string;
  "userID": string;
  "expiresIn": number;
  "signedRequest": string;
  "graphDomain": string;
  "data_access_expiration_time": number;
}

interface FacebookLoginSharedProps {
  appId: string;
  callback(userInfo: FacebookLoginInfo | FacebookFailureResponse): void;
  onFailure?(response: FacebookFailureResponse): void;
  autoLoad?: boolean;
  cookie?: boolean;
  disableMobileRedirect?: boolean;
  fields?: string;
  isDisabled?: boolean;
  language?: string;
  onClick?(event: React.MouseEvent<HTMLDivElement>): void;
  reAuthenticate?: boolean;
  redirectUri?: string;
  scope?: string;
  version?: string;
  xfbml?: boolean;
  isMobile?: boolean;
  returnScopes?: boolean;
  state?: string;
  authType?: string;
  responseType?: string;
};

export interface FacebookLoginProps extends FacebookLoginSharedProps {
    render(renderProps: RenderProps): React.ReactNode;
}

export interface FacebookLoginWithButtonProps extends FacebookLoginSharedProps {
  buttonStyle?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
  cssClass?: string;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "metro";
  textButton?: string;
  typeButton?: string;
  tag?: Node | React.Component<any>;
}

export const FacebookLogin: React.FunctionComponent<FacebookLoginProps>

export const FacebookLoginWithButton: React.FunctionComponent<FacebookLoginWithButtonProps>
