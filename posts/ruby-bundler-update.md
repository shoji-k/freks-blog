---
title: 'bundlerのバージョンをあげる'
date: '2024-03-01'
updated: ''
---

Ruby on Railsで開発してて、bundlerのバージョンが古いことに気づきました

```bash
$ bundler -v
Bundler version 2.3.7
```

Gemfile.lockの一番最後にもbundler versionが入っています

```rb
BUNDLED WITH
   2.3.7
```

両方更新していきます

bundlerをアップデートします

```bash
gem install bundler
```

rbenvでrubyを入れている場合は

```bash
rbenv exec gem install bundler
rbenv rehash
```

が必要です

確認、変わってないです

```bash
$ bundler -v
Bundler version 2.3.7
```

Gemfile.lockを更新します

```bash
bundle update --bundler
```

これで再度確認すると

```bash
$ bundler -v
Bundler version 2.5.6
```

上がりました

ちょっと解説すると

```bash
$ gem list bundler
bundler (2.5.6, 2.3.7)
```

という風にbundlerは2バージョン入ってます  
Gemfile.lockの指定のほうが使われるようです

PR

プログラム経験ある人は  
[プロを目指す人のためのRuby入門［改訂2版］　言語仕様からテスト駆動開発・デバッグ技法まで Software Design plus](https://amzn.to/3Tedn13) <small>(このリンクは、アフィリエイトリンクです)</small>  
がおすすめです

プログラム経験のあまりない人は  
[スラスラ読める Rubyふりがなプログラミング (ふりがなプログラミングシリーズ)](https://amzn.to/49AqT5b) <small>(このリンクは、アフィリエイトリンクです)</small>  
とかがいいと思います
