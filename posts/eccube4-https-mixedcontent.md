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

として、URLを相対的にしてあげることで回避しました  

Symfony 3.4なのか、EC-CUBE 4が悪いのか、設定があるのか、はっきりさせたかったですがこれでしのぎます

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=4899774885&linkId=568393988a24b8994fce4b2496f8f03f"></iframe>