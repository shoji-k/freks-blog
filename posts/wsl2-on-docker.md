---
title: 'WSL2上でDockerを使ってみる'
date: '2019-12-29'
---

WSL2の用意は [WSL2を使ってみる](https://blog.freks.jp/wsl2-tips) でやりました

## install Docker

Dockerのインストールは公式ドキュメントで入りました

```sh
$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common
$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
$ sudo apt-get update
$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

といったコマンドで入れました
Docker起動して  

```
$ sudo service docker start
```

試しに

```
$ sudo docker run hello-world
```

で動きました

sudoなくて動かせるように

```
$ sudo usermod -aG docker $USER
```

をしました

## install docker-compose

公式ドキュメントを見ていれました  
[Install Docker Compose \| Docker Documentation](https://docs.docker.com/compose/install/)

```sh
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
$ sudo chmod +x /usr/local/bin/docker-compose
```

でいけました

## Trouble shooting

ひとつはまったのがDockerで [postgres \- Docker Hub](https://hub.docker.com/_/postgres) を使おうとしたら起動に失敗する..

起動すると  

```
initdb: could not change permissions of directory on Postgresql container
```

というエラーがでて立ち上がりません..

Windows10とWSL2でファイルを共有できるように　`/mnt/c/` 以下のディレクトリでDocker起動していたのですが

[docker \- initdb: could not change permissions of directory on Postgresql container \- Stack Overflow](https://stackoverflow.com/questions/44878062/initdb-could-not-change-permissions-of-directory-on-postgresql-container)

をみて、`/mnt/c/ ...` から `/home/user/` 以下に移動してやると動きました

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=freks-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07BHK5KX7&linkId=8f881cf5fd92011110f8ddb6fc13d5f4"></iframe>