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