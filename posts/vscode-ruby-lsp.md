---
title: 'VSCode extention Ruby LSPを使ってみる'
date: '2023-04-06'
updated: ''
---

Ruby の LSP といえば solargraph で、VSCode で [Ruby \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby) を使って利用して（いたと思う）いましたが、Shopify 製の [Ruby LSP \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-lsp) に乗り換えてみました

きっかけは [Ruby with Visual Studio Code](https://code.visualstudio.com/docs/languages/ruby) にのっていたからでした

[Ruby \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=rebornix.Ruby) を disabled にします
VSCode の settings.json を開きます
使わなくなっていた設定がグレーアウトしているので消します

[Ruby LSP \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=Shopify.ruby-lsp) をインストール

settings.json に

```json
  "rubyLsp.formatter": "rubocop",
  "rubyLsp.rubyVersionManager": "rbenv"
```

と設定を加えます
これで、format 効いて動いてそうでした

右下の `Ruby {}` みたいなところをクリックすると動いている状態が分かります

コードジャンプはしないみたいでした

<br />
<hr />

おすすめRuby本

[プロを目指す人のためのRuby入門[改訂2版] 言語仕様からテスト駆動開発・デバッグ技法まで](https://amzn.to/3RUkOcc)

<small>このリンクは、アフィリエイトリンクです</small>
