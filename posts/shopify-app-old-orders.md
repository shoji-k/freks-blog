---
title: 'Shopify Admin APIで古いOrders情報が取れなかった'
date: '2024-08-05'
updated: ''
---

Remix使っているShopifyアプリを作っています  

```graphql
query orders {
  orders(first: 10) {
    edges {
      node {
        id
      }
    }
  }
}
```

といったシンプルなクエリを投げると、古いOrder情報が取れません...

原因は、APIのscopesの設定でした  

`shopify.app.toml` を

```toml
[access_scopes]
scopes = "read_orders"
```

していたのですが、[Shopify API access scopes](https://shopify.dev/docs/api/usage/access-scopes) のドキュメントを見ると

Scope read_all_orders に  
`All relevant orders rather than the default window of orders created within the last 60 days`  
とありました  

`read_all_orders` に変更したら古いOrder情報が取れるようになるようです  

60日以内のOrder情報は取れるのでこれで開発していきます
