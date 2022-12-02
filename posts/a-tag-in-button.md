---
title: 'buttonタグの中にaタグを入れていいかどうか'
date: '2022-12-02'
updated: ''
---

button タグの中に a タグを入れていいかどうか整理します

[The Button element \- HTML: HyperText Markup Language \| MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)

を見ると書いてあります
日本語より英語のほうがわかりやすい気がします

Permitted content に `Phrasing content but there must be no Interactive content` とあります

[phrasing_content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#phrasing_content)  
[interactive_content](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Content_categories#interactive_content)

を見ると interactive な a タグはだめでした
