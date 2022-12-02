---
title: 'Webサイトでファイルをダウンロードする'
date: '2022-12-01'
updated: ''
---

Web サイトで CSV ファイルをダウンロードする方法調べました

[downloads\.download\(\) \- Mozilla \| MDN](https://developer.mozilla.org/ja/docs/Mozilla/Add-ons/WebExtensions/API/downloads/download)
を使うとよさそうですが  
2022-12-01 時点で、Safari が対応してないので使うの厳しいです

a タグを使って

```html
<a download="test.csv">sample</a>
```

をクリックすると `test.csv` がダウンロードされる方法を取るのがよさそうです

サンプルのコードを書いてみると

```html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="utf-8" />
    <title>Download CSV</title>
  </head>
  <body>
    <script type="text/javascript">
      function download() {
        // csvをbom付きにしておくとExcelで開いて文字化けしない
        // https://qiita.com/megadreams14/items/b4521308d5be65f0c544
        const bom = new Uint8Array([0xef, 0xbb, 0xbf])
        const content = 'id,名前\n1,テスト'
        const blob = new Blob([bom, content], { type: 'text/csv' })

        const url = window.URL.createObjectURL(blob)
        // aタグを作ってダウンロードしたあとに削除
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = 'サンプル.csv'
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        a.remove()
      }
    </script>
    <button onClick="download();">CSVダウンロード</button>
  </body>
</html>
```

と、見えない a タグを作ってダウンロード後に削除してやるとよさそうです
