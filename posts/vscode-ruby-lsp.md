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

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks01-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B09MPX7SMY&linkId=64c21020f4044301b7aef66bf6d8f429"></iframe>

<small>このリンクは、アフィリエイトリンクです</small>