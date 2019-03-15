---
title: "巨大になったテキストファイルを分割する"
date: "2019-03-16"
---

ログローテートしなくなって巨大になったファイルがあったので、分割してみました  
そのまま vim とかで開くとメモリを大量に消費したり、最悪はフリーズしたりするのが怖かったので..  

Ubuntu 16.04 上でやりました  

まずは今回戦ったファイルを見てみます  

```
$ ls -alh production.log
-rw-r--r-- 1 user user 1.4G  2月 27 10:07 production.log
```

と 1.4G もあります

```
$ wc -l production.log
8035602 production.log
```

と803万行あります

分割します

```
$ split -100000 production.log log-
```

と10万行ずつ分割、log-から始まるファイルにしました

```
$ ls
log-aa  log-ad  log-ag  log-aj  log-am  log-ap  log-as  log-av  log-ay  log-bb  log-be  log-bh  log-bk  log-bn  log-bq  log-bt  log-bw  log-bz  log-cc  log-cf  log-ci  log-cl  log-co  log-cr  log-cu  log-cx  log-da  production.log
log-ab  log-ae  log-ah  log-ak  log-an  log-aq  log-at  log-aw  log-az  log-bc  log-bf  log-bi  log-bl  log-bo  log-br  log-bu  log-bx  log-ca  log-cd  log-cg  log-cj  log-cm  log-cp  log-cs  log-cv  log-cy  log-db
log-ac  log-af  log-ai  log-al  log-ao  log-ar  log-au  log-ax  log-ba  log-bd  log-bg  log-bj  log-bm  log-bp  log-bs  log-bv  log-by  log-cb  log-ce  log-ch  log-ck  log-cn  log-cq  log-ct  log-cw  log-cz  log-dc
```

と、こんな感じになりました

もとのファイルは、

```
$ cp /dev/null > production.log
```

と0バイトにしておきました

