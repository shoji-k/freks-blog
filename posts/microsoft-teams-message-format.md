---
title: 'Microsoft Teamsへの通知の見た目をよくしたい'
date: '2024-09-10'
updated: ''
---

[プロアクティブ メッセージを送信する \- Teams \| Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoftteams/platform/bots/how-to/conversations/send-proactive-messages?tabs=dotnet) で、Microsoft TeamsのAPIを使って通知を送っています

メッセージの見た目をよくしたかったので調べてみました  

送信時の最小のJSONは

```json
{
  "type": "message",
  "text": "Hello, World!"
}
```

です

[カード内のテキストの書式設定 Markdown \- Teams \| Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cdesktop%2Cconnector-html#format-cards-with-markdown)  
でMarkdownの書式設定ができます

[カード内のテキストの書式設定 HTML \- Teams \| Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cdesktop%2Cconnector-html#format-cards-with-html)  
でHTMLの書式設定ができます

[カード内のテキストの書式設定 AdaptiveCard \- Teams \| Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cdesktop%2Cconnector-html#adaptive-cards-format-sample)  
でAdaptiveCardというのでよりリッチな見た目にできそうです  

今回やりたかったのは

```json
{
  "type": "message",
  "message": "Hi, this is me!",
  "attachments": [
    {
      "contentType": "application/vnd.microsoft.card.adaptive",
      "content": {
        "type": "AdaptiveCard",
        "body": [
          {
            "type": "TextBlock",
            "text": "Hello, World!",
            "wrap": true
          }
        ],
        "msteams": {
          "width": "Full"
        }
      }
    }
  ]
}
```

とか

```json
{
  "type": "message",
  "message": "Hi, this is me!<br><blockquote>Hello, World!</blockquote>",
}
```

でした

## まとめ

Microsoftのドキュメントは量が多く散らかってるので、知りたい情報へたどり着くのが大変ですね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3MxHA7x" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
