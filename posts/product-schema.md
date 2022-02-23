---
title: 'ECサイトの商品ページへschema対応を入れてみた'
date: '2019-07-12'
updated: ""
---

関わってる案件の EC サイトへスキーマ対応(schema.org 対応)入れてみました

このサイトがわかりやすいです  
https://developers.google.com/search/docs/data-types/product?hl=ja

基本的には  
https://search.google.com/structured-data/testing-tool  
のサンプル JSON をサイトに埋め込んでいきます  
項目の内容は https://schema.org/Product を見て確認

ただ関わってる EC サイトは、レビューがなかったりするので項目削ってこんな感じに

```
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "サンプル",
  "image": ["https://sample.com/images/sample.png"],
  "description": "サンプルの文章",
  "offers": {
    "@type": "Offer",
    "url": "https://sample.com/products/999",
    "priceCurrency": "JPY",
    "price": "2000",
    "availability": "https://schema.org/InStock"
  }
}
</script>
```

できたらここで確認します  
https://search.google.com/structured-data/testing-tool/u/0/?hl=ja

改行コード残ってたり、値段のフォーマットが違ったり、意外にエラーがでました

数日経って確認すると、Google 検索結果に、値段と在庫ありがまれにでるようになりました  
画像が出てほしいと思ってたんですが、出たの見たことないです（他サイトも出てないような）
