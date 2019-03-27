---
title: "Git tips"
date: "2019-01-17"
---

## install

[download Git](https://git-scm.com/download/linux)

### on Ubuntu

```
$ sudo add-apt-repository ppa:git-core/ppa
$ sudo apt update
$ sudo apt install git
```

## 最初の設定

[dotfiles/git\-init\.sh at master · shoji\-k/dotfiles](https://github.com/shoji-k/dotfiles/blob/master/git-init.sh)

GPG key
[Managing commit signature verification \- User Documentation](https://help.github.com/articles/managing-commit-signature-verification/)

[Generating a new GPG key \- User Documentation](https://help.github.com/articles/generating-a-new-gpg-key/)
を参考にGPG keyを作る

gnupg2を使った場合、

```
export GPG_TTY=$(tty)
```

が必要なので実行、.bashrcなどにも書いておく  

```
git config --global commit.gpgsign true
```

の設定をする

commitのときに ```-S``` をつけると署名付きコミットになるが、全て署名付きにしたかったら  

```
git config --global commit.gpgsign true
```

ただし、リーナスは推奨してないらしい  

### on Ubuntu 18.04

$ dpkg -l gnupg

でインストールされてることの確認

## Tips

### リモートブランチを手元に持ってくる  

```
$ git fetch origin
$ git checkout -b origin/branch_name local_branch_name
```

### タグやブランチを指定してcloneする

```
$ git clone -b tag_name https://sample.co.jp/sample.git
$ git checkout -b tag_name
```

### リモートブランチを削除する

```
$ git push origin --delete branch_name
```