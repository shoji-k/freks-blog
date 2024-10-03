---
title: 'Shopify Graphql APIでmetafield List typeのデータを表示させる'
date: '2024-10-03'
updated: ''
---

Shopifyで製品のmetafieldにProduct Listを設定したときに、Product Listのデータを取ってみました  

```graphql
{
  product(id: "gid://shopify/Product/1234567890") {
    metafield(namespace: "custom", key: "sample") {
      id
      references(first: 3) {
        nodes {
          ... on Product {
            title
          }
        }
      }
    }
  }
}
```

といったクエリでとれます  
`metafield`の`references`を使って、`Product`の`title`を取得しています  
`... on Product`で`Product`のフィールドをとれるようになります  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
