---
title: "Docker DesktopをやめてDockerを使う"
date: "2025-01-21"
updated: ""
---

Windows 11でDocker Desktopを使っていたら、ディスクがいっぱいになりました  
調べてみると

C:\Users\(username)\AppData\Local\Docker\wsl\data\ext4.vhdx 97.13GB  
が膨れていくみたいです  

C:\Users\(username)\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu_79rhkp1fndgsc\LocalState\ext4.vhdx 66.17GB  
は、使ってるWSLのUbuntuのディスクイメージっぽい
PowerShellで  

```powershell
wsl --list

docker-desktop-data
docker-desktop
```

の2つがあって、image pullするたびにどんどん肥大化してるっぽいです

以前は、Docker Desktop使わずにWSLに直接Dockerを入れて使っていたので、そちらに戻すことにしました

## Docker Desktopをアンインストール

Docker Desktopを終了します  
タスクマネージャーを見ると残っていたので、プロセスを終了しておきました

コントロールパネル > プログラムの追加と削除 からDocker Desktopをアンインストールします

## WSL2のUbuntuにDockerをインストール

[Ubuntu \| Docker Docs](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository)  
を見て、インストールします

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

これで準備ができました、Dockerなどをインストール

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

プラグインもいっきに入れてますね

## Dockerを使う

起動  

```bash
sudo service docker start
```

Hello Worldしてみます  
既に [Post\-installation steps \| Docker Docs](https://docs.docker.com/engine/install/linux-postinstall/) あたりをやっていたからか、sudoなしで動きました

```bash
$ docker run hello-world
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
c1ec31eb5944: Pull complete
Digest: sha256:1b7a37f2a0e26e55ba2916e0c53bfbe60d9bd43e390e31aacd25cb3581ed74e6
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.
```

動きました  
不要なイメージを消したりします  

```bash
docker container prune
docker image rm hello-world:latest
```

## まとめ

Docker Desktopライセンス問題も解消して、こっちのほうがよさそうです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4jmDXjO" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81QnV2OzIKL._SY385_.jpg" alt="Windowsコマンド環境のすべて" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Windowsコマンド環境のすべて</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
