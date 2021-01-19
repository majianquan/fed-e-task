import React from 'react';
import ReactDOM from 'react-dom';
import AppleBasket from './components/AppleBasket';
import store from './stores/AppleStore';

import { Provider } from 'mobx-react';


ReactDOM.render(
  <Provider store={store}>
    <AppleBasket />
  </Provider>,
  document.getElementById('root')
);
