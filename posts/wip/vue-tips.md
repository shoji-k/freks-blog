---
title: 'Vim tips'
date: '2020-12-30'
---

Vimの設定や調べ物したログを残します（更新していく予定）

## build

[Vim 8.1 をビルドして使ってみる](https://blog.freks.jp/vim8-build)

## filer

標準ファイラーが netrw  

[vimの標準ファイラnetrwは普通に良さそうな話し \- Qiita](https://qiita.com/gorilla0513/items/bf2f78dfec67242f5bcf)


## plugin

Vim8から標準機能ができた

```
$ mkdir -p ~/.vim/pack/git-plugins/start
```

を用意、git submodule で増やす

```
$ git submodule add git@github.com:tomtom/tcomment_vim.git ~/.vim/pack/git-plugins/start/tcomment_vim
```

vim起動時に読み込む必要がないなら `opt` ディレクトリに入れるといい

```
$ mkdir -p ~/.vim/pack/git-plugins/opt
```

git submoduleを最新にするには

```
$ git submodule update --remote
```

か

```
$ git submodule foreach git pull
```

らしいがまだ試してない

[Vim 8 時代のがんばらないプラグイン管理のすすめ \- Humanity](http://tyru.hatenablog.com/entry/2017/12/20/035142)
