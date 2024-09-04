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

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
