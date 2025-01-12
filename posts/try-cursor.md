---
title: "Cursorを試してみた"
date: "2025-01-12"
updated: ""
---

AIエディターの [Cursor - The AI Code Editor](https://www.cursor.com/) を試してみました  
VS CodeをForkして作られており、VS Codeと使い勝手が似ています  

使いかたは  
[Features \| Cursor \- The AI Code Editor](https://www.cursor.com/features)  
[Get Started / Migrate from VS Code – Cursor](https://docs.cursor.com/get-started/migrate-from-vscode)  
あたりを読みます  

無料だと  

- 2000 completions
- 50 slow premium requests

使えるみたいです  

まずはダウンロードしてインストール、立ち上げます  
古かったら立ち上げたときにアップデートを促されます  

## WSLで使う

Windowsで実行していたので、WSLで使ってみます  

左下の接続ボタンをクリックして、"Connect to WSL using Distro.."を選んで、使いたいOSを選択します  
接続できると

![Connected to WSL](/try-cursor/cursor-toggle.webp)  

開発したいフォルダを開きます  

Terminal で `cursor .` とかすると、そのフォルダでCursorが開いて便利です  

## AI Coding

`Ctrl + i` 右のエリアにChatが表示されます  
質問するとAIがコードを生成してくれます  

デフォルトの `claude-3.5-sonnet`に質問してみました  

```txt
Vite + TypeScript + React.jsでTODOアプリを作りたい

決めることがあれば質問してください
```

```txt
TODOアプリの基本的な機能を実装するためのプランを提案させていただきます。まず、以下の点について確認させてください：
必要な機能：
TODOの追加
TODOの削除
TODOの完了/未完了の切り替え
TODOのリスト表示
データの保存方法：
ローカルストレージを使用するか
バックエンドサーバーと連携するか
まずは、基本的なプロジェクト構造を作成しましょう。以下のコマンドでプロジェクトを初期化できます：
基本的なコンポーネント構造を提案させていただきます：
これは基本的な構造です。続けて必要なコンポーネントを作成しますが、以下の点について確認させていただきたいです：
1. スタイリングについて：
TailwindCSSを使用しますか？
別のCSSフレームワークを使用しますか？
カスタムCSSを書きますか？
追加機能について：
TODOの編集機能は必要ですか？
TODOの優先順位付けは必要ですか？
TODOの締切日設定は必要ですか？
これらの点について決まりましたら、具体的な実装を進めていきたいと思います。
```

こんな感じで返ってきました  

```txt
データはローカルストレージを使用、Tailwindcssを使用してください
```

とかして、出てきたコマンドを一から実行、ちょっと手直ししたりして、あっという間にTODOアプリができました

## ショートカット  

`Ctrl + k` でインラインで質問できます  
コードを選択して実行すると、そのコードに対して質問ができる  

`Ctrl + i` でChatを開いて質問できます  
コードを選択して実行すると、そのコードに対して質問ができる  

`Ctrl + k` でコードの編集が依頼できる  
コードを選択して実行すると、そのコードに対して編集依頼ができる

## まとめ

使いこなすと便利なものが用意されてそう  
VS Code + GitHub Copilot とやれることは似てますが、Cursorのほうが先にいってそうです  

慣れの問題があるので、気が向いたら使っていくかもしれません  

PR

この本読むといいかもしれません

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Ch01f3" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Aa-EQ2ATL._SY425_.jpg" alt="AIエディタCursor完全ガイド ―やりたいことを伝えるだけでできる新世代プログラミング" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">AIエディタCursor完全ガイド ―やりたいことを伝えるだけでできる新世代プログラミング</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
