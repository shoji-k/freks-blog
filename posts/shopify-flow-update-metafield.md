---
title: 'Shopify FlowでProduct ListのShop metafieldを更新する'
date: '2024-10-04'
updated: ''
---

Shopify純正のアプリ[Shopify Flow](https://www.shopify.com/jp/flow) を試してみます  

Shopのmetafield に Product List を設定するフローを作成してみます

Shopのmetafieldを更新するには、現時点だとできる画面がないので、APIを使うしかなかったですが、Shopify Flowを使ってもできました  

Order が作成されたら、OrderのLine Itemを取得して、ShopのmetafieldにProduct Listを更新させてみました  

![shopify flow](/shopify-flow-update-metafield/shopify-flow.webp)  

Order Create -> Update shop metafield で

Update shop metafieldは  

![update shop metafield](/shopify-flow-update-metafield/update-metafield.webp)  

Valueにはliquidでかけるみたいで、Metafield Product Listを更新するにはIDを配列でわたしてあげればいいみたいです  
つまりは

```json
{"gid://shopify/Product/1", "gid://shopify/Product/2", "gid://shopify/Product/3"}
```

の形にしてあげるといいです  
Liquidだと

```liquid
[
  {% for lineItems_item in order.lineItems %}
    {% if forloop.first == false %}, {% endif %}
    "{{ lineItems_item.product.id }}"
  {% endfor %}
]
```

こうかけます  
`Add a variables`で使いたい変数を選ぶとサンプルコードが埋まるのでそれを参考に変えるといいです  

あとは、手動でOrderを作成するとShopのmetafieldが更新されるのを確認しました  
Metafieldの定義は事前に用意してなくても作られました  

## まとめ

Shopify Flowはあまりやれることないと思ってましたが、意外にできそうです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
