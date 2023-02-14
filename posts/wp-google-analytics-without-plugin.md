---
title: 'プラグインを使わずにWordPressにGoogle Analyticsを入れる'
date: '2023-02-14'
updated: ''
---

WordPress ブロックテーマ [Twenty Twenty-Three](https://ja.wordpress.org/themes/twentytwentythree/) に Google Analytics を入れてみました  
プラグインは使いたくなかったので、テーマ改造でやろうと思いましたが、ブロックテーマには `<head>` タグの中を改造することができなさそうでした

`functions.php` でやってみました  
[Twenty Twenty-Three](https://ja.wordpress.org/themes/twentytwentythree/) には、`functions.php` がなかったので新規作成します

`/wp-content/themes/twentytwentythree` のなかに `functions.php` を作成  
（実際は子テーマの中でやりました）

```php
<?php

function meta_analytics() {
  $code = <<<EOM
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-DUMMY"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-DUMMY');
    </script>
  EOM;
  echo $code;
}
add_action( 'wp_head', 'meta_analytics', 99);
```

という感じでコードを貼り付けて保存

これで `<head>` のなかにコードが入って無事 Google Analytics で計測できるようになりました
