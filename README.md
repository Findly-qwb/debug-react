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

  ![image-20211230140135472](https://raw.githubusercontent.com/dianmaomao/Pic/main/image-20211230140135472.png)



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





##### 最后一步：解决报错 ‼️

> ⚠️ 注意：这些配置修改仅在17.0.2版本（2021-12-30）有效，不敢保证其他版本通用，如果一通配置后还是无法跑通项目，建议百度谷歌

+ 添加 `ReactFiberHostConfig` 引用

  + 直接修改`src/react/packages/react-reconciler/src/ReactFiberHostConfig.js`文件

    ```js
    //import invariant from 'shared/invariant';
    // invariant(false, 'This module must be shimmed by a specific renderer.');
    
    export * from './forks/ReactFiberHostConfig.dom'
    
    ```

+ 修改`src/react/packages/shared/ReactSharedInternals.js`

  ```js
  // import * as React from 'react';
  
  // const ReactSharedInternals =
  //   React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  import ReactSharedInternals from '../react/src/ReactSharedInternals';
  export default ReactSharedInternals;
  ```

+ 修改 `src/react/packages/shared/invariant.js`

  ```js
  // 加上condition判断
  export default function invariant(condition, format, a, b, c, d, e, f) {
    if (condition) return;
    throw new Error(
      'Internal React error: invariant() is meant to be replaced at compile ' +
        'time. There is no runtime version.',
    );
  }
  
  ```

+ 修改`src/react/.eslintrc.json`文件，主要去除`extends和plugin`的`fbjs`和`react`
   ![image-20211230145550476](https://raw.githubusercontent.com/dianmaomao/Pic/main/image-20211230145550476.png)
   
+ 另外如果有其他`react-internal`,找到对应的`eslint`规则注释一下就好了

#### 成果

就这样，在一通百度谷歌之后，解决了各种报错问题等疑难杂症之后。我们的调试环境就搭建完成了，可以在 react 源码中通过 `debugger` 打断点或者 `console.log()` 输出日志进行愉快地调试了！

![image-20211230150748962](https://raw.githubusercontent.com/dianmaomao/Pic/main/image-20211230150748962.png)

最后贴一下我搭建的调试环境的 github 地址：[my-debug-react](https://github.com/dianmaomao/debug-react)，不想自己搭建调试环境的话可以直接 clone 我搭好的环境使用。

