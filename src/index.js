import React from 'react'; // 比如引入的依赖
import ReactDOM from 'react-dom'; // 比如引入的依赖
import './assets/css/index.css'; // 入口文件index样式
import App from './App'; // 根组件

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
