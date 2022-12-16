---
title: 'tr-pruneで不要なコードを削除する'
date: '2022-12-16'
updated: ''
---

TypeScript を使っているプロジェクトの不要なコードを削除するのに

[ts\-prune \- npm](https://www.npmjs.com/package/ts-prune)

を使いました

プロジェクトに入れたくなかったのでグローバルにインストール

```bash
npm i --location=global ts-prune
```

実行します  
勝手に `tsconfig.json` などの TypeScript の設定を読んでくれます

```
$ ts-prune

src/serviceWorker.ts:28 - register (used in module)
src/api/user.ts:19 - createUser
src/api/user.ts:24 - fetchUser
```

と `(used in module)` はそのファイル内だけで呼んでて `export` する必要ないものです  
あとはコード読んで本当に不要なものだったら消していきました
