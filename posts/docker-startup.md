---
title: '起動時にdockerも立ち上げておく'
date: '2024-04-13'
updated: ''
---

Ubuntu 20.04の起動時にdockerを立ち上げるには

```bash
sudo systemctl enable docker
```

systemctlで管理できるようになっています  

dockerをstopするには

```bash
sudo systemctl stop docker
```

dockerをstartするには

```bash
sudo systemctl start docker
```

dockerをrestartするには

```bash
sudo systemctl restart docker
```

## まとめ

serviceでなくsystemctlを使っていきましょう

<hr />

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xx2E4t" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Zf2sCCj9L._SY522_.jpg" alt="プログラマのためのDocker教科書 第2版 インフラの基礎知識&コードによる環境構築の自動化" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">プログラマのためのDocker教科書 第2版 インフラの基礎知識&コードによる環境構築の自動化</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
