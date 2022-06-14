import React from 'react';
import ReactDOM from 'react-dom';

import { FacebookLoginWithButton } from '../src';

ReactDOM.render(
  <FacebookLoginWithButton
    appId="xxxxxxxxxxx"
    callback={console.log}
    autoLoad={false}
  />,
  document.getElementById('demo'),
);

if (module.hot) {
  module.hot.accept();
}
