---
title: 'Google Apps Script(GAS)でメールの添付ファイルを保存する'
date: '2024-05-02'
updated: ''
---

毎月届くGoogle Workspaceのレシートがメールで送られてくるのですが、自動保存したくてGoogle Apps Script (GAS) を使ってみました  

Google Driveから、GASのファイルを作ります  

![Google Drive](/gas-save-attachment/google-drive.webp)  

コードを書いていきます  

```javascript
function saveGoogleWorkspaceReceipt() {
  var searchQuery = 'from:payments-noreply@google.com subject:Google Workspace: is:unread';  // unreadで未開封のもの
  var threads = GmailApp.search(searchQuery);
  var folderId = '<folder id>'; // https://drive.google.com/drive/folders/<folder id>
  var folder = DriveApp.getFolderById(folderId);

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  if (month == 0) {
    month = 12;
    year--;
  }
  var filename = year.toString() + ('0' + month).slice(-2) + '.pdf'; // 先月の年月.pdf

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();

    for (var j = 0; j < messages.length; j++) {
      var attachments = messages[j].getAttachments();

      for (var k = 0; k < attachments.length; k++) {
        var blob = attachments[k].copyBlob();
        blob.setName(filename);
        var file = folder.createFile(blob);
        Logger.log('Created File: ' + file.getUrl());
      }
    }
  }
}
```

`folderId` は、ブラウザでGoogle Drive開いて、保存したいディレクトリを開いた時のURLの `https://drive.google.com/drive/folders/<folder id>` の `<folder id>` の部分です

流れは  

- メールアドレス `payments-noreply@google.com` から来た、タイトルが `Google Workspace:` で未読のメールを探す
- 毎月、先月の領収書が届くので、ファイル名を先月.pdfにする e.g. `202404.pdf`
- 指定したフォルダに保存する

あとは、GASのファイルの上部にある実行ボタンを押すと実行されます  
正しく動くか手動で検証しましょう  

手動で添付ファイルを保存して、ファイル名を変えて、指定のディレクトリに保存する、がボタン一つになりました  

## まとめ

毎月発生する作業なので、メールが届いたら、とか、毎月n日に実行するとか、もうちょっと楽にしたいですね  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4dRjWik" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/51Ave84HXfS._SX342_SY445_.jpg" alt="詳解！ Google Apps Script完全入門" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">詳解！ Google Apps Script完全入門</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
