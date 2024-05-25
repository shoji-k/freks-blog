---
title: 'Azure AI Bot ServiceにBotを登録する'
date: '2024-05-26'
updated: ''
---

[Microsoft Bot FrameworkをWSLで動かす](/microsoft-bot-framework-on-wsl) でBot FrameworkをWSLで動かしました  

ボットを Azure AI Bot Service に登録してみます

[Azure portal で Azure Bot リソースを作成する \- Bot Service \| Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/bot-service/abs-quickstart?view=azure-bot-service-4.0&tabs=multitenant) のほぼ手順通りに作成します  

今回は  
アプリの種類: マルチテナント  
にしました

ドキュメント通り必要なパラメータを取得します  
マルチテナントにしたので

MicrosoftAppType: MultiTenant  
MicrosoftAppId: ボットのアプリ ID。  
MicrosoftAppPassword: ボットのアプリ パスワード。  
MicrosoftAppTenantId: 該当なし。 マルチテナント ボットの場合は、この値を空白のままにします。  

ローカルのBot Frameworkの`.env`ファイルに設定します  

できたらBot Frameworkを立ち上げます  

```bash
npm start
```

Bot Frameworkをインターネット越しに見えるようにするためにngrokを使います  

```bash
ngrok http 3978
```

これでURLが用意されます  
そのURLをAzureのBot Serviceの設定 構成 > メッセージエンドポイント にいれます  

保存したら "Webチャットでテスト" で動作確認ができました  

## まとめ

ドキュメントを何度も読み込んでやらないと目的のことができないのでつらいですね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3wvSjuC" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
