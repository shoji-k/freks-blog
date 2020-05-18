---
title: 'cronで定期実行する'
date: '2020-05-18'
---

定期処理をするのに今だと色々やりかたありますが、cronが一番手軽でたまに使うのでまとめてみました  

## コマンド

ログインしているユーザーでcronの設定を見る

```
crontab -l
```

cronの設定をする

```
crontab -e
```

ここで注意なのが `crontab -r` をすると設定が消えてしまい復元できないで気をつけましょう    
間違えたことはないですが、`e`と`r`がキーボードで隣にあるので、危険  
必ず `crontab -l` したあとにやれば、一度表示されてるので消しても手で戻せて安心です  

## crontabの書式

```
# 分 時 日 月 曜日 の順
30 5 * * * /bin/bash sample.sh
```

上の例だと、毎日 AM 5:30 に sample.sh を bash が実行

## ruby script実行

`ruby sample.rb` を定期実行したい場合、そのままcrontabにかくと `ruby not found` と言われることがあります  
ログインした状態で動かないからなので、ログインしたシェルで動くように

```
# 分 時 日 月 曜日 の順
30 5 * * * /bin/bash -lc "ruby sample.rb"
```

で動く場合もありますが、rbenvで入れたものだと動かなかったので

`which ruby` して出てきたパス `/home/user/.rbenv/shims/ruby` を指定してみて

```
30 5 * * * /bin/bash -lc "/home/user/.rbenv/shims/ruby sample.rb"
```

とやると動作しました

## ログを保存する

定期実行させたスクリプトで吐くログとエラーを保存する場合

```
30 5 * * * /bin/bash -lc "/home/user/.rbenv/shims/ruby sample.rb" >> log 2>&1
```

とすると`log`ファイルが作成され、追記されていきます
