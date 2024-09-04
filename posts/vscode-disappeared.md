---
title: 'VSCodeが突然消えた'
date: '2024-04-09'
updated: ''
---

2日ぶりくらいに立ち上げたラップトップで、VSCodeが消えていました  
ショートカットが真っ白のアイコンになっていて、クリックしたら

`Code.exe が見つかりませんでした`  

ショートカットを右クリックしてexeの場所を見ると  
`C:\Users\user\AppData\Local\Programs\Microsoft VS Code`  
`Code.exe` が消えてました

[VS Code was lost on shutdown with pending update · Issue \#52855 · microsoft/vscode · GitHub](https://github.com/microsoft/vscode/issues/52855)  
を見ると、アップデート中にシャットダウンされると消えることがあるようです  

直すにはVSCodeを再インストールが手っ取り早そう  

公式サイトからダウンロードしてインストールしました  
<https://code.visualstudio.com/>

そうすれば元通り  
開いてた状態に戻るし、拡張機能も設定も残っていました  

突然消えるとびっくりしますね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Zi5mvE" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81+8Yg3nKjL._SY466_.jpg" alt="Visual Studio Codeパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Visual Studio Codeパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
