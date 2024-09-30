---
title: 'ShopifyのApp Proxyを使ってみる'
date: '2024-10-01'
updated: ''
---

Shopifyのユーザーが使う画面にShopifyの商品情報をAPI経由で表示する方法を試してみます  

ShopifyのApp Proxyを使います
theme extensionの中でApp Proxy経由でAPIエンドポイントを呼ぶ形でやってみます  

[Shopify CLI](https://shopify.dev/docs/api/shopify-cli) をインストールしておきます  

アプリを作ります  
選択肢は自由に選んでください  

```bash
$ shopify app init

Welcome. Let’s get started by naming your app project. You can change it later.

?  Your project name?
✔  sample-app

?  Get started building your app:
✔  Start with Remix (recommended)

?  For your Remix template, which language do you want?
✔  TypeScript
```

自分はここで `git add . && git commit -m 'init'` しておきました  
都度、コミットしておくといいかもしれません  

必要だったら、アプリで使うscopeを変えておきます

たとえば `shopify.app.toml` を編集して `write_products` を追加

```toml
[scopes]
read_products = "read_products, write_products"
```

変更したらデプロイが必要です  

いったん、デプロイします  

```bash
npm run deploy
```

Partner Dashboardで登録されたアプリが出てきてるはずです  

theme extension を作ります  

```bash
shopify app generate extension
```

`Theme app extension` を選択します

`extensions/` にディレクトリが作られます  

liquidファイルを編集して、データを取得できるようにしてみます  
`extensions/theme-extension-sandbox/blocks/star_rating.liquid` を編集  

```liquid
<button onClick="handleClick()">Get data</button>

<script>
  const url = '(your shopify url)/apps/test'; // あとで用意するApp Proxy URLをセット
  function handleClick() {
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Aceess-Control-Allow-Origin': '*',
      },
    })
      .then((response) => {
        console.log('ok', response);
      })
      .catch((error) => {
        console.error('error', error);
      });
  }
</script>

{% schema %}
{
  "name": "Star Rating",
  "target": "section",
  "settings": [
    { "type": "product", "id": "product", "label": "product", "autofill": true },
    { "type": "color", "id": "colour", "label": "Star Colour", "default": "#ff0000" }
  ]
}
{% endschema %}
```

`url` はあと用意するApp ProxyのURLをセットします  

Shopifyの管理画面でテーマ編集、theme extensionのブロックを追加します  
`star_rating` は、Product用になっているので、Productページで追加します

`npm run dev` で動作確認します  
ProductページでClickボタンが表示されていたらOK  

次にApp Proxy経由で呼ばれるAPIエンドポイントを作ります  

`app/routes/app.test.tsx` を作成  

```tsx
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  console.log("---------loader called---------");

  const { admin } = await authenticate.public.appProxy(request);

  if (!admin) {
    return json({ error: "admin not found" }, { status: 404 });
  }

  const response = await admin.graphql(
    `#graphql
{
 products(first: 10) {
    nodes {
      id
      title
    }
  }
}`,
  );

  return json(await response.json());
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log("---------action called---------");

  const { admin } = await authenticate.public.appProxy(request);

  if (!admin) {
    return json({ error: "admin not found" }, { status: 404 });
  }

  const response = await admin.graphql(
    `#graphql
{
 products(first: 10) {
    nodes {
      id
      title
    }
  }
}`,
  );

  return json(await response.json());
};
```

`/app/test` のエンドポイントで、`lorder`がGET、`action`がPOSTで呼ばれます  
POSTは手抜きでProduct一覧を取るだけにしてます  

POSTで商品を追加するなら、Shopify Appのscopeに `write_products` を追加、productを追加するGraphQLクエリに変えると良いです  

Partner dashboardでApp proxyの設定をします  
`npm run dev` してるPCに外部からアクセスできるURLの指定が必要です  

Shopify Appを `npm run dev` するとCloudflaredが使われ外部URLが発行されています  
Shopify Appの設定でURLを毎回自動で発行するようにしてれば、  
`shopify.app.toml` に  

```toml
application_url = "https://who-shareholders-complications-commissioners.trycloudflare.com"
```

がURLが上書きされていくので、これを使います  
これを Partner dashboardでApp proxyへ登録します  

[Display dynamic store data with app proxies](https://shopify.dev/docs/apps/build/online-store/display-dynamic-data#example) にApp ProxyのURLをどう指定したらいいか書いてあります  

![App proxy](/shopify-app-proxy/app-proxy.webp)

Subpath prefix: `apps`  
Subpath: `test`  
にすると、Shopifyサイトから呼ぶURLが `(your shopify url)/apps/test` になります  
e.g `https://freks-dev-store.myshopify.com/apps/test`  

Proxy URLに `(your shopify url)/apps/test` をたたいて呼ばれるURLを入れます

Proxy URLをpublicなものにするのに `Checkout UI` extension入れる方法もあるようです  
[Shopify App Development | Setup App Proxy with Remix app | YouTube](https://youtu.be/WfxJhAOD2tg?si=iatlGl6VIWgaMhnN&t=548)  

ここまできたら動作確認します  

theme extensionで追加したブロックのClickボタンを押すと、App Proxy経由でAPIエンドポイントが呼ばれて、Product一覧が取得できました  

## まとめ

あまりドキュメントが充実してないところは動かすまで苦労します  
この仕組みでカスタマイズの自由度があがっていいです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
