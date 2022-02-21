---
title: 'Gatsby themeからGoogle fontsを外した'
date: '2021-02-17'
---

このブログをひさしぶりにlight houseのスコアを見てみるとperformanceが黄色になってました  

![lighthouse results before](/remove-google-fonts-from-gatsby-theme/lighthouse-before.webp)

項目は[Eliminate render-blocking resources](https://web.dev/render-blocking-resources/?utm_source=lighthouse&utm_medium=devtools)で、Google fontsを読み込んでるところでした  
読み込みを遅延させることも考えたのですが、いっそGoogle fontsを外してみました  

Gatsby themeとして、
[Ocean Beach — a Typography.js theme](https://github.com/KyleAMathews/typography.js/tree/master/packages/typography-theme-ocean-beach)  
を使っていたのでコードを見て、Google fontsを読み込んでたので外すコードを書いてみました

コードの差分  
https://github.com/shoji-k/freks-blog/commit/fed6641e4b010be1b7a385e36c9ee62ddb13ae45  

無理やり外してみました

すると、

before  

![top screen before](/remove-google-fonts-from-gatsby-theme/top-before.webp)

after  

![top screen after](/remove-google-fonts-from-gatsby-theme/top-after.webp)


と、ほんの少し見た目が変わりました    
見た目の確認は、Windows 10でやっています  
font-familyは、[2020年に最適なfont\-familyの書き方 \- ICS MEDIA](https://ics.media/entry/200317/)を参考にしました  

light houseが

![lighthouse results before](/remove-google-fonts-from-gatsby-theme/lighthouse-after.webp)

とperformance 100点になりました！
