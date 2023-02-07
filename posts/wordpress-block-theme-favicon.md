---
title: 'WordPressブロックテーマでfaviconを設定する'
date: '2023-02-07'
updated: ''
---

WordPress block theme "Twenty Twenty-Three" で favicon を設定してみました

管理画面 > 外観 > テーマ  
カスタマイズをクリックします

Header のところにサイトログを追加します

![add site logo](/wordpress-block-theme-favicon/site-logo.webp)

png 画像とかをアップロード  
ico ファイルはだめでした

![site logo setting](/wordpress-block-theme-favicon/site-logo-setting.webp)

設定に "サイトアイコンとして使用する" があるので有効にしておきます  
これだけでした

これで

```html
<link
  rel="icon"
  href="https://sample.com/wp-content/uploads/icon-512-150x150.png"
  sizes="32x32"
/>
<link
  rel="icon"
  href="https://sample.com/wp-content/uploads/icon-512-300x300.png"
  sizes="192x192"
/>
<link
  rel="apple-touch-icon"
  href="https://sample.com/wp-content/uploads/icon-512-300x300.png"
/>
<link
  rel="apple-touch-icon"
  href="https://sample.com/wp-content/uploads/icon-512-300x300.png"
/>
```

を全ページに入れてくれました
