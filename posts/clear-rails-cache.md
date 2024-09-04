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

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4geoctG" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81yskupyNhL._SY466_.jpg" alt="パーフェクト Ruby on Rails" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">パーフェクト Ruby on Rails</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
