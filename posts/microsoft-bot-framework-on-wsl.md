---
title: 'Microsoft Bot FrameworkをWSLで動かす'
date: '2024-05-25'
updated: ''
---

[基本的なボットを作成する \- Bot Service \| Microsoft Learn](https://learn.microsoft.com/ja-jp/azure/bot-service/bot-service-quickstart-create-bot?view=azure-bot-service-4.0&tabs=javascript%2Cvs#start-the-emulator-and-connect-your-bot) をWindows11のWSLでやってみました  

## Bot Framework

手順通りにWSL内のUbuntuでいれました  
javascriptでやります  
npm packageをグローバルに入れたくなかったのでローカルにいれてます

```bash
npm init
npm install generator-botbuilder yo
npx yo botbuilder
```

あとは指示してできたディレクトリで

```bash
npm start
```

これでBot Frameworkのサーバーが立ち上がります

## Bot Emulator

Bot Framework Emulatorをインストールして、Bot Frameworkのサーバーに接続するようです  
[microsoft/BotFramework\-Emulator](https://github.com/microsoft/botframework-emulator) の [GitHub releases](https://github.com/Microsoft/BotFramework-Emulator/releases/latest)  
から使うものをダウンロードするといいみたいです  

Windows exeをダウンロードしてWindows11上で起動してみて設定したのですが、通信できませんでした  
ネットワークの設定が必要なのかもしれませんが分からず  

WSL内のUbuntuでAppImageを動かしました  

```bash
curl -L -O https://github.com/microsoft/BotFramework-Emulator/releases/download/v4.14.1/BotFramework-Emulator-4.14.1-linux-x86_64.AppImage
chmod +x BotFramework-Emulator-4.14.1-linux-x86_64.AppImage
./BotFramework-Emulator-4.14.1-linux-x86_64.AppImage
```

これでBot Framework Emulatorが立ち上がり設定するとうまく動きました  

## まとめ

さくっとチュートリアルするかと思ったのですが、時間かかってしまいました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3MxHA7x" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71vy-5PGTWL._SY466_.jpg" alt="Microsoft Copilot for Microsoft 365活用大全" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Microsoft Copilot for Microsoft 365活用大全</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
