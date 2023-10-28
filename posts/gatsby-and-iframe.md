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
import React from 'react'
import './test.css'

export default function Test() {
  return (
    <div>
      <h2>Test</h2>
      <p>This is a test page.</p>
    </div>
  )
}
```

`src/pages/sample/test.css`  

```css
h1 {
  color: salmon
}
```

とかで `/sample/test` にアクセスすると表示されます

## iframeで表示

`/samples/test.js` を表示してみます

```html
<iframe
  id="iframeSample"
  title="iframe Sample"
  width="640"
  height="200"
  src="/samples/test">
</iframe>
```

を書くと

<iframe
  id="iframeSample"
  title="iframe Sample"
  width="640"
  height="200"
  src="/samples/test">
</iframe>

できました  

htmlとcssのコード紹介にいいかもしれません
