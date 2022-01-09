---
title: 'GitHubレポジトリの特定のディレクトリだけチェックアウトする'
date: '2022-01-09'
---

GitHub repository の必要なディレクトリだけチェックアウトしてみました

[git\-sparse\-checkout](https://git-scm.com/docs/git-sparse-checkout) を使います

https://github.com/firebase/functions-samples の quickstarts/uppercase/ だけとってきてみます

リポジトリ初期化して、remote repository をセットします

```bash
git init
git remote add origin git@github.com:firebase/functions-samples.git
```

sparse-checkout 初期化

```bash
 git sparse-checkout init
```

必要なディレクトリをセット

```bash
 git sparse-checkout set quickstarts/uppercase
```

sparse-checkout にセットされたディレクトリを確認

```bash
 git sparse-checkout list
```

あとは git pull

```bash
git pull origin main

remote: Enumerating objects: 19841, done.
remote: Counting objects: 100% (4505/4505), done.
remote: Compressing objects: 100% (1205/1205), done.
remote: Total 19841 (delta 3616), reused 4049 (delta 3264), pack-reused 15336
Receiving objects: 100% (19841/19841), 5.45 MiB | 1.57 MiB/s, done.
Resolving deltas: 100% (14505/14505), done.
From github.com:firebase/functions-samples
 * branch              main       -> FETCH_HEAD
 * [new branch]        main       -> origin/main
```

これで欲しいディレクトリだけとってこれました

```bash
$ tree
.
 └── quickstarts
     └── uppercase
         ├── README.md
         ├── database.rules.json
         ├── firebase.json
         └── functions
             ├── index.js
             ├── package.json
             └── test
                 ├── test.offline.js
                 └── test.online.js

 4 directories, 7 files
```
