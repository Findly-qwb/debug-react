#### 调试源码

##### 第一步 ： 创建一个react项目

+ 首先通过官方脚手架 create-react-app 创建一个 react 项目，在终端执行以下命令

  ```shell
  npx create-react-app my-debug-react
  ```

+ 暴露`webpack.config.js`配置

  ```shell
  # 会得到一个config文件夹，里面就是react的webpack配置文件
  cd ./my-debug-react
  yarn eject 
  
  # 出现交互命令选择y即可
  ```

  <img src="../../../Library/Application%20Support/typora-user-images/image-20211230140135472.png" alt="image-20211230140135472" style="zoom: 50%;" />



##### 第二步：修改`react`引用

 + 由于 node_modules 中的 react 包是打包好之后的文件，许多代码掺杂在一个文件中，不便于我们对源码进行调试。因此在 my-debug-react 的 src 目录下引入 react 的源码

   ```shell
   # 加me. 是因为我配置了个人github key
   git clone git clone git@me.github.com:facebook/react.git -b 17.0.2 
   
   # 接下来进入到src/react安装依赖
   cd ./src/react 
   yarn 
   ```

 + 修改`webpack.config.js`内`alias`配置，加上如下配置：

   ```js
   'react': path.resolve(__dirname, '../src/react/packages/react'),
   'react-dom': path.resolve(__dirname, '../src/react/packages/react-dom'),
   'shared': path.resolve(__dirname, '../src/react/packages/shared'),
   'react-reconciler': path.resolve(__dirname, '../src/react/packages/react-reconciler'),
   ```

 + 我们将 `__DEV__` 等环境变量默认启用，便于开发调试,修改`config/env.js`,修改为如下配置：

   ```js
   const stringified = {
   		__DEV__: true,
   		__PROFILE__: true,
   		__UMD__: true,
   		__EXPERIMENTAL__: true,
   		'process.env': Object.keys(raw).reduce((env, key) => {
   			env[key] = JSON.stringify(raw[key]);
   			return env;
   		}, {}),
   	};
   ```

 + 根目录下新建`.eslintrc.json`文件，加入如下配置:

   ```js
   {
   	"extends": "react-app",
   	"globals": {
   		"__DEV__": true,
   		"__PROFILE__": true,
   		"__UMD__": true,
   		"__EXPERIMENTAL__": true
   	}
   }
   
   ```

 + 在react的入口文件`index.js`中修改`react、react-dom`的引入方式

   ```js
   //import React from 'react';
   //import ReactDOM from 'react-dom';
   import * as React from 'react';
   import * as ReactDOM from 'react-dom';
   ```

   

