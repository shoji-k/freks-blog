---
title: "MochaのテストコードをTypeScriptで書く"
date: "2020-12-17"
---

[Mocha \- the fun, simple, flexible JavaScript test framework](https://mochajs.org/) は、Javascriptで動くので、そのままではTypeScriptでテストがかけません

そのためには、必要なものを入れて

```
npm install chai mocha ts-node @types/chai @types/mocha --save-dev
```

chaiは好みです  
また、tsconfig.jsonなどの `"module": "esnext",` ではコードが読めないので

```
env TS_NODE_COMPILER_OPTIONS='{"module": "commonjs" }' mocha -r ts-node/register 'tests/**/*.ts
```

として実行してあげると動作しました
毎回、実行するのがながいのでpackage.jsonのscriptsに登録してあげとくと楽です

```
"scripts": {
  "test": "env TS_NODE_COMPILER_OPTIONS='{\"module\": \"commonjs\" }' mocha -r ts-node/register 'test/**/*.ts' --exit"
}
```

参考) [https://dev.to/matteobruni/mocha-chai-with-typescript-37f Mocha/Chai with TypeScript - DEV]