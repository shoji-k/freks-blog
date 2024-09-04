---
title: 'Shopify liquidでURLのクエリを取得する'
date: '2023-11-02'
updated: ''
---

Shopify themeの開発をしていて、liquidでURLのクエリを取りたかったので調べてみました

```html
{% comment %} theme-check-disable ContentForHeaderModification {% endcomment %}
{%- capture contentForQuerystring -%}{{ content_for_header }}{%- endcapture -%}
{% comment %} theme-check-enable ContentForHeaderModification {% endcomment %}
{%- assign url = contentForQuerystring
  | split: '"pageurl":"'
  | last
  | split: '"'
  | first
  | replace: '\/', '/'
  | replace: '%20', ' '
  | replace: '\u0026', '&'
-%}
{%- assign params = url | split: '?' | last | split: '&' -%}

<script>
  console.log("{{ url }}", "{{ params }}")
</script>
```

すると
```
https://sample.myshopify.com/productions/demo?param1=1&param2=2
["param1=1", "param2=2"]
```

という感じで取れました

reference: https://freakdesign.com.au/blogs/news/get-the-url-querystring-values-with-liquid-in-shopify

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
