---
title: '大きいファイルをGit LFSで管理する'
date: '2024-02-07'
updated: ''
---

GitHubには大きいファイルをあげようとするとエラーが出たり、ファイル容量、リポジトリ容量の制限があります

[GitHub での大きいファイルについて \- GitHub Docs](https://docs.github.com/ja/repositories/working-with-files/managing-large-files/about-large-files-on-github?platform=linux)

大きいファイルを扱える [Git Large File Storage (Git LFS)](https://git-lfs.com/) を使ってみます

バイナリファイルをファイルの差分で管理するのでなく、ポインタで管理するようです

[Installation · git\-lfs/git\-lfs Wiki](https://github.com/git-lfs/git-lfs/wiki/Installation)

をみて、Ubuntu 22.04 にインストールします

```bash
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
sudo apt-get update
sudo apt-get install git-lfs
git lfs install
```

これでインストールできました

レポジトリに管理するファイルを指定します

```bash
git lfs track "*.jpg"
git lfs track "*.png"
```

すると `.gitattributes` が更新されます  

jpgファイルがポインタで管理されるようになりレポジトリの容量が減ります

git pullとかするとjpgファイルが

```text
version https://git-lfs.github.com/spec/v1
oid sha256:e8a704403914966411ead4aac1157fe2caf1d11b3e9ccf11f74a7911ccf8e74111135
size 10521302
```

といったテキストファイルになります

元のファイルが欲しいときは

```bash
git lfs pull
```

でダウンロードできます

PR

Gitが分からないときに
[入門git](https://amzn.to/49l11JW) <small>(このリンクは、アフィリエイトリンクです)</small> を読んで理解を深めました
