---
title: 'Lighthouse accessibilityを改善した'
date: '2021-02-18'
updated: ""
---

このブログの Lighthouse accessibility が、97 点だったので改善してみました  
[Gatsby theme から Google fonts を外した \| freks blog](/remove-google-fonts-from-gatsby-theme/) の記事の続きです

![Lighthouse accessibility before](/improve-lighthouse-accessibility/Lighthouse-accessibility-before.webp)

[Heading elements are not in a sequentially-descending order](https://web.dev/heading-order/)  
が指摘の点で

- h1, h2, ... とかの Heading 要素を順番に並べましょう

ということみたいです

このブログは、h1, h3, h2 の順になってるところがあったので、h1, h2, h3 の順番通りに変更、見た目はあまり変わらないように css を当てました

そうすると...

![Lighthouse after improvement](/improve-lighthouse-accessibility/Lighthouse-after.webp)

All green になりました！  
PWA 対応もそのうちしてみようと思います
