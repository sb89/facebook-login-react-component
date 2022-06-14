// Type definitions for facebook-login-react-component
// Project: facebook-login-react-component
// Definitions by: Steven Blake

import * as React from 'react';

export interface RenderProps {
    onClick(): void
}

export interface FacebookLoginProps {
    appId: string;
    callback(userInfo: FacebookLoginInfo | FacebookFailureResponse): void;
    onFailure?(response: FacebookFailureResponse): void;
    render?(renderProps: RenderProps): React.ReactNode;
    autoLoad?: boolean;
    buttonStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
    cookie?: boolean;
    cssClass?: string;
    disableMobileRedirect?: boolean;
    fields?: string;
    icon?: React.ReactNode;
    isDisabled?: boolean;
    language?: string;
    onClick?(event: React.MouseEvent<HTMLDivElement>): void;
    reAuthenticate?: boolean;
    redirectUri?: string;
    scope?: string;
    size?: "small" | "medium" | "metro";
    textButton?: string;
    typeButton?: string;
    version?: string;
    xfbml?: boolean;
    isMobile?: boolean;
    tag?: Node | React.Component<any>;
    returnScopes?: boolean;
    state?: string;
    authType?: string;
    responseType?: string;
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

export const FacebookLogin: React.FunctionComponent<FacebookLoginProps>

export const FacebookLoginWithButton: React.FunctionComponent<FacebookLoginProps>