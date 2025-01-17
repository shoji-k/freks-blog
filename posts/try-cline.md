---
title: "Clineを試してみた"
date: "2025-01-14"
updated: ""
---

AIエージェントの [Cline](https://github.com/cline/cline) を試してみました  
VSCodeに拡張機能を入れて使います  

[Cline \(prev\. Claude Dev\) \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev)

## 事前準備

VSCodeに [Cline \(prev\. Claude Dev\) \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=saoudrizwan.claude-dev) をインストールします  

左メニューのClineのアイコンから開きます  
初回起動時にLLMサービスのAPIキーをセットします  

費用がリーズナブルで評判のよさそうな [DeepSeek](https://platform.deepseek.com/) のAPIを用意しました  

## 実行してみる

```txt
Vite + TypeScript + React.js でTODOアプリが作りたいです
```

の命令をしてみました

```txt
cline >
ユーザーはVite + TypeScript + React.jsでTODOアプリを作成したいとのこと
現在の作業ディレクトリは空で、プロジェクトのセットアップから始める必要がある
まずViteプロジェクトを作成し、TypeScriptとReactのテンプレートを使用する
必要なツールはexecute_commandで、Viteプロジェクトの作成コマンドを実行する
必要なパラメータはすべて揃っている
```

でコマンドの実行を促される

```bash
npm create vite@latest . -- --template react-ts
```

Runボタンを押すと、ターミナルで実行されます  

```txt
cline >
Viteプロジェクトの作成が完了した
次に依存関係をインストールする必要がある
npm installコマンドを実行する
必要なツールはexecute_commandで、npm installコマンドを実行する
必要なパラメータはすべて揃っている
```

でコマンドの実行を促される

```bash
npm install
```

Runボタンを押すと、ターミナルで実行されます  

```txt
cline >
依存関係のインストールが完了した
次にTODOアプリの基本的なコンポーネントを作成する
App.tsxを編集してTODOアプリの基本構造を作成する
必要なツールはreplace_in_fileで、App.tsxを編集する
必要なパラメータはすべて揃っている
```

`src/App.tsx`を編集される  
`Save`ボタンを押すと、ファイルが保存されます

```txt
cline >
App.tsxの更新が完了したが、未使用のインポートに関するESLintエラーが発生している
reactLogoとviteLogoのインポートを削除する必要がある
必要なツールはreplace_in_fileで、App.tsxから未使用のインポートを削除する
必要なパラメータはすべて揃っている
```

インポートエラーが出てたので、直してくれます  

`src/App.tsx`を編集される  
`Save`ボタンを押すと、ファイルが保存されます

```txt
cline >
未使用のインポートを削除し、ESLintエラーを解消した
次にApp.cssを編集してTODOアプリのスタイルを整える必要がある
必要なツールはreplace_in_fileで、App.cssを編集する
必要なパラメータはすべて揃っている
```

スタイルを直してくれるそう  

`src/App.tsx`を編集される  
`Save`ボタンを押すと、ファイルが保存されます

```txt
cline >
App.cssの更新が完了し、TODOアプリのスタイルが整った
次に開発サーバーを起動してアプリを確認する
必要なツールはexecute_commandで、npm run devコマンドを実行する
必要なパラメータはすべて揃っている
```

でコマンドの実行を促される

```bash
npm run dev
```

Runボタンを押すと、ターミナルで実行されます  

動作するアプリができました

[shoji\-k/cline\-todo at cline\-sample](https://github.com/shoji-k/cline-todo/tree/cline-sample)  

## 失敗例

Azure OpenAI のモデルを使ってTodo生成ボタンを作って  
の命令は微妙に古い情報を参照してくるとかで、うまく動くコードになりませんでした  
情報量が少ないものは苦手かもです

## まとめ

AIエージェントの威力を感じました  
ボタンを押すだけで、スムーズに開発進んでいいですね  

ここまでで $0.0037 かかりました  
もうちょっと使ってみようと思います  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/40ehpcv" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81EffLY2ucL._SY385_.jpg" alt="生成AIで世界はこう変わる" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">生成AI時代の新プログラミング実践ガイド Pythonで学ぶGPTとCopilotの活用ベストプラクティス</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
