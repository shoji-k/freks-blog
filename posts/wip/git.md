---
title: "git tips"
date: "2019-12-31"
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

```
git config --global user.signingkey (key)
```

の設定をする

### on Ubuntu 18.04

$ dpkg -l gnupg

でインストールされてることの確認

## Tips

### リモートブランチを手元に持ってくる  

```
$ git fetch origin
$ git checkout -b origin/branch_name local_branch_name
```
