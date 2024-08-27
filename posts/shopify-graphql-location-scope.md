---
title: 'Shopify GraphiQLでlocation情報を取得するのにscopeが必要になった'
date: '2024-08-27'
updated: ''
---

Shopifyの管理画面にShopify GraphiQL Appを入れてAPIを叩いていたら、location情報を取得するクエリでエラーが出ました

```graphql
{
 products(first: 10) {
   nodes {
     id
     title
     variants(first: 3) {
       nodes {
         id
         inventoryItem {
           id
           inventoryLevels(first: 3) {
             nodes {
               id
               location {
                 id
                 name
               }
             }
           }
         }
       }
     }
   }
  }
 }
```

`Access denied for location field. Required access: the \`read_locations\` access scope.` となりました

[The location object requires \`read\_locations\` scope — Shopify developer changelog](https://shopify.dev/changelog/the-location-object-requires-read_locations-scope) をみると `2024-07` のAPIからscopeが必要になったようです

手っ取り早くするなら一つ古いAPIで呼べばいいです

[shopify\.dev/graphiql/admin\-graphiql](https://shopify.dev/graphiql/admin-graphiql) こっちだと動いたのでアプリを入れなおして権限選びなおす？とかすると動かせるかもしれません
