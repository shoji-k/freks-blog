---
title: 'Railsでキャッシュをクリアする'
date: '2023-10-17'
updated: ''
---

Ruby on Railsでキャッシュをクリアする方法をまとめます  
Ruby on Rails 7.0.6 で確認しています

## Rails console

Rails consoleでキャッシュをクリアするには以下のコマンドを実行します  
`rails console` とかでコンソールを起動して

```ruby
Rails.cache.clear
```

## Rakeタスク

コマンドでキャッシュをクリアするには以下のコマンドを実行します

```bash
rails tmp:cache:clear
```

## Heroku

herokuコマンドを使うときはappnameなどを指定する必要があります  
appnameは、

```bash
heroku apps
```

で確認できます

所属している組織の分を見るには

```bash
heroku apps -t orgname
```

### Rakeタスク

Herokuでキャッシュをクリアするには以下のコマンドを実行します

```bash
heroku run rails tmp:cache:clear -a appname
```

### Heroku plugin

Heroku plugin `heroku-repo` をインストールしてクリアします

```bash
heroku plugins:install heroku-repo
heroku repo:purge_cache -a appname
```
