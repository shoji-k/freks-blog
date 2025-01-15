---
title: "GitHub issueへ貼り付けた画像サイズを変更する"
date: "2025-01-15"
updated: ""
---

GitHub issueに画像を貼り付けると、画像が大きくて見づらいことがあります  
画像のサイズを変更してみました  

GitHub issueに画像を貼り付けると

```markdown
![画像](https://example.com/image.png)
```

といった形になります  

これをhtmlに変更してサイズの指定をします  

```html
<img src="https://example.com/image.png" width="200">
```

としてあげると、`width` がきいてサイズが指定できます  

styleの指定では `max-width: 100%` に変換されてだめでした  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4fZGiyg" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81gQuzW7UQL._SY385_.jpg" alt="はじめてでもできる　GitとGitHubの教科書" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">はじめてでもできる　GitとGitHubの教科書</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
