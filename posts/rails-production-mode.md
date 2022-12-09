---
title: 'Railsをproduction modeで動かしてみる'
date: '2022-12-09'
updated: ''
---

Rails 7.0.4 を手元の環境で production mode で動かしてみました

localhost で動かすので https は不要なので設定を変えます

```
# config/environments/production.rb
config.force_ssl = false
```

立ち上げてみます

```bash
RAILS_ENV=production RAILS_SERVE_STATIC_FILES="true" bin/rails s
```

静的なアセットを Nginx とか使わずに Rails で配信する場合は、`RAILS_SERVE_STATIC_FILES` をセットします

立ち上げ時に

```bash
/usr/local/bundle/gems/railties-7.0.4/lib/rails/application.rb:581:in `validate_secret_key_base': Missing `secret_key_base` for 'production' environment, set this string with `bin/rails credentials:edit` (ArgumentError)
```

が出たら

```bash
$ EDITOR=vim bin/rails credentials:edit
Adding config/master.key to store the encryption key: 5db9fe0a33b965f7de13ae6f108fce53

Save this in a password manager your team can access.

If you lose the key, no one, including you, can access anything encrypted with it.

      create  config/master.key

Couldn't decrypt config/credentials.yml.enc. Perhaps you passed the wrong key?
```

をすると `master.key` がないときに作られます、あると編集しようとします  
なくすと暗号化したデータを参照できなくなるので注意です  
開けなかったら `config/credentials.yml.enc` をいったん削除してやり直すしかないです  
`EDITOR` には好きなエディタを設定します

データベースへの接続ができなかったりしたら

`config/database.yml` の production の設定を確認するといいです  
初期データがいるなら  
`bin/rails db:seed` などで production 用のデータを入れるといいです

これで Rails サーバー立ち上げて動作確認できます
