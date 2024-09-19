---
title: 'shopify theme extensionを作ってみる'
date: '2024-09-19'
updated: ''
---

Shopify appで改造するときの方法はいくつかあります  
[List of app extensions](https://shopify.dev/docs/apps/build/app-extensions/list-of-app-extensions)  

Online Store（ユーザーが触る画面）を拡張できる`Shopify theme extension`を試してみました  
`Web Pixel`はJavascript埋め込むだけなので実質改造できるのは`Shopify theme extension`だけ  

app以外でやるならShopify theme改造ですね  

[Build theme app extensions](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/build) を参考にやります  

## 事前準備

<https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/build#requirements> を準備します

Shopify appのコードが必要なので用意します

```bash
shopify app init
```

## Shopify theme extensionを作成

用意したappのディレクトリ内で

```bash
shopify app generate extension
```

これで生成されるコードでは商品を☆0-5で評価できるようになります  

Product metafieldが必要なので、Shopifyの管理画面からmetafieldを追加しておきます

Settings > Custom data > Products > Add definition  
`demo.avg_rating`をIntegerで追加します  

動作確認用にいくつかの商品のmetafield `demo.avg_rating` に1-5の値を入れておきます

app立ち上げ

```bash
shopify app dev
```

Shopifyパートナーアカウントにログインしたり指示にしたがうと起動

`app blocks` が用意されてるようなのでTheme editorでブロックを設置します  
`app block` -> themeのblockに使う
`embed block` -> 右下にでてくるフローティングボタンとかに使う

違いは [Theme app extension configuration](https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration)

Productページ用のブロック `Star Rating` が用意されているので、Productページに設置します

![Theme app block](/shopify-theme-extension/app-blocks.webp)

保存したら、レーティングを設定したProductページを開くと☆が表示されます  

<img src="/shopify-theme-extension/rating.webp" alt="rating" style="width: 12rem;" />

## まとめ

よくできたチュートリアルは助かりますね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
