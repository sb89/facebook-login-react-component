# facebook-login-react-component

> A React component for Facebook Login

## Background

This component is based on the code found [here](https://github.com/keppelen/react-facebook-login). When I tried to use that component in my project it didn't work for React 17 and it seems like it is no longer maintained, therefore I created this project. This allowed me to use it in my project and as a way to learn how to build React components.

I'm not attempting to pass this off as my own and I'm willing remove this package when the original is maintained.


## Getting Started
- `yarn add facebook-login-react` or `npm install facebook-login-react`

## Development
```shell
git clone https://github.com/sb89/facebook-login-react-component.git && cd facebook-login-react-component
npm install
npm start
```

- navigate to https://localhost:3000/

## How to Use

### Basic button with styling

```js
import React from 'react';
import ReactDOM from 'react-dom';
import { FacebookLoginWithButton } from 'facebook-login-react';

const responseFacebook = (response) => {
  console.log(response);
}

ReactDOM.render(
  <FacebookLoginWithButton
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    onClick={componentClicked}
    callback={responseFacebook} />,
  document.getElementById('demo')
);
```

### Facebook button without styling

```js
import { FacebookLogin } from 'facebook-login-react'

<FacebookLogin
  appId="1088597931155576"
  autoLoad
  callback={responseFacebook}
  render={renderProps => (
    <button onClick={renderProps.onClick}>This is my custom FB button</button>
  )}
/>
```

The `render` function will be passed the following properties for you to use:

- `onClick`
- `isDisabled`
- `isProcessing`
- `isSdkLoaded`

### Custom CSS Class and Icon

By default fontawesome is included, If you don't want to use default fontawesome icons, you can send an element in icon attribute

Fontawesome example:
```js

import React from 'react';
import ReactDOM from 'react-dom';
import { FacebookLoginWithButton } from 'facebook-login-react';

const responseFacebook = (response) => {
  console.log(response);
}

ReactDOM.render(
  <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon="fa-facebook"
  />,
  document.getElementById('demo')
);
```

Custom element example:
```js

import React from 'react';
import ReactDOM from 'react-dom';
import { FacebookLoginWithButton } from 'facebook-login-react';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';

const responseFacebook = (response) => {
  console.log(response);
}

ReactDOM.render(
  <FacebookLogin
    appId="1088597931155576"
    autoLoad={true}
    fields="name,email,picture"
    callback={responseFacebook}
    cssClass="my-facebook-button-class"
    icon={<TiSocialFacebookCircular />}
  />,
  document.getElementById('demo')
);
```

### Custom permission
By default the component, request only 'public_profile' permission, you can change if you send 'scope', that is a string comma separated attribute.

see https://developers.facebook.com/docs/facebook-login/permissions for permissions list

```js
  import React from 'react';
  import { FacebookLoginWithButton } from 'facebook-login-react';

  class MyComponent extends React.Component {
    responseFacebook(response) {
      console.log(response);
    }

    render() {
      return (
        <FacebookLogin
          appId="1088597931155576"
          autoLoad={true}
          fields="name,email,picture"
          scope="public_profile,user_friends,user_actions.books"
          callback={this.responseFacebook}
        />
      )
    }
  }

  export default MyComponent;
```

## Parameters
|    params    |     value           |                default value                        |
|:------------:|:-------------------:|:---------------------------------------------------:|
|     appId    |     string          |                Required                             |
|     size     |     string          |              small - medium - metro                 |
|     scope    |     string          |      public_profile, email, user_birthday           |
|     fields   |     string          |              name,email,picture                     |
|   callback   |     function        |             resultFacebookLogin                     |
| returnScopes |     boolean         |                  false                              |
|   autoLoad   |     boolean         |                  false                              |
|     xfbml    |     boolean         |                  false                              |
|    cookie    |     boolean         |                  false                              |
|   textButton |     string          |           Login with Facebook                       |
|   cssClass   |     string          | kep-login-facebook kep-login-facebook-[button-size] |
| redirectUri  |     string          |               window.location.href (mobile-only)    |
|   version    |     string          |                  9.0                                |
|   icon       |     string|element  |                  none                               |
|   language   |     string          |                  en_US                              |
|   onClick    |     function        |                  Initial click on the component     |
|   isMobile   |     boolean         |                  detected via userAgent             |
| disableMobileRedirect |    boolean     |                        false                        | set to true for popup authentication on mobile devices |
|   isDisabled |     boolean         |                  false                          |
|     tag      |     string          |                  HTML Element, Ex: 'a', 'button'             |
|   onFailure  |     function        | optional function to separatere the failed init     |
|   state  |     string        | optional string to maintain state between the request and callback. This parameter should be used for preventing Cross-site Request Forgery and will be passed back to you, unchanged, in your redirect URI     |
| authType | string | optional string to change authentication type |
| responseType | string | optional string to change response type. Default value is 'code' |