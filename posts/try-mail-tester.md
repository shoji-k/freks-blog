---
title: 'mail-testerでメールのテストをする'
date: '2024-01-26'
updated: ''
---

Googleで2024年2月から[メール送信者のガイドライン](https://support.google.com/a/answer/81126?visit_id=638418264778817404-2533795751&rd=1#zippy=%2C%E3%81%99%E3%81%B9%E3%81%A6%E3%81%AE%E9%80%81%E4%BF%A1%E8%80%85%E3%81%AE%E8%A6%81%E4%BB%B6) にあるように要件が増えたりでメール送信が話題になっています

自分の持っているドメインのメール設定をチェックしてみます

[Newsletters spam test by mail\-tester\.com](https://www.mail-tester.com/) を使います

トップページに表示されたメールアドレスに自分のドメインのメールを送ります  
タイトルと本文はいれないと結果のスコアが悪くなるので入れたほうがいいです  

送信後、"Then check your score" をクリックすると結果が表示されます

<img src="/try-mail-tester/mail-tester-result.webp" alt="Mail tester result" width="300" style="width: 300px; border: 1px solid #ccc;" />

スコアは 9 / 10 でした

"Your message does not contain a List-Unsubscribe header" はメーリングリスト送信とかに必要なので無視します  

"You're listed in 2 blocklists" はブロックリストに載っているということなので、そのサイトに行って解除してもらう必要があります  
後で対応します  

PR

[メールはなぜ届くのか　インターネットのしくみがよくわかる (ブルーバックス)](https://amzn.to/42fOViX) <small>(このリンクは、アフィリエイトリンクです)</small>
