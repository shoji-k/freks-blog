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
