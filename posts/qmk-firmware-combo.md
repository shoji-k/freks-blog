---
title: 'qmk_firmwareで同時押しカスタマイズしてみた'
date: '2019-12-20'
updated: ""
---

自作キーボード

- [Helix keyboard \| freks blog](/helix/)
- [Ergodox EZ keyboard \| freks blog](/ergodox_ez/)

では、キーボードを動作させるのに [qmk/qmk_firmware: Open\-source keyboard firmware for Atmel AVR and Arm USB families](https://github.com/qmk/qmk_firmware) を使います

今までキー同時押しのカスタマイズを OS 側でやってたのですが、qmk_firmware で Combos という機能出来るのを知ったのでやってみました  
[qmk_firmware/feature_combo\.md at master · qmk/qmk_firmware](https://github.com/qmk/qmk_firmware/blob/master/docs/feature_combo.md)

qmk_firmware で 左 Ctrl + Enter が Esc になるようにしたくてやってみました

コードの差分はこちら、helix で試してみました  
[add combo settings · shoji\-k/qmk_firmware@58168b3](https://github.com/shoji-k/qmk_firmware/commit/58168b37309d957f60ad506dc37aecca01d62d41)

やってみたんですが、Ctrl + Enter の反応が悪くて使えていません..
サンプルでかいてみた A + B だとすんなり反応するんですが..

改善できるまで OS 側で、同時押しカスタマイズ使うことにしました

追記）
Ergodox EZ でやってみました  
[set ctrl\+enter=esc combos to ergodox_ez · shoji\-k/qmk_firmware@45d145a](https://github.com/shoji-k/qmk_firmware/commit/45d145af8898cf6c2cb67fb3dffd1aa75c170e14)

こっちはうまく動いています！


