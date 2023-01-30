---
title: 'ShopifyパートナーアカウントでShopifyテーマを改造する'
date: '2023-01-31'
updated: ''
---

まず、Shopify Partner アカウントがなければ作ります  
https://www.shopify.com/partners

Partner 用の管理画面の Stores を表示  
Shop を登録します

![shopify partner - stores](/connect-shopify-partner/shopify-stores.webp)

管理したい Shop の URL を入れて、権限など選んでリクエスト

![shopify partner - stores - request](/connect-shopify-partner/shopify-store-request.webp)

Shop の管理画面にログインすると通知が来てます  
https://your-shop-name.myshopify.com/admin/settings/account

Collaborators に表示されているので Accept すると OK です  
リクエストした権限より承認するときに少なくすると、要求されてるものより権限がないのでエラーになり弾かれるようです

Shopify cli をインストールします  
https://shopify.dev/themes/tools/cli/install を見て入れていきます

```bash
# 環境により不要なところは省略
npm install -g @shopify/cli @shopify/theme
```

と Node のものが入りました

```bash
$ shopify version
Current Shopify CLI version: 3.38.0
```

などと表示されれば OK です

アクセスできる Shopify のお店のテーマを見てみます

```bash
$ shopify theme list --store your-shopify-store.myshopify.com
(ブラウザが開くのでShopifyパートナーアカウントでログイン)
✔ Logged in.
name                             role           id
───────────────────────────────  ─────────────  ─────────────
Dawn                             [live]         #136555266307
Crave                            [unpublished]  #133559058691
```

と見ることができます  
2 度めからは `--store your-shopify-store.myshopify.com` が不要で

```bash
$ shopify theme pull
```

として指示にしたがっていくと、ローカルのディレクトリに theme がダウンロードできます  
改造したりしたら

```bash
$ shopify theme serve
```

で動作確認できて便利です
