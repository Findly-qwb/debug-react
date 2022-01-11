/*
 * @Author:  Findly <wenbinqiu42@gmail.com>
 * @Date: 2021-12-30 09:57:01
 * @LastEditors: Findly
 * @LastEditTime: 2022-01-11 17:20:13
 * @Description:
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';

// ReactDOM.render(
// 	<React.StrictMode>
// 		<App />
// 	</React.StrictMode>,
// 	document.getElementById('root')
// );
// TODO: 开启时间切片模式，这样浏览器就有剩余时间执行样式布局和样式绘制，减少掉帧的可能性。
ReactDOM.unstable_createRoot(document.getElementById('root')).render(
	<h3>
		<p>Findly</p>
	</h3>
);
