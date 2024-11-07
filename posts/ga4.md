---
title: 'GA4を使ってみる'
date: '2024-11-06'
updated: ''
---

Google Analytics 4 (GA4) を使ってみました  

## GA4とは

旧来のUniversal Analyticsではページビューを中心にページ単位でデータを計測していました
GA4 はイベントを中心にデータを収集するようになっています

イベントの種類が

- `session_start`: セッション開始
- `first_visit`: 初回訪問

といったものが自動収集され、

- `page_view`: ページビュー
- `scroll`: スクロール
- `click`: クリック

とかは拡張計測機能を有効にすると収集されます

そのほか

- `purchase`: 購入
- `sign_up`: サインアップ
- `login`: ログイン

とかも手動で設定して収集できるようです

独自に収集したいものもカスタムイベントで収集できます  

以前のUniversal Analyticsより何をしたかが分かるようになってますね  

## 設定方法

簡単に設定の流れを追うと

1. GA4のプロパティを作成
2. GA4のMeasurement Idを確認、G-XXXXXXXXXXの形のもの
3. Google Tag Managerでワークスペースを作成
4. 新しいタグでGoogle タグを選択
5. タグ IDにGA4のMeasurement Idを設定
6. トリガーを設定
7. ワークスペースの公開

といった感じです  
新しいタグではGoogle Analyticsを選ぶより、Google タグを選ぶほうが楽でした  

## まとめ

ページビューだけ取れたらいいとは思ってましたが使いこなすといいかもしれません  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3MGfCq3" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81AziSQNDUL._SY522_.jpg" alt="How Google Works (日本経済新聞出版)" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">How Google Works (日本経済新聞出版)</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
