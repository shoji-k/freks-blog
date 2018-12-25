---
title: "webpack-dev-serverのhot reloadが動かなかった際の対策"
date: "2018-12-26"
---

webpackの[Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)(HMR)を導入してたのですが、毎回リロードがかかってたので直しました  

使ってた環境は  

- webpack v.4.28.2
- webpack-cli v.3.1.2
- webpack-dev-server v.3.1.14

webpack.config.jsを設定  

```
module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: '0.0.0.0',
    port: 8080,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ]
}
```

*公開ディレクトリをpublicにしてます

webpack-dev-serverの起動は

```
$ webpack-dev-server --inline --history-api-fallback --disable-host-check
```

でやってました  
起点のindex.jsで  

```
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configure from './store'
import App from './containers/App'

const store = configure()

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    render()
  })
}

render()
```

としたところで、起動してみましたが、ログは正しく出ますが、画面が変わらず..

ログ

![hmr log](/react_hot_module_replacement/hmr_log.png)

GitHub Issueの  
[webpack\-dev\-sever HMR do not works, only working full reload behavior · Issue \#1315 · webpack/webpack\-dev\-server](https://github.com/webpack/webpack-dev-server/issues/1315)  
を参考に  

```
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import configure from './store'
import App from './containers/App'

const store = configure()

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
    document.getElementById('root')
  )
}

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const nextApp = require('./containers/App').default
    render(nextApp)
  })
}

render(App)
```

とすると直りました！！

また、reducerの変更もHMRで部分的に読み込み直したかったら  
storeの設定のところで  

```
import reducers from '../reducers'

// 省略

const store = createStore(reducers, initialState, enhancer)

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const newRootReducer = require('../reducers').default
      store.replaceReducer(newRootReducer)
    })
  }
}
```

としてあげると、Reducerの変更もできました  
