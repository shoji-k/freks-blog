---
title: 'Gatsybyでシンタックスハイライトをつける'
date: '2021-02-14'
updated: ""
---

この blog は[Gatsby](https://www.gatsbyjs.com/)で作ってますが、コードのシンタックスハイライトを入れてなかったので入れました

こういうコードが

![before code highlighting](/gatsby-syntax-highlight/before-code-highlight.webp)

こうなります

![after code highlighting](/gatsby-syntax-highlight/after-code-highlight.webp)

ハイライトのテーマがいくつかあるのですが、一番ひかえめなデフォルトのものにしました

## 入れ方

シンタックスハイライトしてくれるパッケージはいくつかあるのですが、よく使われてそうな[Prism](https://github.com/PrismJS/prism)にしました

Gatsby plugin があるのでそれを利用  
[gatsby\-remark\-prismjs \| Gatsby](https://www.gatsbyjs.com/plugins/gatsby-remark-prismjs/)

ほぼ、ここに書いてある手順通りです

必要なものをインストール

```bash
npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs
```

gatsby-config.js に設定を追加

```js
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
              languageExtensions: [],
              prompt: {
                user: 'user',
                host: 'localhost',
                global: false,
              },
              escapeEntities: {},
            },
          },
        ],
      },
    },
```

css を読み込む  
gatsby-browser.js がなかったので、ファイル用意して書き込み

```js
import 'prismjs/themes/prism.css'
```

これでシンタックスハイライトされるようになりました
