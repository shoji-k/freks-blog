---
title: 'Dell PCでWindows Update ver.1903対応後のDLLエラー'
date: '2019-08-24'
---

Dell XPS 15 9570 で Windows Update ver.1903 を入れたあとにエラーが出るようになりました  
Google Chrome を使ってると出たりしました

![dll_error](/dell-dll-error-intel-optane/dll_error.png)

## 原因のプログラムを削除

インテル ラピッド・ストレージ・テクノロジー
ってのが原因っぽいので、削除します

コントロールパネル、プログラムの追加と削除を開いて、該当のプログラムを削除します

![program_intel_rapid_storage](/dell-dll-error-intel-optane/program_intel_rapid_storage.png)

## プログラムを入れ直す

インテル ラピッド・ストレージ・テクノロジーのプログラムを Dell のサイトからダウンロードします

https://downloadcenter.intel.com/ja/product/55005

インテル ® ラピッド・ストレージ・テクノロジー (インテル ® RST) ユーザー・インターフェイスとドライバー をクリック

https://downloadcenter.intel.com/ja/download/29007/-RST-?product=55005
が開かれるので、SetupRST.exe をダウンロード

実行します
全部、次へを選びました

再起動が求められたら再起動しました

これでエラーがでなくなりました


