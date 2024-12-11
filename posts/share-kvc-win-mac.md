---
title: 'WindowsとMacでキーボードとマウスを共有する'
date: '2024-12-11'
updated: ""
---

Macを買ったので、WindowsとMacを並べて使うことになり、キーボードとマウスを共有したかったのでやってみました

[input\-leap/input\-leap: Open\-source KVM software](https://github.com/input-leap/input-leap)  
を使いました

Barrierというのがありましたが、そのfolk版のようで、メンテナがInput-leafに移動してきたらしいです  
詳しくは [Active Barrier maintainers have moved here · Issue \#1414 · input\-leap/input\-leap · GitHub](https://github.com/input-leap/input-leap/issues/1414)  

## サーバー設定

Macにキーボードとマウスを接続しているので、サーバーとして設定します

[Release v3\.0\.2 · input\-leap/input\-leap · GitHub](https://github.com/input-leap/input-leap/releases/tag/v3.0.2)  
からmacosのdmgをダウンロードして実行  
appファイルがてくるので、アプリケーションフォルダに入れて起動  

Serverを選択  
Configure Serverをクリック、右上のコンピュータアイコンをドラッグしてMacの横に配置  
名前をWindowsPC名にしておきます  

![input leaf server](/share-kvc-win-mac/input-leaf-server.png)

これで設定を閉じて開始

## クライアント設定

WindowsPCをクライアントに設定します

[Release v3\.0\.2 · input\-leap/input\-leap · GitHub](https://github.com/input-leap/input-leap/releases/tag/v3.0.2)  
からWindows用のEXEをダウンロードして実行  
指示に従いながらインストールして起動  

Clientを選択  
Server IPにMacのIPアドレスを入力  

開始します  

## 動作確認

キーボードとマウスが共有されればOKです  
うまく動かなかったら、サーバーのほうでログが見れるので見ると解決の糸口になります  

## まとめ

OSが違ってもキーボードとマウスを共有できるのはすごいですね  
キーボードのキーが違う問題があるのでまた考えていきたいです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
