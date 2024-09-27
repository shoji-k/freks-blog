---
title: 'WordPress Contact Form 7の投稿が届かない'
date: '2024-09-27'
updated: ''
---

聞かれて調べたのでまとめておきます  

[Contact Form 7 – WordPress プラグイン \| WordPress\.org 日本語](https://ja.wordpress.org/plugins/contact-form-7/)   
WordPressのお問い合わせフォームプラグインで、よく使われていると思います

投稿が届かないということで問題点と解決策を考えてみました

仕組みとしては

1. WordPressが動いているサーバーからメールを送る
2. その際、メールはContact Form 7に設定したメール送信元から送ったことにされる
3. 送信先のメールへ届く

## 問題になる点

### 送信元のサーバーと送信元のメールアドレスのドメインが違う  

なりすましメールとして扱われます  
送信元のサーバーと送信元のメールアドレスのドメインを同じにしておきましょう  

送信元のサーバーのドメインでメールアドレスを用意するのがいいです  

### SFP、DKIMが設定されてない

メールの送信元を保証する設定がされてないと、迷惑メールとして扱われることがあります  
Gmailが厳しくしたので特にGmailには届きづらいです  

## その他の解決策

### メール送信サービスを使う

SendGridやMailgunなどのメール送信サービスを使う方法があります  
これもSFP、DKIMの設定が必要ですが、WordPressが動いているドメインでメールを取ったりしなくていいので楽かもしれません  

[WP Mail SMTP by WPForms – 人気のある SMTP およびメールログプラグイン – WordPress プラグイン \| WordPress\.org 日本語](https://ja.wordpress.org/plugins/wp-mail-smtp/) を使うとできるみたいです  

### Contact Form 7を使うのをやめる

メールが届くフォームをやめて [Google Forms: オンライン フォーム作成ツール \| Google Workspace](https://www.google.com/intl/ja_jp/forms/about/) などに変えるのも手です  
メールが届くのでなくて、Google Spread Sheetに問い合わせがたまるようにできます  
投稿があったら通知を受け取ることも設定でできます  

## まとめ

初心者にとっつきやすいWordPressですが、問い合わせフォーム周りはややこしいですね  
SPF、DKIMとか厳しくなったのでよりややこしくなってしまいました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3TJOzhK" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81PW-I1FhUL._SY466_.jpg" alt="1冊ですべて身につくWordPress入門講座" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">1冊ですべて身につくWordPress入門講座</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
