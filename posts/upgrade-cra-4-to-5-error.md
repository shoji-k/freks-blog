---
title: 'Create React App 4 -> 5にあげたときのエラー'
date: '2022-11-07'
updated: ''
---

数年動いている Create React App で作った React v17 で動いているアプリをバージョンアップしてみました  
package.json の記載で比較すると

- "react": "^17.0.2" -> "react": "^18.2.0"
- "react-scripts": "^4.0.3" -> "react-scripts": "5.0.1"

```
npm i
npm run start
```

で、ブラウザ上でエラー発生

```error.txt
Uncaught ReferenceError: process is not defined
at ./node_modules/jsonwebtoken/lib/psSupported.js (psSupported.js:3:1)
at options.factory (react refresh:6:1)
at __webpack_require__ (bootstrap:24:1)
at fn (hot module replacement:62:1)
at ./node_modules/jsonwebtoken/verify.js (verify.js:6:1)
at options.factory (react refresh:6:1)
at __webpack_require__ (bootstrap:24:1)
at fn (hot module replacement:62:1)
at ./node_modules/jsonwebtoken/index.js (index.js:3:1)
at options.factory (react refresh:6:1)
```

Webpack が 4 -> 5 になっており、サーバーサイド用の Polyfills が消されたりがある様子  
[Automatic Node.js Polyfills Removed · Issue #11282 · webpack/webpack](https://github.com/webpack/webpack/issues/11282)

[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) がサーバーサイドで動かすものだったみたいで、クライアントサイドで動かすべきではないそう

使っていた箇所は

```js
jwt.decode(token, { complete: true })
```

だけだったので

```js
function jwtDecode(t) {
  let token = {}
  token.raw = t
  token.header = JSON.parse(window.atob(t.split('.')[0]))
  token.payload = JSON.parse(window.atob(t.split('.')[1]))
  return token
}
jwtDecode(token)
```

で置き換えました  
参考リンク https://stackoverflow.com/a/47115113

他を疑い時間がかかりました
