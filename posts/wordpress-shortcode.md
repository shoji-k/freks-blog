---
title: 'WordPressでshort codeを自作する'
date: '2025-01-11'
updated: ''
---

WordPress でショートコードを自作してみました  
ドキュメントは [Shortcode API « WordPress Codex](https://codex.wordpress.org/Shortcode_API) にあります  

今回はWordPressのカスタムフィールドの値があればリンクを表示するものを作ってみました  

theme Twenty Twenty-Three の個テーマを用意してやりました  

```bash
theme
└── twentytwentythree-child
    ├── functions.php
    └── templates
        └── single.html
```

single.htmlが1つの記事が表示されるテンプレートです  

functions.php にショートコードを追加します  

```php
function get_custom_field($field_name) {
  return get_post_meta(get_the_ID(), $field_name, true);
}

function map_link_shortcode() {
  $map_link = get_custom_field('map');
  if ($map_link) {
    return '<a href="' . esc_url($map_link) . '" target="_blank">map</a>';
  }
  return '';
}
add_shortcode('map_link', 'map_link_shortcode');
```

map というカスタムフィールドに入力されていれば、リンクを表示します  
ショートコードは `map_link` で用意しました  

これを表示するのに single.html にショートコードを埋め込みます  

```html
/* 前後は省略 */
<div>
  [map_link]
</div>
/* 前後は省略 */
```

これで記事に map というカスタムフィールドが入力されていればリンクが表示されるようになりました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TJOzhK" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81PW-I1FhUL._SY466_.jpg" alt="1冊ですべて身につくWordPress入門講座" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">1冊ですべて身につくWordPress入門講座</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
