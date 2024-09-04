---
title: 'Dev Container起動時にterminalをbashにする'
date: '2024-04-12'
updated: ''
---

VSCode Dev Containerで開発環境作っています
今回は `python` のimageを指定したときのですが、にterminal shellが `sh` になっていました  
`bash` に変更したかったので

.devcontainer/devcontainer.json に追加

```json
{
  // ...
  "postStartCommand": "bash",
  // ...
}
```

これで立ち上げ後にbashになりました

<hr />

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/47fcefs" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71soeH9BOlL._SY522_.jpg" alt="改訂新版 Visual Studio Code実践ガイド —— 定番コードエディタを使い倒すテクニック" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">改訂新版 Visual Studio Code実践ガイド —— 定番コードエディタを使い倒すテクニック</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
