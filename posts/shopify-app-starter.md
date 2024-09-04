---
title: 'Shopifyアプリを作ってデプロイして使ってみる'
date: '2022-10-28'
updated: ''
---

[Create an app](https://shopify.dev/apps/getting-started/create) あたりの公式ドキュメントを見ると作れるのですが意外にはまるのでメモ

事前に Shopify partner アカウントを作っておきます

## アプリを作る

[Create an app](https://shopify.dev/apps/getting-started/create) の手順通り

```bash
npm init @shopify/app@latest
cd my-new-app
npm run dev
```

node でアプリを設定しました  
指示通りに Shopify partner アカウントを紐づけ app を設定します

https://partners.shopify.com/ > App  
にアプリが表示されるようになります  
API キーの確認や URL 設定などがここでもできます  
（Shopify cli でもできます）

```bash
Shareable app URL

  https://dummy.ngrok.io?shop=taste-of-japan-dev.myshopify.com&host=ABCDEFG
```

みたいな URL を cli が表示するので開くと選んだショップにインストール画面が表示されます

## Heroku にデプロイする

Heroku にデプロイしてみます
作ったアプリ内に web/docs/heroku.md のファイルがあるのでこれの通りします

Heroku cli を使います

```bash
heroku login
heroku container:login
heroku create -a my-app-name -s container
```

`https://my-app-name.herokuapp.com` のような URL 先にデプロイされます

Shopify の API キーなどを Shopify Partner の管理画面の App 設定で調べます  
Heroku の環境変数にセットします

```bash
 heroku config:set -a my-app-name HOST=https://my-app-name.heroku.com SCOPES=read_orders,read_products SHOPIFY_API_KEY=dummy SHOPIFY_API_SECRET=dummy
```

`SCOPES` は Shopify app のアクセス権限用なので必要なものだけ付けます

※ Host の URL に最後スラッシュをつけてるとインストールに失敗しました ❌ HOST=https://my-app-name.heroku.com/

`heroku.yml` をトップディレクトリに作成します

```yml
build:
  docker:
    web: Dockerfile
  config:
    SHOPIFY_API_KEY: ReplaceWithKEYFromEnvCommand
```

Heroku に push します

```
git push heroku main
```

これで Heroku 上に App がデプロイされました

## 公開する

Shopify App Store に登録する方法もありますが自分のショップにだけ入れる方法でやってみます

作ったアプリを使いたいショップの管理画面 > Settings > Users and permissions で自分の Shopify Partner を Collaborater に入れておきます  
（必要あったはず..）

Shopify partner の管理画面からアプリを選びます  
App Setup で URL の設定をします

```text
App Url
https://my-app-name.heroku.com/

Allowed redirection URL(s)　　
https://my-app-name.heroku.com/auth/callback　　
https://my-app-name.heroku.com/auth/shopify/callback　　
https://my-app-name.heroku.com/api/auth/callback
```

Distribution を開いて

![shopify app distribution setting](/shopify-app-starter/shopify-distribution.webp)

右の Single Marchant link を選びます  
インストールしたい Shop を選ぶとインストールリンクが出来上がります

リンクを開くとインストールできます

インストールが出来ない場合、Heroku 環境変数が正しくセットされてない、App の URL が正しくセットされてない、あたりを確認しました

## 再度開発する

作った Shopify App は公開用に URL の設定をしてたため、開発用に使えない（URL 変更すると公開した App が使えなくなる）ので新しく App を作ります

```bash
npm run dev -- --reset
```

で手元のコードの App の設定がリセットされるので新しい App を設定してやるといいです

### 謎のエラー

↑ だとインストールができませんでした...

コードを GitHub に push していたため、別ディレクトリで `git clone` してから `npm run dev` して新しい App を作成すると無事インストールでき開発進められました  
まだ詳しい原因調べられてません(余力がほしい...)

デプロイは

```bash
heroku git:remote -a my-app-name
```

すれば `git push heroku main` でデプロイできます

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
