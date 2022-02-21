---
title: "Yarn tips"
date: "2018-12-25"
updated: ""
---

[Yarn](https://yarnpkg.com)でよく調べてしまうことをまとめます  

## install

[Installation \| Yarn](https://yarnpkg.com/en/docs/install#windows-stable)

## command

パッケージ追加、--dev で開発用

```
$ yarn add <package...> [--dev/-D]
```

グローバルにパッケージ追加

```
$ yarn global add <package...>
```

古いパッケージを調べる

```
$ yarn outdated
```

古いパッケージを更新する、--latest でpackage.jsonのバージョン指定を無視  

```
$ yarn upgrade-interactive [--latest]
```

Yarn自身のアップデート

```
$ npm install -g yarn
```
