---
title: 'Microsoft Teamsアプリの種類'
date: '2024-05-04'
updated: ''
---

Microsoft Teamsのアプリの種類がいくつかあって分かりにくいので整理してみます

## タブ

タブが追加されて常駐するタイプのアプリです  

[JavaScript を使用した Hello World \- Teams \| Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoftteams/platform/sbs-gs-javascript?tabs=vscode%2Cvsc%2Cviscode) のチュートリアルをしてみました

手順通りやるのですが、途中に記載がある自身のPCで動かすのに必要な証明書を設定が必要でした  
これをしないと画面がエラーで表示されません

[Installing the trusted root certificate \| Microsoft Learn](https://learn.microsoft.com/ja-jp/skype-sdk/sdn/articles/installing-the-trusted-root-certificate#adding-certificate-snap-ins) の手順で証明書の追加が必要でした  
手順通り、MMCの設定をしました

![mmc setting](/microsoft-teams-apps-type/mmc.webp)  

これでチュートリアルを進めると  

![tab app](/microsoft-teams-apps-type/tab.webp)  

左のサイドバーにアプリが増えます

## 通知ボット

[対話型の通知ボットを構築する \- Teams \| Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoftteams/platform/get-started/build-interactive-notification-bot?tabs=teamstoolkitcodespaces) のチュートリアルをしてみました

アプリをDebug in Chromeとかのブラウザで立ち上げると、Teamsの画面でアプリの追加画面がでます  
そのまま追加をすると、チャットに通知ボットが追加されます
プルダウンでチームへ参加させると、チーム内のチャットを選んで追加できます  

### チャット

通知ボットとのチャットの部屋ができます

![chat ui](/microsoft-teams-apps-type/chat.webp)  

### チームチャット

選んだチャットに通知ボットが追加されます  

![team chat ui](/microsoft-teams-apps-type/team-chat.webp)  

## メッセージ拡張機能

2種類があるようで

- 検索コマンド: 外部システムを検索し、カードの形式でメッセージに結果を挿入できます。
- アクション コマンド: 情報を収集または表示するためのモーダル ポップアップをユーザーに表示できます。 その後、対話を処理し、情報を Teams に送信できます。

検索コマンドのチュートリアルをしてみました

[JavaScript を使用した Hello World \- Teams \| Microsoft Learn](https://learn.microsoft.com/ja-jp/microsoftteams/platform/sbs-gs-msgext?tabs=vscode%2Cvsc1%2Cvsc2%2Cmsgext%2Cvsc3%2Cvsc4)

手順通り進めていくと入力フォームのオプションにアプリが追加されます

![open message app](/microsoft-teams-apps-type/message-app.webp)  
![message app](/microsoft-teams-apps-type/message-app-2.webp)  

npmパッケージ名を検索して表示できるアプリでした

## まとめ

チュートリアルをやってみて概要がつかめました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3wvSjuC" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
