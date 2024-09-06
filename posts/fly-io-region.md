---
title: 'Fly.ioでのリージョン違いのエラー'
date: '2024-09-07'
updated: ""
---

[Remix \- Build Better Websites](https://remix.run/) を使ってみています  

[remix\-run/indie\-stack: The Remix Stack for deploying to Fly with SQLite, authentication, testing, linting, formatting, etc\.](https://github.com/remix-run/indie-stack) が[Fly.io](https://fly.io/)にデプロイできるドキュメントがついていたのでやってみました

事前準備としてGitHubレポジトリを用意しておきます

```bash
npx create-remix@latest --template remix-run/indie-stack
```

できたソースコードを好きに改造してGitHubにプッシュしておきます

[Deployment](https://github.com/remix-run/indie-stack?tab=readme-ov-file#deployment) の手順に従います  

[Fly.io](https://fly.io/) のアカウントを作ります  
[flyctl](https://fly.io/docs/getting-started/installing-flyctl/) をインストールします  

Linuxでやっていたので

```bash
curl -L https://fly.io/install.sh | sh
```

Fly.io にログインします

```bash
fly auth signup
```

ドキュメントだと2つデプロイ先を作りますが、とりあえず1つにします

```bash
fly apps create productname
```

GitHubレポジトリのsecretsにFLY_API_TOKENを保存します  
FLY_API_TOKENは[Fly.io](https://fly.io/)の管理画面で取得できます  

SESSION_SECRETをセット

```bash
fly secrets set SESSION_SECRET=$(openssl rand -hex 32) --app productname
```

データ保存用のボリュームを作成

```bash
fly volumes create data --size 1 --app productname
```

ここでRegionが選べたので日本の `nrt` にしました  

あとは `git push` すればデプロイが走りますが、エラーになりました  

```txt
✖ Failed: error creating a new machine: failed to launch VM: Mounts source volume "vol_r1px70d0wz8gxxxx" is in the wrong region ("nrt" != "ord")
```

regionが違うらしい  

[primary\_region](https://fly.io/docs/reference/configuration/#primary-region) をみて  
`fly.toml` に `primary_region` を追加しました

```toml
primary_region = "nrt"
```

これをコミットしてデプロイしたら無事デプロイできました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
