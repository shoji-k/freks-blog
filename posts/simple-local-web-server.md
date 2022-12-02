---
title: 'ローカルで簡単にウェブサーバーを立ち上げる'
date: '2022-11-30'
updated: ''
---

ローカルで手元の html をブラウザで正しくみたいときに

Ruby がインストールされていれば

```bash
ruby -run -e httpd . -p 8000
```

http://localhost:8000
で確認できます

Node.js がインストールされていれば [serve](https://www.npmjs.com/package/serve) をインストールして

```
npm install -g serve
serve
```

で確認できます
