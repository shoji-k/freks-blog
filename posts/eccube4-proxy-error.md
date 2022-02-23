---
title: 'EC-CUBE4でModelのTraitファイルを削除した時のエラー対処'
date: '2019-09-27'
updated: ""
---

EC-CUBE 4 で [Entity のカスタマイズ \| EC\-CUBE 4\.0 開発ドキュメント](http://doc4.ec-cube.net/customize_entity) をみて Order クラスを拡張してたんですが、仕様変更で拡張を削除することになりました

拡張のために作ったトレイトを削除

```
$ rm app/Customize/Entity/OrderTrait.php
```

proxy 再作成かなと思って

```
$ bin/console eccube:generate:proxies
```

したんですが、OrderTrait.php がないとかでエラー

proxy を全部、手で削除してみました

```
$ rm -rf app/proxy/entity/src
```

proxy 生成

```
$ bin/console eccube:generate:proxies
```

でも、以下のエラー

```
In DebugClassLoader.php line 156:

  Compile Error: Symfony\Component\Debug\DebugClassLoader::loadClass(): Failed opening required '/var/www/html/vendor/composer/../../app/proxy/entity/src/Eccube/Entity/Order.php' (include_path='.:/usr/local/lib/php')

```

Symfony 3.4 のドキュメントみても、Doctine のドキュメント見ても見つからず..

composer 側だったり..と

```
$ composer clear-cache
$ composer dump-autoload
```

するとエラーでなくなりました、無事復帰できました
