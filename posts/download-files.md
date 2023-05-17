---
title: 'ファイルをダウンロードする'
date: '2023-05-17'
updated: ''
---

## A tag download

ファイルをダウンロードするには a tag に download 属性を付けると楽です
[<a>: The Anchor element \- HTML: HyperText Markup Language \| MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attributes)

```html
<a href="./sample.txt" download>download link</a>
```

ただし、注意書きにあるように

> download only works for same-origin URLs,

と同じオリジンしか動かないとなっていますが、Chrome 114.0.5735.26 だとダウンロードできます

## download by JavaScript

JavaScript でダウンロードしてみます

```html
<script>
  function download(path, filename) {
    // fetch parameterは要件にあわせる
    fetch(path, {
      method: 'GET',
      headers: { 'Content-Type': 'application/octet-stream' },
      mode: 'no-cors',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }
        return response.blob()
      })
      .then((response) => {
        const fileUrl = URL.createObjectURL(response)

        const link = document.createElement('a')
        link.href = fileUrl
        link.download = filename
        link.style.display = 'none'

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      })
  }
</script>

<button onClick="download();">download</button>
```

fetch に設定するパラメータは要件にあったものにします  
[fetch\(\) \- Web API \| MDN](https://developer.mozilla.org/ja/docs/Web/API/fetch)  
fetch mode について  
[Request: mode property - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Request/mode)  

指定する `Content-Type: 'application/octet-stream'` はダウンロードするファイルの種類が分からない時に設定するといいようです  
[MIME タイプ \(IANA メディアタイプ\) \- HTTP \| MDN](https://developer.mozilla.org/ja/docs/Web/HTTP/Basics_of_HTTP/MIME_Types)

fetch で画像をとってきて、問題なければファイルをダウンロードできるように a tag を組み立ててクリックして作った a tag を削除してます

fetch `mode: no-cors` で CORS が必要なリンク先を指定してしまうとレスポンスが空になって 0byte のファイルがダウンロードされるので注意です

```json
// Responseの例
{
  "body": null,
  "bodyUsed": false,
  "headers": {},
  "ok": false,
  "redirected": false,
  "status": 0,
  "statusText": "",
  "type": "opaque",
  "url": ""
}
```

`mode: cors` にしてアクセスできるようにするなどする必要があります

References:  
[Download Any Files in HTML and JavaScript: Ultimate Tutorial \| WM](https://www.webmound.com/download-file-using-javascript/#:~:text=You%20can%20use%20the%20download%20attribute%20on%20an,download%20the%20file%20instead%20of%20navigating%20to%20it.)
