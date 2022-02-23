---
title: 'rsync tips'
date: '2020-07-31'
updated: ""
---

rsyncの使うときに毎回調べてるのでまとめる

```
$ rsync -C --filter=":- .gitignore" --exclude=“/src/app/cache” --exclude=“.git” --exclude=“.gitignore” -rltuvz sample:/var/www/html ./
```

オプションの説明

```
-C –-filter=":- .gitignore" -> gitignoreのファイルを無視する
-r recursive
-l copy symlinks
-t preserve modification time
-u skip file that are newer
-v verbose
-z compress

-n dry run
--delete 手元で消したファイルを向こう側でも消す
```