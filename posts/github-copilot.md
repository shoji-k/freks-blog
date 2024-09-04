---
title: 'GitHub Copilotの使い方をおさらい'
date: '2024-03-28'
updated: ''
---

GitHub Copilotの使い方をおさらいしてみます  
手になじむませたいですね

## 事前準備

始めるのは [GitHub Copilot · Your AI pair programmer](https://github.com/features/copilot) から始めてください  
VSCodeに [GitHub Copilot \- Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) を入れて試します  

## 使い方

- コードを書いていると、次のコードがサジェスチョンされる
- Copilotのコードが欲しいときに `Ctrl + Enter` でサジェスチョンを表示
- Ctrl + Shift + i でプロンプトを開いて質問
- 左のサイドバーの Chat: Copilot をクリックして質問

### コメントを書いて始める

```js
/*
Create a basic markdown editor in Next.js with the following features:
- Use react hooks
- Create state for markdown with default text "type markdown here"
- A text area where users can write markdown
- Show a live preview of the markdown text as I type
- Support for basic markdown syntax like headers, bold, italics
- Use React markdown npm package
- The markdown text and resulting HTML should be saved in the component's state and updated in real time
*/
```

と、コメントを書くとその下でコードサジェスチョンが指示に従います  

### 処理ごとにコメントを書く

```js
function reverseSentences(sentences) {
  // first, let's split the sentences into words
  const words = sentences.split(' ')

  // second, let's reverse the words
}
```

コードサジェスチョンが指示に従っていきます  

### コードのサンプルを書く

```js
// Map through an array of arrays of objects
// Example: Extract names from the data array
// Desired outcome: ['John', 'Jane', 'Bob']
const data = [
[{ name: 'John', age: 25 }, { name: 'Jane', age: 30 }],
[{ name: 'Bob', age: 40 }]
];
```

Copilotに例を示すと、よりいいコードサジェスチョンが返ってきます  

### より明確な指示を与える

あいまいな指示だとあいまいなコードがでがち

### 関連するファイルは開いておく

VSCodeでCopilotが見てほしいファイルは開いておきます

### 意味のある命名を付ける

変数名や関数名は何をするか分かる命名にすると、よりいいコードサジェスチョンが返ってきます  

## Copilotチャットインターフェースの技

### 特定フレーズ

`/explain` で解説してもらえます  
`#editor` でVSCodeで開いているファイルについて質問できます  
`#selection` で選択しているコードについて質問できます  
`@terminal` でターミナルについて聞けます  
他にもあるので `#` や `@` や `/` を入力して候補をチェックしてみてください  

### Chat: Copilot で候補を表示

左のサイドバーの Chat: Copilot をクリックして開き、入力フォームで上キーを押すと候補が選べます

引用元:  
[How to use GitHub Copilot: Prompts, tips, and use cases - The GitHub Blog](https://github.blog/2023-06-20-how-to-write-better-prompts-for-github-copilot/)  
[Using GitHub Copilot in your IDE: Tips, tricks and best practices - The GitHub Blog](https://github.blog/2024-03-25-how-to-use-github-copilot-in-your-ide-tips-tricks-and-best-practices/)

PR

読んでよかったAIの本です  
読み物として面白かったです  

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/47gwAFi" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/713FFh-R+PL._SY466_.jpg" alt="生成AIで世界はこう変わる" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">生成AIで世界はこう変わる</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
