---
title: 'EC-CUBE 4 Tips'
date: '2019-08-29'
---

## EC-CUBE 4 のバージョンを見る

\$ vim src/Eccube/Common/Constant.php

```
const VERSION = '4.0.2';
```

に記載あり

[EC\-CUBE 4\.0 開発ドキュメント・マニュアル \| EC\-CUBE 4\.0 開発ドキュメント](http://doc4.ec-cube.net/)

## Symfony version を見る

EC-CUBE 4.0.2 の場合

```
$ bin/console -V
Symfony 3.4.22 (kernel: Eccube, env: dev, debug: true)
```

[Symfony 3.4 Documentation](https://symfony.com/doc/3.4/)

## コンソールでコマンド一覧を表示

```
bin/console list
```
