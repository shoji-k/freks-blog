---
title: 'Herokuのstackをアップグレードする'
date: '2024-08-22'
updated: ''
---

Herokuにデプロイすると

```bash
remote: This app is using the Heroku-22 stack, however a newer stack is available.
remote: To upgrade to Heroku-24, see:
remote: https://devcenter.heroku.com/articles/upgrading-to-the-latest-stack
```

とでるのでアップグレードしてみました

Heroku cliは

```bash
$ heroku -v
heroku/9.1.0 wsl-x64 node-v16.20.2
```

公式ドキュメントを読みながら進めていきます  
[Upgrading to the Latest Stack \| Heroku Dev Center](https://devcenter.heroku.com/articles/upgrading-to-the-latest-stack)

```bash
heroku stack:set heroku-24 --remote heroku-production
```

`--remote heroku-production` は複数のリモートがある場合に指定が必要で、heroku-production はリモート名で自分が決めたものです

あとは、一度デプロイが必要なので空のコミットを積んでデプロイしました

```bash
git commit --allow-empty -m "Upgrade stack"
git push heroku-production main
```

デプロイが終わったら、Herokuのダッシュボードで確認すると、stackが `heroku-24` になっていました

## まとめ

トラブルなく終わるといいですね
