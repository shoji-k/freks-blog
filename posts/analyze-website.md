---
title: 'ウェブサイトで使われている技術を調べる'
date: '2025-05-01'
updated: ''
---

仕事で情報のないサイトの移転を頼まれたので何が使われていてどこのサーバーにあるか調べてみました

## whois

ドメイン名でwhoisを調べると、ドメイン名の登録者情報がわかります

```bash
whois example.com
```

これでドメイン名の登録者情報が見える分だけわかります  

## dig

ドメイン名のDNS情報を調べるために、digコマンドを使用します。

```bash
dig example.com
```

これでドメイン名のDNS情報がわかります  
AレコードにIPアドレスがあるのでさらに

```bash
whois <IPアドレス>
```

これでIPアドレスの登録者情報がわかります  
今回はGoogle Cloudでした  

Google Cloud上で自分でホスティングしているか、どこかのサービスを使っているかは分かりません

## curl

curlコマンドを使って、HTTPヘッダを調べます

```bash
curl -I example.com
```

これでHTTPヘッダがわかります  
Nginxで動いていることがわかりました  

## wappalyzer

ウェブサイトの技術スタックを調べるサービスがあるので使ってみます
Chromeの拡張機能の紹介が多いですが、Webサイトでも利用できたのでこちらを使います

<https://www.wappalyzer.com/lookup/>

利用にはサインアップが必要だったので登録しました  
ドメイン名を入力すると、技術スタックがわかります  
データがあるサイトは即座に出るみたいですが、今回は解析が終わったらメールで知らせが来ました  

出来上がったものが

![wappalyzer](/analyze-website/wappalyzer.webp)です  

こんな感じで、どんな技術が使われているかがわかります  
ちなみにホスティングサイトはsitegroundってとこでした  
知らないところでした  
どうやって分かったんですかね  

## まとめ

知らないサイトの理解が進みました  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4g8lh5V" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81S71R5s-jL._SY466_.jpg" alt="Webを支える技術 ―― HTTP，URI，HTML，そしてREST" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Webを支える技術 ―― HTTP，URI，HTML，そしてREST</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
