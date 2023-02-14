---
title: 'WordPressテーマTwenty Twenty-Threeでカスタムフィールドを表示させてみた'
date: '2023-01-23'
updated: ''
---

新しく blog を始めてて、最新のテーマ [Twenty Twenty-Three](https://ja.wordpress.org/themes/twentytwentythree/) を使ってみて構築しました  
https://travel.freks.jp

ブロックテーマとかいうらしくテーマ編集だとブロックでパーツを増やしたりできます

カスタムフィールドを使って個別の投稿画面に表示したかったのですが苦戦しました

カスタムフィールドは  
[カスタムフィールドの使い方 – サポートフォーラム – WordPress.org 日本語](https://ja.wordpress.org/support/article/custom-fields/)  
を見て登録  
投稿を編集する画面のブロックでカスタムフィールドを追加で設定できます

これをどうやって表示するか？  
最初に考えたのは子テーマを作って PHP コードを書いてカスタムフィールド情報を表示させようとしました

[Child Themes | Theme Developer Handbook | WordPress Developer Resources](https://developer.wordpress.org/themes/advanced-topics/child-themes/)  
を見て、`wp-content/themes/twentytwentythree-child` を作って、style.css を設置、WordPress の管理画面で子テーマを有効  
まではできたんですが、`wp-content/themes/twentytwentythree` の中を見ると

```bash
├── assets
│   └── fonts
│       ├── dm-sans
│       ├── ibm-plex-mono
│       ├── inter
│       └── source-serif-pro
├── parts
├── patterns
├── styles
└── templates/
    ├── 404.html
    ├── archive.html
    ├── blank.html
    ├── blog-alternative.html
    ├── home.html
    ├── index.html
    ├── page.html
    ├── search.html
    └── single.html
```

というディレクトリ構成になっていて、templates の中身が html でした  
`wp-content/themes/twentytwentythree-child/templates/single.html` を置いて改造したり  
`wp-content/themes/twentytwentythree/templates/single.html` を直接改造したりしても表示が変わらず...

子テーマの作り方が違いそうですが、ドキュメントに記載も見られませんでした

いったん断念して別の方法で  
プラグイン入れたくなかったのですが、  
[Meta Field Block – WordPress プラグイン \| WordPress\.org 日本語](https://ja.wordpress.org/plugins/display-a-meta-field-as-block/)  
を入れました

これを入れるとテーマのカスタマイズで、ブロックを追加する際に Meta Field Block が選べます

![add meta field block](/wp-block-template-custom-field/add_meta_field_block.webp)

選ぶと

![meta field block](/wp-block-template-custom-field/meta_field_block.webp)

といった形で表示され、選んで設定します

![meta field block setting](/wp-block-template-custom-field/meta_field_block_setting.webp)

Field Type を Custom field を選んで、Field Name に投稿編集画面で作ったカスタムフィールドのキーの名前を設定します

そうすれば投稿画面に表示されるようになりました  
カスタムフィールドを設定してない投稿は何も表示されないので大丈夫そうです

できればプラグインを使わずにやりたいので方法見つけたらやり直します
