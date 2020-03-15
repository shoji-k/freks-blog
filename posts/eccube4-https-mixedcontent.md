---
title: 'EC-CUBE 4でurlがhttpsにならなかった対策'
date: '2020-01-18'
---

EC-CUBE 4 で開発環境をhttps化したらTwig内で

```
{{ url('sample_page') }}
```

と、URLを出力していたところが、httpsにならずhttpになってしまっていて、ajaxで通信すると`Mixed Content`になってしまいました  
なぜそこだけhttpになるのかわからず、結局

```
{{ url('sample_page', [], true) }}
```

reference: https://symfony.com/doc/current/reference/twig_reference.html#url

として、URLからスキーマを出さないようにしてあげることで回避しました  
これでURLが `//sample.co.jp/sample_page` のようになります

Symfony 3.4なのか、EC-CUBE 4が悪いのか、設定があるのか、はっきりさせたかったですがこれでしのぎます

