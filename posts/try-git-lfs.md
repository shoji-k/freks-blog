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

```sh
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

jpgファイルがポインタで管理されるためレポジトリの容量が減るはずです  

PR

Gitが分からないときに
[入門git](https://amzn.to/49l11JW) <small>(このリンクは、アフィリエイトリンクです)</small> を読んで理解を深めました
