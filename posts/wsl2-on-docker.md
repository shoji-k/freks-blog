---
title: 'WSL2上でDockerを使ってみる'
date: '2019-12-29'
updated: ""
---

WSL2の用意は [WSL2を使ってみる](/wsl2-tips/) でやりました

## install Docker

Dockerのインストールは公式ドキュメントで入りました

```bash
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

```bash
sudo service docker start
```

試しに

```bash
sudo docker run hello-world
```

で動きました

sudoなくて動かせるように

```bash
sudo usermod -aG docker $USER
```

をしました

## install docker-compose

公式ドキュメントを見ていれました  
[Install Docker Compose \| Docker Documentation](https://docs.docker.com/compose/install/)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
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
