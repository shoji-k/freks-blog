---
title: 'Gatsbyjs v2 から v3 へアップグレードした'
date: '2021-03-08'
---

このブログは Gatsbyjs v2 を使っていましたが、v3 へアップグレードしてみました

アップグレード内容はこちら  
[Gatsby v3 Incremental Builds in OSS, new Gatsby Image, and more \| Gatsby](https://www.gatsbyjs.com/blog/gatsby-v3/)

アップグレードの仕方はこちら  
[Migrating from v2 to v3 \| Gatsby](https://www.gatsbyjs.com/docs/reference/release-notes/migrating-from-v2-to-v3/)

このブログはほとんどデフォルトだったのでソースコードを変えるところはありませんでした

ただ、CircleCI で、cypress-io/cypress@1.27.0 orb を使っていて、それが Node 10 で動いていたのでエラーになっていました  
Gatsbyjs v3 は Node 12.13.0 以降が必要です

Node 14 で動くように変更でクリアしました
[変更箇所](https://github.com/shoji-k/freks-blog/pull/758/commits/46a5b28fb03a7c8236bdc179f4447e876306c7b5)

あと Windows10 WSL2 使っていたのですが、/mnt/c 以下だと Gatsbyjs がインストールされてないとかでエラーになって謎でしたが、ディレクトリ移動すると動きました

`gatsby develop`などがだいぶ早くなっていい感じです
