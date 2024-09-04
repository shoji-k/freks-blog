---
title: 'shopify appのGraphQLの型をつける'
date: '2024-08-07'
updated: ''
---

Remix使っているShopifyアプリを作っています  

GraphQLのクエリを投げて返ってきた結果に型をつけたかったので調べてみました

[Typing GraphQL operations](https://shopify.dev/docs/api/shopify-app-remix/v2/guide-graphql-types) が公式ドキュメントにあります  
これを読みつつ設定しました

```bash
npm add --save-dev @shopify/api-codegen-preset
npm add @shopify/admin-api-client @shopify/storefront-api-client
```

は、`package-lock.json` を見るとあったので追加していません

`.graphqlrc.ts` も `package.json` の `script` も scaffold で作られていました  

GraphQL APIでデータを取る処理を書いて

```ts
const ORDERS_QUERY = `#graphql
query orders($first: Int!) {
  orders(first: $first) {
    nodes {
      id
      name
    }
  }
}`;

export async function loader({ request }: LoaderFunctionArgs) {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(ORDERS_QUERY, {
    variables: { first: 10 },
  });

  const res = await response.json();
  return json(res);
}
```

`#graphql` とコメントがないと型が作られないので注意です  
これは、`@shopify/api-codegen-preset` のREADMEに書いてありました

コマンドを実行して、型を作ります

```bash
npm run graphql-codegen
```

ちなみに

```bash
graphql-codegen --watch
```

にすると変更あったら自動で型を作ってくれます  

実行したら、

```ts
const data = useLoaderData<typeof loader>();
```

の `data` に型が付いていました  

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
