---
title: 'Googleスプレッドシートで「指定範囲をクリアするボタン」を作る'
date: '2026-01-05'
updated: ''
---

毎月、家計簿をGoogle Spread Sheetで作ってますが、シートコピー、入力箇所をクリアしてます

Apps Script を使ってボタンをクリックで決まった範囲だけをクリアできるようにしてみました  

## やりたいこと

- 図形ボタンをクリック
- 確認メッセージを表示
- OK の場合だけ、指定した複数範囲をクリア
- 今開いているシートを対象にする

## スクリプト

拡張機能 > Apps Script から、以下のコードを保存

```js
function clearRange() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.alert(
    "確認",
    "本当にクリアしますか？",
    ui.ButtonSet.YES_NO
  );

  if (result === ui.Button.YES) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet();
    sheet.getRange("B9:B10").clearContent();
    sheet.getRange("F7:I41").clearContent();
    sheet.getRange("N7:P41").clearContent();
    sheet.getRange("U7:W41").clearContent();
    sheet.getRange("AB7:AD41").clearContent();
    sheet.getRange("AI7:AL41").clearContent();
  }
}
```

実行すると動作確認できます  
開いているシートに行って、確認ダイアログが出ているはずです  

## ボタンの作り方

スプレッドシートで挿入 → 図形描画  
四角などを描いて「クリア」などの文字を入れる  
図形を右クリック、スクリプトを割り当て  
スクリプトで作った関数名「clearRange」を入力

これで、ボタンをクリックすると処理が実行されます

## まとめ

ちょっと楽になりました  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4dRjWik" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/51Ave84HXfS._SX342_SY445_.jpg" alt="詳解！ Google Apps Script完全入門" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">詳解！ Google Apps Script完全入門</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
