---
title: "Rubyのインストール"
date: "2019-01-15"
---

## rbenv

[rbenv](https://github.com/rbenv/rbenv)を使います  

Ubuntu 18.02で試しました  

Readmeの記載通りにインストール  

```
$ git clone https://github.com/rbenv/rbenv.git ~/.rbenv
$ cd ~/.rbenv && src/configure && make -C src
```

Ubuntuを使っているので、.bashrcに追記

```
$ echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bashrc
$ echo 'eval "$(rbenv init -)"' >> ~/.bashrc
```

### check rbenv

rbenv-doctorでrbenvをチェックする

```
$ curl -fsSL https://github.com/rbenv/rbenv-installer/raw/master/bin/rbenv-doctor | bash
```

### update rbenv

```
$ cd ~/.rbenv
$ git pull
```

## install ruby-build

rbenv installを使うためにはruby-buildが必要  
[rbenv/ruby\-build: Compile and install Ruby](https://github.com/rbenv/ruby-build#readme)

```
$ mkdir -p "$(rbenv root)"/plugins
$ git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
```

### update ruby-build

```
$ cd "$(rbenv root)"/plugins/ruby-build && git pull
```

## Rubyをインストールする

```
$ rbenv install -l
$ rbenv install 2.6.0
```

システム全体で使うRuby versionの指定  

```
$ rbenv global 2.6.0
```

## Rubygems

バージョンアップ  

```
$ gem update --system
```

## bundler

gem管理に  
[Bundler: The best way to manage a Ruby application's gems](https://bundler.io/)
を使います  

```
$ gem install bundler
```

初期化

```
$ bundle init
```

Gemfileに書かれたgemをインストール  
--path をつけると指定したところへインストール  
つけないとシステムへインストール  

```
bundle install --path vendor/bundle
```

一度 --path をつけると記憶され2回目からは指定いらない  

実行  
bundle exec をつけないとシステムのgemを実行する  

```
bundle exec rails -v
```

