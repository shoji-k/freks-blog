---
title: 'Bashで.envファイルから環境変数を読み込む'
date: '2024-04-25'
updated: ''
---

bashでファイルに書かれている環境変数を読み込む方法です  

環境変数が`.env`ファイルに書かれているとします

```txt
API_KEY=xxxx
```

これを読み込みます

```bash
set -a
source .env
set +a
```

通常は `export API_KEY=xxxx` で環境変数を設定しますが、`set -a` で `export` が不要になります  

環境変数が読み込まれたか確認

```bash
echo $API_KEY
```

もしくは、環境変数一覧を見て確認

```bash
printenv
```

表示されれば成功です

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4cMo7KY" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/91sJnOahFiL._SY522_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
