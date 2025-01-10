---
title: 'GitHub Copilotの使い方をおさらい 2'
date: '2025-01-10'
updated: ''
---

[GitHub Copilotの使い方をおさらい](/github-copilot/) が古くなってきたのでまた、GitHub Copilotの使い方をおさらい

## GitHub Copilot

VSCodeに [GitHub Copilot \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) を入れて試します  

基本的にはInlineでの編集用  

コードを書いて、サジェスチョンが出てくるのでTab、Tabで承認していく  

`Ctrl + Alt + i` でCopilot Chatでコードに対して質問できます  
Copilotに見てほしいファイルを選択させると、回答精度がよくなりそうです  

コマンドパレットから `GitHub Copilot: Build Local Workspace index` を選んで実行するとインデックスを作ってくれて
`@workspace` で質問すると、そのインデックスを使って回答してくれます  
今日時点だと `bookingsページで404 error のtoastが起こることがあります railsのどのapiでおきますか？` とか聞いても共通処理のコードを示してきていまいち使えませんでした  

エディタでコードを選択して `Ctrl + i` でインラインで質問もできます  

## GitHub Copilot Chat

VSCodeに [GitHub Copilot Chat \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot-chat) を入れて試します  

こっちはAIアシスタントです  

`Ctrl + Shift + i` でEdit with Copilotでコードを編集させることができます  

## 設定

[GitHub Copilot のカスタム指示の追加 \- GitHub Docs](https://docs.github.com/ja/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot)  
Custom instructionsを追加することで、コードサジェスチョンをカスタマイズできます  

## まとめ

いい動きをするときはいいですね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/40ehpcv" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81EffLY2ucL._SY385_.jpg" alt="生成AIで世界はこう変わる" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">生成AI時代の新プログラミング実践ガイド Pythonで学ぶGPTとCopilotの活用ベストプラクティス</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
