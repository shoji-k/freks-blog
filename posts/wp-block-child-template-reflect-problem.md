---
title: 'WordPress Twenty Twenty-Threeで子テーマのtemplates htmlが反映されなかった'
date: '2023-01-24'
updated: ''
---

WordPress テーマ [Twenty Twenty-Three](https://ja.wordpress.org/themes/twentytwentythree/) を使っていて子テーマの変更が反映されなくてはまったのでメモ  
昨日の[WordPress テーマ Twenty Twenty-Three でカスタムフィールドを表示させてみた](/wp-block-template-custom-field) で分からなかったものが解決しました

子テーマの用意は
[Child Themes | Theme Developer Handbook | WordPress Developer Resources](https://developer.wordpress.org/themes/advanced-topics/child-themes/)  
の通りにしました

`wp-content/themes/twentytwentythree-child` を作って、style.css を設置  
特に変わったことなく子テーマを有効にできました

`wp-content/themes/twentytwentythree/templates/home.html` を  
`wp-content/themes/twentytwentythree-child/templates/home.html` にコピー  
コピーした `home.html` を変更しても変更が反映されませんでした

これは新しいテーマを表示確認するときにカスタマイズボタンを押して中身をちょっといじったせいでした

![template has customized mark](/wp-block-child-template-reflect-problem/template-customized.webp)

のようにテンプレートのところにマークついていて、  
"This template has been customized"  
と言われてました  
これがあると html ファイルを変更しても反映されないようです

右のメニューに "カスタマイズをクリア" があるのでクリアすると、html の変更が表示されるようになりました
