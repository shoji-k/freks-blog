---
title: "Gatsbyでブログを作った"
date: "2018-12-14"
---

Gatsbyでブログを作ってみました

公式ドキュメント
[Docs \| GatsbyJS](https://next.gatsbyjs.org/docs/)
のQuick Startを参考に

```
npm install --global gatsby-cli
```

これでどこでも gatsby コマンドが使えます

```
gatsby new (ディレクトリ名) (使うテーマのrepositoryのパス)
```

で始めるのですが、テーマのrepositoryを省略して

```
gatsby new blog
# info Creating new site from git: https://github.com/gatsbyjs/gatsby-starter-default.git
```

とすると gatsbyjs/gatsby-starter-default が使われるようです

今回は１から練習がてら作り上げたかったので

```
gatsby new my-hello-world https://github.com/gatsbyjs/gatsby-starter-hello-world#v2
```

とプレーンなものかつ、Gatsby v.2 を使うものにしてみました

参考) [Gatsby Starters \| GatsbyJS](https://next.gatsbyjs.org/docs/gatsby-starters/)

### Typograpyプラグインを入れる

GatsbyではTypograpyが公式サイトで紹介されてるので入れてみます

```
yarn add --dev gatsby-plugin-typography react-typography typography
```

Typographyのための設定ファイルを用意

$ vim src/utils/typograph.js

```
import Typography from "typography"
const typography = new Typography({ baseFontSize: "24px" })
export default typography
```

$ vim gatsby-config.js

```
module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
  ],
}
```

これで gatsby develop を立ち上げ直せば、Typographyの設定が反映されます

rhythm() ってなに？とコードを見てみると

[typography\.js/client\.js at master · KyleAMathews/typography\.js](https://github.com/KyleAMathews/typography.js/blob/master/packages/typography/src/client.js)

```
import verticalRhythm from 'compass-vertical-rhythm'
// skip
const vs = verticalRhythm(options)
vs.rhythm(1)
```

のことらしい
つまりは、縦方向の幅を決まった間隔で並べることができるようです（縦方向のリズムを整える）

Vertical Rhythmはこの記事がわかりやすかったです

[CSS Rhythmic Sizing で Vertical Rhythm \| blog\.jxck\.io](https://blog.jxck.io/entries/2017-10-09/css-rhythmic-sizing.html)

レイアウトを整えていくのが大変なので、Typographyのテーマを使いました  
[Typography\.js](http://kyleamathews.github.io/typography.js/)
で見た目が確認できるので、気に入ったテーマがあったら  

```
yarn add typography-theme-ocean-beach
```

$ vim src/utils/typograph.js

```
import Typography from "typography"
import theme from "typography-theme-ocean-beach"
const typography = new Typography(theme)
export default typography
```

としてあげるといい感じになります  
日本語がきれいでないので  

[Customizing themes](https://github.com/kyleamathews/typography.js#customizing-themes) を参考に

```
import Typography from 'typography'
import theme from 'typography-theme-ocean-beach'
theme.googleFonts.push(
  {
    name: 'Noto+Sans+JP',
    styles: ['400'],
  }
)
theme.bodyFontFamily = ['Noto Sans JP', 'Roboto', 'serif']
const typography = new Typography(theme)
export default typography
```

と [Noto Sans JP \- Google Fonts](https://fonts.google.com/specimen/Noto+Sans+JP?selection.family=M+PLUS+1p|Noto+Sans+JP) を入れました  

ここまでで、なんとかサイトっぽくなりました  

### ブログにする

あとは、
[Data in Gatsby \| GatsbyJS](https://www.gatsbyjs.org/tutorial/part-four/)  
以降のチュートリアルを参考に、マークダウンでブログが表示されるようにしていきました

できたコードは以下にあげています  
ちょこちょこアップデートしていこうと思います  
[shoji\-k/freks\-blog - GitHub](https://github.com/shoji-k/freks-blog)
