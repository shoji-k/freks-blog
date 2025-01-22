---
title: "WSL2に新しいUbuntuをいれて使う"
date: "2025-01-22"
updated: ""
---

WSL 2で開発しています  
なんだかCPUがぶんまわったりするので、新しいUbuntuで環境を作り直してみます  

Ubuntu 22.04を使っていましたが、Ubuntu 24.02を新たにインストールして切り替えてみます  

## WSL2にUbuntu 24.02をインストール

PowerShellでインストールできるディストリビューションを確認

```powershell
$ wsl --list --online

NAME                            FRIENDLY NAME
Ubuntu                          Ubuntu
Debian                          Debian GNU/Linux
kali-linux                      Kali Linux Rolling
Ubuntu-18.04                    Ubuntu 18.04 LTS
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
Ubuntu-24.04                    Ubuntu 24.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_7                 Oracle Linux 8.7
OracleLinux_9_1                 Oracle Linux 9.1
openSUSE-Leap-15.6              openSUSE Leap 15.6
SUSE-Linux-Enterprise-15-SP5    SUSE Linux Enterprise 15 SP5
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
openSUSE-Tumbleweed             openSUSE Tumbleweed
```

Ubuntu 24.04をインストール

```powershell
wsl --install -d Ubuntu-24.04
```

これでインストールできました  

## Ubuntu 24.04の設定

ユーザー名とパスワードをうながされるので設定  
apt updateとupgradeをしておきます

```bash
sudo apt update
sudo apt upgrade
```

その他、開発に必要なものを入れていきます  

## VSCodeで使う

Ubuntu 24.04 で

```shell
code .
```

でそのカレントディレクトリでVSCodeが開け、Ubuntu 24.04上とつながっています

## WSL2のディストリビューションの切り替え

PowerShellで

```powershell
wsl --set-version Ubuntu-24.04 2
```

とすれば、WSL 2のデフォルトディストリビューションになります  

参考) [WSL のインストール \| Microsoft Learn](https://learn.microsoft.com/ja-jp/windows/wsl/install)

## バックアップ

ある程度、環境が整ったらバックアップ取っておくとよさそうです  
まだ試していませんが、

```powershell
wsl --export Ubuntu-24.04 (保存先.tar)
```

でバックアップできるようです

戻すときは

```powershell
wsl --import Ubuntu-24.04 (インストール先) (保存先.tar)
```

みたいです  

今回作ったUbuntuは
`C:\Users\(username)\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu24.04LTS_79rhkp1fndgsc` にありました  

## まとめ

さくっと新しいUbuntuが使えるのは便利ですね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4jmDXjO" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81QnV2OzIKL._SY385_.jpg" alt="Windowsコマンド環境のすべて" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Windowsコマンド環境のすべて</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
