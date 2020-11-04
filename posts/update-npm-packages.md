---
title: 'npm packagesを更新する'
date: '2020-09-24'
---

更新方法をまとめました  

## Using yarn

```
yarn upgrade-interactive
```

package.jsonを無視して最新にする

```
yarn upgrade-interactive --latest
```

## Using npm

update latest packages using npm-check-updates

```
npm install -g npm-check-updates
```

更新内容をチェック  

```
ncu
```

package.json を更新

```
ncu -u
```

アップデートする 

```
yarn install
```