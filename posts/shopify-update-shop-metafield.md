---
title: 'ShopifyでShop metafieldを更新する'
date: '2024-10-05'
updated: ''
---

ShopifyでShop metafieldを更新したかったので調べてみました  
管理画面 > Settings > Custom data > Metafield definitions には `Shop` がなく画面から更新はできないです  

GraphQLで更新するには

```graphql
mutation updateShopMutation($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields:$metafields){
    metafields{
      id
      key
      value
    }
    userErrors{
      code
      message
    }
  }
}
```

Variablesが

```json
{
  "metafields": [
    {
      "key": "materials",
      "namespace": "my_fields",
      "ownerId": "gid://shopify/Shop/12345678",
      "type": "multi_line_text_field",
      "value": "95% Cotton\n5% Spandex"
    }
  ]
}
```

で更新できます  
`ownerId` に渡したもののMetafieldが更新されます  
`type` は [List of data types](https://shopify.dev/docs/apps/build/custom-data/metafields/list-of-data-types) を参考にしてください

実行すると定義がなくても作られました  

Shop idが分からなかったらクエリを投げて確認しましょう  
クエリでShopのidとMetafieldを確認するには

```graphql
query shop {
 shop {
    id
  name
    metafields(first: 10) {
      nodes {
        namespace
        key
        value
      }
    }
 }
}
```

で確認できます  

簡単に見るなら `https://admin.shopify.com/store/(shop name)/metafields.json` にアクセスしても見れます  

## まとめ

商品のMetafieldだと `updateProduct` でできるのですが、Shopはなさそうでした  
Shop metafieldはちょっと隠されてるのが気になります  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
