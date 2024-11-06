---
title: 'GA4を使ってみる'
date: '2024-11-06'
updated: ''
---

Google Analytics 4 (GA4) を使ってみました  

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
