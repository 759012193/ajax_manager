import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// 1. 引入状态管理
import {Provider} from 'react-redux'
import store from './store/index'

ReactDOM.render(
     <Provider store={store}>
         <App />
     </Provider>,
  document.getElementById('root')
);