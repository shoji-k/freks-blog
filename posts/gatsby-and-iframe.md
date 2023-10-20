---
title: 'Gatsbyでページを用意してiframeで表示する'
date: '2023-10-20'
updated: ''
---

Gatsbyで静的ページを作成して、iframeで表示してみました

## ページを用意

[Routing \| Gatsby](https://www.gatsbyjs.com/docs/reference/routing/creating-routes/)

あたりを見てファイルを用意します

`src/pages/sample/test.js`  

```js
export default function Test() {
  return (
    <div>Hello</div>
  )
}
```

とかで `/sample/test` にアクセスすると表示されます

## iframeで表示

今回は別記事で使う `/samples/table.js` を表示してみます

<iframe
  id="iframeSample"
  title="iframe Sample"
  width="640"
  height="400"
  src="/samples/table">
</iframe>

できました  

htmlとcssのコード紹介にいいかもしれません