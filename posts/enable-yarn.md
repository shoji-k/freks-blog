---
title: 'yarnを使うときはCorepackを使おう'
date: '2024-04-10'
updated: ''
---

Node.jsのパッケージ管理にyarnを使っているプロジェクトがあって久しぶりにインストールすかと思ってドキュメント見たら...

[yarn installation](https://yarnpkg.com/getting-started/install)  

もう `npm install -g yarn` とかのインストールが不要になってました
CorepackというのでNode.jsにnpmやyarnがバンドルされています  
パッケージマネージャーのマネージャーで、Node.js 14.19 / 16.9 以降で使えるようです  

使うには opt-in が必要で

```bash
corepack enable
```

これだけで `yarn` が使えるように

```bash
$ yarn -v
1.22.22
```

安定板の最新にするには

```bash
yarn set version stable
yarn install
```

でできます  
package.jsonへyarnバージョンが追記されたりします  

## まとめ

Node.jsへのバンドル化、使っていきます

<hr />

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3z66TKG" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71cFQwWzlSL._SY522_.jpg" alt="Node.js超入門[第4版]" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Node.js超入門[第4版]</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
