---
title: 'Git tips'
date: '2019-01-17'
---

## install

[download Git](https://git-scm.com/download/linux)

### on Ubuntu

```
$ sudo add-apt-repository ppa:git-core/ppa
$ sudo apt update
$ sudo apt install git
```

## 設定

こんな感じの初期設定してます

```
git config --global user.name (name)
git config --global user.email (email address)
git config --global color.ui auto
git config --global alias.ch checkout
git config --global alias.co commit
git config --global alias.st status
git config --global alias.br branch
git config --global core.quotepath off
git config --global core.editor vim
git config --global push.default simple
git config --global commit.verbose true
```

[dotfiles/git\-init\.sh at master · shoji\-k/dotfiles](https://github.com/shoji-k/dotfiles/blob/master/git-init.sh)

GPG key
[Managing commit signature verification \- User Documentation](https://help.github.com/articles/managing-commit-signature-verification/)

[Generating a new GPG key \- User Documentation](https://help.github.com/articles/generating-a-new-gpg-key/)
を参考に GPG key を作る

gnupg2 を使った場合、

```
export GPG_TTY=$(tty)
```

が必要なので実行、.bashrc などにも書いておく

```
git config --global commit.gpgsign true
```

の設定をする

commit のときに `-S` をつけると署名付きコミットになるが、全て署名付きにしたかったら

```
git config --global commit.gpgsign true
```

ただし、リーナスは推奨してないらしい

### on Ubuntu 18.04

\$ dpkg -l gnupg

でインストールされてることの確認

## Tips

### リモートブランチを手元に持ってくる

```
$ git fetch origin
$ git checkout -b local_branch_name origin/branch_name
```

### タグやブランチを指定して clone する

```
$ git clone -b tag_name https://sample.co.jp/sample.git
$ git checkout -b tag_name
```

### リモートブランチを削除する

```
$ git push origin --delete branch_name
```

### 差分ファイルを zip に固める

```
git archive --format=zip HEAD `git diff --name-only HEAD HEAD^^` -o diff.zip
```

### .gitignore を使わずに無視する

自分の手元だけ置きたいファイルがあるけど、.gitignore にも書きたくない場合

`.git/info/exclude` に書くと無視される

例）

$ mkdir .git/info  
$ vim .git/info/exclude

```
sample
```

とすると

\$ touch sample

しても Git は無視してくれる

### 編集したことを無視する

.git 管理しているファイルを、編集したときを、Git に無視してほしいときは

\$ git update-index --assume-unchanged (編集を無視したいファイル)

とする

例）

.my.env は Git 管理されてる

\$ echo 'mysetting=true' >> .my.env

これだと Git に編集されたことが伝わるが

\$ git update-index --assume-unchanged .my.env

すると無視される

設定を戻すには

\$ git update-index --no-assume-unchanged .my.env

設定を確認するには

\$ git ls-files -v

```
h .my.env
H test
```

と h などが小文字で表示される

## git diff-highlight

差分が見やすくなる

link:  
https://udomomo.hatenablog.com/entry/2019/12/01/181404

PATHを通すためにmakeする必要があった  
https://qiita.com/sakahukamaki/items/c93143c583f276ff1c04

## 作業途中に違うブランチの作業をするとき

2つやり方がある

### git stashで編集中のコードを対比して、branch切り替え

```
git stash
git checkout hot-fix
```

として作業してcommitしてpush  

編集中のコードを戻すには

```
git checkout main-branch
git stash pop
```

で戻ってきます

### git worktreeを使う

git worktreeを使うと新しくディレクトリを作ってcheckoutできます  
git branchで存在しているブランチだったら切り替えられて  

```
git worktree add production
```

とすると `./production` ディレクトリが作成され、productionブランチに切り替わります

```
cd production
```

で作業して、commitしてpushできます  

```
git worktree list
```

でworktreeの一覧が見えるのですが、不要なものを消すには

```
git worktree remove production
```

でディレクトリごと消せます  

この方法だとディレクトリが変わるので、webアプリの場合、サーバー立ち上げて確認しないといけないので、あんまり効率よくなさそうです


