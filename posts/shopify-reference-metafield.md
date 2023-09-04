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
