---
title: 'Shopify metafield List typeのデータを表示させる'
date: '2023-09-04'
updated: ''
---

ShopifyのmetafieldのList typeをthemeで表示させる方法を調べました
[shopify.dev metafields - List types](https://shopify.dev/docs/apps/custom-data/metafields/types#list-types)
list.product_referenceで試します

Productに関連商品としてMetafield product_listで商品を複数登録できるようにします  
theme liquidファイル内で扱うには

```liquid
{% assign product_list = product.metafields.custom.product_list.value %}
```

最後のvalueがないと、`[gid://....., ....]` という文字列が入ってしまいます

product_listに[product object](https://shopify.dev/docs/api/liquid/objects/product)が入るので

```liquid
{% for product in product_list %}
  {{ product.title }}
{% endfor %}
```

とかしてやれば、関連商品のタイトルが表示されます

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
