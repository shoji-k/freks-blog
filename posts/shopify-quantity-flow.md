---
title: 'Shopifyで在庫の増減をGraphQLで見てみる'
date: '2024-09-05'
updated: ''
---

Shopifyで商品の在庫数の移り変わりを調べたのでまとめます

[Manage inventory quantities and states](https://shopify.dev/docs/apps/build/orders-fulfillment/inventory-management-apps/manage-quantities-states#inventory-object-relationships)
に図があり分かりやすいです

<img src="https://cdn.shopify.com/shopifycloud/shopify_dev/assets/apps/fulfillments/inventory-management-apps/inventory-object-relationships-2f29b13351c196044d6b588283314314bbce80f7a53698f4ff03ae6ceccfbfd1.png" alt="Inventory object relationships" />

Product -> ProductVariant -> InventoryItem -> InventoryLevel -> Location という関係になっています  
場所（Location）ごとに在庫の数をInventoryLevelで持っています  

在庫は on_hand, incoming, available, committed, reserved, damaged, safety_stock, and quality_control の状態があります  
[inventory states](https://shopify.dev/docs/apps/build/orders-fulfillment/inventory-management-apps#inventory-states)

on_handが手元にある数で、committedが注文されている数です  

[shopify\.dev/graphiql/admin\-graphiql](https://shopify.dev/graphiql/admin-graphiql) でGraphQLをたたいてみてみます  

自分のテストShopify環境でお好み焼きの商品を作成して在庫を入れてみました  
"gid://shopify/Product/7779460284643" のIDは、商品ページのURLにあるIDです  

```graphql
query Product {
  product(id: "gid://shopify/Product/7779460284643") {
    id
    title
    variants(first: 3) {
      nodes {
        id
        title
        product {
          id
          variants(first: 3) {
            edges {
              node {
                id
                inventoryQuantity
                inventoryItem {
                  id
                  inventoryLevels(first: 3) {
                    nodes {
                      id
                      quantities(
                        names: ["available", "on_hand", "committed", "damaged", "incoming", "quality_control", "reserved", "safety_stock"]
                      ) {
                        quantity
                        name
                      }
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
    }
  }
}
```

実行結果が

```graphql
{
  "data": {
    "product": {
      "id": "gid://shopify/Product/7779460284643",
      "title": "お好み焼き",
      "variants": {
        "nodes": [
          {
            "id": "gid://shopify/ProductVariant/43120240132323",
            "title": "Default Title",
            "product": {
              "id": "gid://shopify/Product/7779460284643",
              "variants": {
                "edges": [
                  {
                    "node": {
                      "id": "gid://shopify/ProductVariant/43120240132323",
                      "inventoryQuantity": 9,
                      "inventoryItem": {
                        "id": "gid://shopify/InventoryItem/45214290837731",
                        "inventoryLevels": {
                          "nodes": [
                            {
                              "id": "gid://shopify/InventoryLevel/106391044323?inventory_item_id=45214290837731",
                              "quantities": [
                                {
                                  "quantity": 10,
                                  "name": "available"
                                },
                                {
                                  "quantity": 10,
                                  "name": "on_hand"
                                },
                                {
                                  "quantity": 0,
                                  "name": "committed"
                                },
                                {
                                  "quantity": 0,
                                  "name": "damaged"
                                },
                                {
                                  "quantity": 0,
                                  "name": "incoming"
                                },
                                {
                                  "quantity": 0,
                                  "name": "quality_control"
                                },
                                {
                                  "quantity": 0,
                                  "name": "reserved"
                                },
                                {
                                  "quantity": 0,
                                  "name": "safety_stock"
                                }
                              ],
                              "location": {
                                "id": "gid://shopify/Location/70086885603",
                                "name": "test location"
                              }
                            }
                          ]
                        }
                      }
                    }
                  }
                ]
              }
            }
          }
        ]
      }
    }
  },
  "extensions": {
    "cost": {
      "requestedQueryCost": 51,
      "actualQueryCost": 14,
      "throttleStatus": {
        "maximumAvailable": 2000,
        "currentlyAvailable": 1986,
        "restoreRate": 100
      }
    }
  }
}
```

試しにOrderを作ってみて、OrderのGraphQLを叩いてみます  
Orderは支払いを済まさないとDraft Orderで、支払いを済ませるとOrderになります

OrderとLocationの関係は [Apps in order management](https://shopify.dev/docs/apps/build/orders-fulfillment/order-management-apps#api-objects-and-relationships) にあります  
<img src="https://cdn.shopify.com/shopifycloud/shopify_dev/assets/apps/fulfillments/order-management-apps/fulfillment-order-api-objects-ad3d3389ae9de49a0a6f27163781aa3cd277e0f25bf6145232b12df2068ff80b.png" alt="Order objects and relationships">  
Order -> FulfillmentOrder -> Fulfillment -> -> Location という関係になっています

```graphql
query order {
  order(id: "gid://shopify/Order/5952056033507") {
    id
    name
    fulfillmentOrders(first: 2) {
      nodes {
        id
        status
        assignedLocation {
          address1
          address2
          city
          phone
          province
          zip
          location {
            id
            name
          }
        }
        fulfillments(first: 3) {
          nodes {
            id
            totalQuantity
            fulfillmentLineItems(first: 2) {
              nodes {
                id
                lineItem {
                  id
                  name
                  title
                }
                quantity
              }
            }
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
```

実行すると

```graphql
{
  "data": {
    "order": {
      "id": "gid://shopify/Order/5952056033507",
      "name": "#1007",
      "fulfillmentOrders": {
        "nodes": [
          {
            "id": "gid://shopify/FulfillmentOrder/7007341478115",
            "status": "OPEN",
            "assignedLocation": {
              "address1": "sample",
              "address2": "sample",
              "city": "Tokyo",
              "phone": "",
              "province": "Tokyo",
              "zip": "100-0000",
              "location": {
                "id": "gid://shopify/Location/76100534499",
                "name": "first place"
              }
            },
            "fulfillments": {
              "nodes": []
            }
          }
        ]
      }
    }
  },
  "extensions": {
    "cost": {
      "requestedQueryCost": 20,
      "actualQueryCost": 8,
      "throttleStatus": {
        "maximumAvailable": 2000,
        "currentlyAvailable": 1909,
        "restoreRate": 100
      }
    }
  }
}
```

まだfulfillmentしてないので、fulfillmentsのnodesが空です  
この状態だとProductの在庫数が

available -1  
committed +1

になります

Orderをfulfillmentすると

```graphql
{
  "data": {
    "order": {
      "id": "gid://shopify/Order/5952056033507",
      "name": "#1007",
      "fulfillmentOrders": {
        "nodes": [
          {
            "id": "gid://shopify/FulfillmentOrder/7007341478115",
            "status": "OPEN",
            "assignedLocation": {
              "address1": "sample",
              "address2": "sample",
              "city": "Tokyo",
              "phone": "",
              "province": "Tokyo",
              "zip": "100-0000",
              "location": {
                "id": "gid://shopify/Location/76100534499",
                "name": "first place"
              }
            },
            "fulfillments": {
              "nodes": [
                {
                  "id": "gid://shopify/Fulfillment/7007341478115",
                  "totalQuantity": 1,
                  "fulfillmentLineItems": {
                    "nodes": [
                      {
                        "id": "gid://shopify/FulfillmentLineItem/7007341478115",
                        "lineItem": {
                          "id": "gid://shopify/LineItem/7007341478115",
                          "name": "お好み焼き",
                          "title": "Default Title"
                        },
                        "quantity": 1
                      }
                    ]
                  },
                  "location": {
                    "id": "gid://shopify/Location/76100534499",
                    "name": "first place"
                  }
                }
              ]
            }
          }
        ]
      }
    }
  },
  "extensions": {
    "cost": {
      "requestedQueryCost": 20,
      "actualQueryCost": 8,
      "throttleStatus": {
        "maximumAvailable": 2000,
        "currentlyAvailable": 1909,
        "restoreRate": 100
      }
    }
  }
}
```

Productの在庫数が

on_hand -1  
committed -1

され在庫からなくなります  

## まとめ

ドキュメントを読みまくってます  
動かしつつ理解を深めています  

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
