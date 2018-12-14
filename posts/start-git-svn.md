---
title: "git svnを使い始めました"
date: "2018-12-17"
---

まれにあるsubversion案件を、普段はgit管理、まとまったらsvnにまるごと手動であげていく、としていましたが、
色々やりにくいので git svn を使ってみます

git と svn はインストール済から始めました

## install on Ubuntu

以下は実施済みだったはずなのでスキップ

```
sudo add-apt-repository ppa:git-core/ppa
sudo apt update
```

インストール

```
sudo apt install git-svn
```

## git svn

svnからcloneします  
標準的なsvnの構成なら -s をつけるといいらしい  

```
git svn clone (your svn repository url) -s (output directory)
```

ですが、用意したsubversion repositoryが trunk ディレクトリしかなかったので

```
git svn clone (your svn repository url) -T trunk (output directory)
```

git svn clone は git svn init & git fetch なので、途中でうまく行かなかったりしたら

```
git svn init (your svn repository url) -T trunk (output directory)
cd (output directory)
git svn fetch
```

とするといいです

次のエラーが発生した場合

```
error: git-svn died of signal 11
```

reference: [git svn \- git svn clone fails with "error: git\-svn died of signal 11" \- Stack Overflow](https://stackoverflow.com/questions/42534064/git-svn-clone-fails-with-error-git-svn-died-of-signal-11)

libsvn-perl 1.9.4 で直ったらしい
たしかに使ってるのは 1.9.3 でした

```
sudo add-apt-repository ppa:dominik-stadler/subversion-1.9
sudo apt-get update
sudo apt install libsvn-perl
```

libsvn-perl 1.9.7がはいりました  

追加したrepositoryを削除する場合

```
sudo add-apt-repository --remove ppa:dominik-stadler/subversion-1.9
```

git commit はふつうにします

```
git add .
git commit -m 'some commit'
```

svnにあげるには、

```
git svn dcommit
```

ここで注意なのが、ローカルコミットのSHA-1チェックサムがすべて変わってしまうことです  
つまり、git remote repositoryにpushするときは、git svn dcommit した後にする必要があります  

svnから変更をダウンロードするには、  

```
git svn rebase
```

ここで注意なのが、git svn rebaseをすると、git commitが行われます  
つまり、手元が作業中だとcommitされてしまうので、git rebaseなどで退避したりする必要があります  

## svn branch

１つのブランチだと思うのがいいらしいので、masterだけ使うようにする  
git 側も複数ブランチ作っても、git svn dcommit するのは、１つのブランチだけにする  

## ignore file

.gitignoreを用意すると、subversionしか使わないユーザーには邪魔なので、  
.git/info/exclude  
に書くと、gitローカル環境だけignoreされる  

```
git svn show-ignore > .git/info/exclude
```

と最初にしておくとよさそうです

