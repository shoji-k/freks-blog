---
title: 'Linuxのメモリが足りないのでスワップ領域を増やす'
date: '2021-01-05'
---

スワップ領域は、今あるものを増やすのでなく、新しいスワップ領域を作って入れ替えてみました  
試した OS は

```
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 16.04.7 LTS
Release:        16.04
Codename:       xenial
```

現状のメモリを確認してみます

```
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           991M        703M         71M        640K        216M        115M
Swap:          1.0G        622M        398M
```

実メモリ 1GB で、スワップが 1GB みたいです

```
$ sudo fallocate -l 2G /swapfile
```

これで swap のための領域を確保します  
faillocate がない場合は `dd` でやるといいみたいです

スワップ設定します

```
$ sudo mkswap /swapfile
Setting up swapspace version 1, size = 2 GiB (2147479552 bytes)
no label, UUID=1e362480-9381-4c92-ad59-7ea6677498e1
```

パーミッションを直します

```
$ sudo chmod 600 /swapfile
```

このまま swap 領域を設定しようとするとエラーになりました

```
$ sudo swapon /swapfile
swapon: /swapfile: swapon failed: Device or resource busy
```

すでに swap 領域設定済みだからみたいです
確認

```
$ swapon -s
Filename                                Type            Size    Used    Priority
/dev/vda5                               partition       1045500 657100  -1
/swapfile                               file            2097148 0       -2
```

スワップ領域外してみます

```
$ sudo swapoff -a
swapoff: /dev/vda5: swapoff failed: Cannot allocate memory

$ swapon -s
Filename                                Type            Size    Used    Priority
/dev/vda5                               partition       1045500 657100  -1
```

作った `/swapfile` はなくなりましたが、スワップないとアプリなどで使用中のメモリが足りないのでエラーになってます  
いったんアプリを止めたりして、メモリを確保して

```
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           991M        130M        632M        728K        228M        690M
Swap:          1.0G        204M        816M
```

再実行

```
$ sudo swapoff -a
$ swapon -s
# なにもでない
```

で動きました

```
$ free -h
              total        used        free      shared  buff/cache   available
Mem:           991M        321M        323M         11M        346M        488M
Swap:          2.0G          0B        2.0G

$ sudo swapon --show
NAME      TYPE SIZE USED PRIO
/swapfile file   2G   0B   -1
```

念の為、再起動してきちんとスワップ領域できてるか確認しました  
うまく行ってたので、完了です
