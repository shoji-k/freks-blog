---
title: 'ハイフンから始まるディレクトリを削除する'
date: '2024-09-09'
updated: ""
---

Linuxで `--typescript` のディレクトリができてました

```bash
$ cd --typescript/
-bash: cd: --: invalid option
cd: usage: cd [-L|[-P [-e]] [-@]] [dir]
```

とエラーがでます

```bash
cd ./--typescript/
```

とすればよかったです

間違えて出来てたので

```bash
rm -rf ./--typescript/
```

して削除しました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
