---
title: 'EC-CUBE4の開発環境を用意'
date: '2019-02-12'
---

EC-CUBE4 が出てから使ったことなかったので開発環境を作ってみました

Docker で php を立ち上げて環境を用意しました  
Apache + php とかの環境と同じです

本当は EC-CUBE4 の推奨のデータベースの PostgreSQL を使うきだったのですが、 WEB インストール画面の選択肢に出てこなかったので、SQLite にしてます

## ソースコード取得

公式サイトから zip ダウンロードではなく、GitHub から取ってきて最新に追いつきやすくしました  
Relese タブから、最新の Tag をみてとりました  
4.0.1 が最新だったので

```
$ git clone -b 4.0.1 git@github.com:EC-CUBE/ec-cube.git
$ git ch -b 4.0.1
```

これで手元に用意できました

## composer install

composer installします

```
$ composer install
```

Docker使うときは

```
$ docker run --rm -v $(pwd):/app -it composer install --ignore-platform-reqs
```

## 画面にアクセスしてインストール

Web インストールしてみました  
が、画面にアクセスすると大量のエラーが  
コード読むと、.env があるとすでにインストール済みとなるようで削除

```
$ rm .env
```

これで再度アクセス  
進めていって権限直したりして

```
$ chown -R www-data:www-data vendor
```

いろいろ入力、データベースは SQLite にして、立ち上がりました
