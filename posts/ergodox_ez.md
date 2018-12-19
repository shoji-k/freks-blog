---
title: "Ergodox EZ keyboard"
date: "2018-12-19"
---

[ErgoDox EZ: An Incredible Mechanical Ergonomic Keyboard](https://ergodox-ez.com/)
を買っていたのでメモです  
2018-5-28に買ってました

## 買った理由

- 仕事がつまってて長時間キーボード売っていると肩、首、腰にダメージが蓄積されつらかったので、セパレートキーボードにすれば解消するかも
- はんだ付けをしなくていいセパレートキーボードの選択肢があまりなかった
- 親指あたりのキーが多くて良さそう
- キー配置も変えられるので最適化できる

## qmk

キーボードを動かすソフトウェアでキーマッピングを設定します  
ErogDox EZに書き込んで使います  

自分用メモですが

```
git clone git@github.com:shoji-k/qmk_firmware.git  
cd qmk_firmware
git branch mine
make ergodox_ez:myergodox
# output: .build/ergodox_ez_myergodox.hex
```

キーマッピングは  
$ vim keyboards/ergodox\_ez/keymaps/myergodox/keymap.c  


コンパイルは  
$ make keyboard name:keymap  
と keyboard name に keymap のディレクトリ名  


## teesy loader app

teesyというアプリでErogDox EZへ書き込みます  

[Teensy Loader Application \- available for Windows, Linux and Macintosh systems](https://www.pjrc.com/teensy/loader.html)

## しばらく使ってみて

よいです  
ただ、重いし大きいので持ち運べません  
自宅で常用しています  

## まとめ

今では自作キーボードへ足を踏み入れてしまいました  
