---
title: 'Microsoft Teams APIで通知が送りたい'
date: '2024-05-12'
updated: ''
---

Microsoft Teams の API を叩いて、チャットメッセージを送りたかったので調べてみました  
Microsoft TeamsのAPIはないようで、Microsoft Graph API を使うようです  

要件があえば、[送信 Webhook を作成する \- Teams \| Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoftteams/platform/webhooks-and-connectors/how-to/add-outgoing-webhook?tabs=urljsonpayload%2Cdotnet) が最も気軽そうですが、送り先を自在にできないので別の方法を探してます  

[Microsoft Graph の概要 \- Microsoft Graph \| Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/overview) を読むと  

```txt
Microsoft Graph は、Microsoft 365 のデータとインテリジェンスへの入り口です。 Microsoft Graph は、Microsoft 365、Windows、および Enterprise Mobility + Security の膨大な量のデータにアクセスする際に使用できる統合型プログラミング モデルを提供します。 Microsoft Graph を通じてアクセスできる豊富なデータを使用して、何百万人ものユーザーと対話する組織やコンシューマー向けのアプリを構築します。
```

と意味が分かりにくい説明で困ります  

[Microsoft Graph API を使用する \- Microsoft Graph \| Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/use-the-api?context=graph%2Fapi%2F1.0&view=graph-rest-1.0) あたりが欲しい情報でした  

Microsoft Graph APIを利用するには、

- アプリを登録
- サービス または ユーザーの認証トークンを取得

する必要があるようです  

アプリを登録とは、Azure Active Directory にアプリケーションを登録して、アプリケーションに対してアクセス許可を与えることのようです  
-> Azureのアカウントと環境を用意しないといけません

設定ができれば  
[Microsoft Graph での Microsoft Teams メッセージング API の操作 \- Microsoft Graph \| Microsoft Learn](https://learn.microsoft.com/ja-jp/graph/teams-messaging-overview)  
で送れそうです  

## まとめ

Azureのアカウントとかいらなくて、Microsoft Teamsのアプリだけで完結する方法が欲しかったところです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3wvSjuC" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
