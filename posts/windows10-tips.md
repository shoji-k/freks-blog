---
title: 'Windows10 Tips'
date: '2021-02-20'
---

## 壊れたファイルを直す

コマンドプロンプトを管理者として実行、で起動します  
タスクバーの検索ウィンドウで、cmd を入力、管理者として実行を選ぶのが早いと思います

```bash
sfc /scannow
```

をすると、壊れたファイルを直してくれるようです

![sfc scannow result](/windows10-tips/sfc_scannow_result.webp)

この結果だと、全部直してくれたようです  
これで直らなかったとき

```bash
DISM /Online /Cleanup-Image /CheckHealth
```

をするといいそうです  
壊れたファイルがなくなって、もっと詳しくチェックしたかったら

```bash
Dism /Online /Cleanup-Image /ScanHealth
```

これで壊れたファイルが見つかったら

```bash
Dism /Online /Cleanup-Image /RestoreHealth
```

するといいようです

## バックグラウンドで動くアプリを減らす

スタートメニュー > 設定(ネジアイコン) > プライバシー  
左のメニュー内のバックグラウンド アプリを選択

バックグラウンドで動く必要のなさそうなアプリをオフにしていきます

## 不要なサービスを止める

タスクバーの検索ウィンドウで `msconfig` と入力  
システム構成が出てくると思うので選択  
サービスタブで、不要なサービスのチェックを外します

## 起動時に立ち上がるアプリを減らす

タスクバーを右クリック > タスクマネージャー  
スタートアップタブで、不要なアプリを右クリック > 無効化を選びます

参考) https://www.makeuseof.com/windows-10-slow-after-update-fix/
