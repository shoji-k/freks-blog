---
title: 'Gitでorigin/mainまでの変更を1つにする'
date: '2026-01-21'
updated: ''
---

Gitでcommitを連ねていて、ごちゃごちゃしたのでorigin/mainからの変更を1つのコミットにまとめてみます
方法は2種類  

## 前提

- 作業ブランチ: `feature-xxx`
- ベースブランチ: `origin/main`

## 方法1: reset --soft で全部まとめる

origin/main からの差分を全部1コミットにしたいとき

```bash
# 念のため最新を取る
git fetch origin

# origin/main の位置まで巻き戻しつつ、差分は全部ステージングに残す
git reset --soft origin/main

# 差分を1コミットにする
git commit -m "feat: XXXを実装"

# 履歴を書き換えるので force-with-lease で push
# force pushしてよければ、-f でpush
git push origin feature-xxx --force-with-lease
```

もし、force pushしたくなければ、別のブランチに切り替えてpushするといいです

## 方法2: rebase -iで柔軟にまとめる

「一部だけまとめる」「コミット単位でもう少し調整したい」場合はインタラクティブ rebase。

```bash
# origin/main からの差分コミットを並べて編集
git fetch origin
git rebase -i origin/main
```

エディタが開いたら、例えば最初はこんな感じ:

```bash
pick abc1234 最初のコミット
pick def5678 2 個目
pick 9999999 3 個目
```

これをこう書き換える

```bash
pick abc1234 最初のコミット
s def5678 2 個目
s 9999999 3 個目
pick そのまま残す
```

squash / s: 直前のコミットに統合、メッセージも統合  
fixup / f: 直前のコミットに統合、メッセージは捨て

保存して閉じると、コミットメッセージ編集画面が出るので、最終的な 1 コミット分のメッセージを書く

最後に push

```bash
git push origin feature-xxx --force-with-lease
```

もし、force push してよければ

```bash
git push origin feature-xxx -f
```

## まとめ

PRはいい感じにしたいですね

<hr />

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/47fcefs" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71soeH9BOlL._SY522_.jpg" alt="改訂新版 Visual Studio Code実践ガイド —— 定番コードエディタを使い倒すテクニック" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">改訂新版 Visual Studio Code実践ガイド —— 定番コードエディタを使い倒すテクニック</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
