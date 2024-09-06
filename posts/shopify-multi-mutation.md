---
title: 'ShopifyのGraphQLで複数Mutationを同時に実行する'
date: '2024-09-06'
updated: ''
---

ShopifyのGraphQLで複数Mutationを同時に実行してみました

[tagsAdd](https://shopify.dev/docs/api/admin-graphql/2024-07/mutations/tagsAdd) と [orderUpdate](https://shopify.dev/docs/api/admin-graphql/2024-07/mutations/orderUpdate) を2つ

を同時に実行してみました  
実行はShopify Remix appで行いましたがそこは省略  

```graphql
mutation updateOrder($id: ID!, $tags: [String!]!, $input: OrderInput!, $input2: OrderInput!) {
  tagsAdd(id: $id, tags: $tags) {
    node {
      id
    }
    userErrors {
      message
    }
  }
  orderUpdate(input: $input) {
    order {
      id
      metafields(first: 3) {
        edges {
          node {
            id
            namespace
            key
            value
          }
        }
      }
    }
    userErrors {
      message
      field
    }
  }
  orderUpdate2: orderUpdate(input: $input2) {
    order {
      id
      metafields(first: 3) {
        edges {
          node {
            id
            namespace
            key
            value
          }
        }
      }
    }
    userErrors {
      message
      field
    }
  }
}
```

渡したパラメータは

```js
{
  variables: {
    id: "gid://shopify/Order/5937231102179",
    tags: ["sample tag"],
    input: {
      metafields: [
        {
          namespace: "custom",
          key: "item_status",
          type: "single_line_text_field",
          value: "ok",
        },
      ],
      id: "gid://shopify/Order/5937231102179",
    },
    input2: {
      metafields: [
        {
          namespace: "custom",
          key: "item_status",
          type: "single_line_text_field",
          value: "ng",
        },
      ],
      id: "gid://shopify/Order/5956042391779",
    },
  },
}
```

Order `5937231102179` のtagに `sample tag` を追加し、metafieldに `item_status: ok` を追加  
Order `5956042391779` のmetafieldに `item_status: ng` を追加  
が同時に行えました  

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
