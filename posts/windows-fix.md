---
title: "Windowsの調子が悪いときにすること"
date: "2025-01-19"
updated: ""
---


## Windowsの修復

[システム ファイル チェッカー ツールを使用して不足または破損しているシステム ファイルを修復する \- Microsoft サポート](https://support.microsoft.com/ja-jp/topic/%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0-%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB-%E3%83%81%E3%82%A7%E3%83%83%E3%82%AB%E3%83%BC-%E3%83%84%E3%83%BC%E3%83%AB%E3%82%92%E4%BD%BF%E7%94%A8%E3%81%97%E3%81%A6%E4%B8%8D%E8%B6%B3%E3%81%BE%E3%81%9F%E3%81%AF%E7%A0%B4%E6%90%8D%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E3%82%B7%E3%82%B9%E3%83%86%E3%83%A0-%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%82%92%E4%BF%AE%E5%BE%A9%E3%81%99%E3%82%8B-79aa86cb-ca52-166a-92a3-966e85d4094e) の通りにやります  

管理者権限でコマンドプロンプトを開いて以下のコマンドを実行します  

```cmd
Dism.exe /Online /Cleanup-image /Restorehealth
sfc /scannow
```

と実行しました  

![windows fix result](/static/windows-fix/cmd-result.webp)

## まとめ

いまのところ快適になりました  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4jmDXjO" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81QnV2OzIKL._SY385_.jpg" alt="Windowsコマンド環境のすべて" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Windowsコマンド環境のすべて</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
