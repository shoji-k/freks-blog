---
title: 'Google Apps Script へPOSTしたかった'
date: '2019-04-18'
updated: ""
---

API を叩いて、Google Spreadsheet に記録を取るアプリを作りたかったときにはまった話

まず、GAS(Google Apps Script)を書きます

```
function doPost(e) {
  const jsonString = e.postData.getDataAsString();
  const data = JSON.parse(jsonString);

  const event = data.event;

  insert(event) // Spreadsheetに書き込む関数を別途用意
}
```

といったコードを用意  
doPost で関数を作り、Publish > Deploy as Web App とすると
https://script.google.com/macros/s/xxxxxxx/exec なエンドポイントが作成され POST でアクセスできるようになります
その際、アクセス制限を掛けられるのですが、全公開としました

そして curl コマンドで試してみると

```
curl -X POST -H "Accept: application/json" -H "Content-type: application/json" -d '{"event": "test"}' https://script.google.com/macros/s/xxxxxxx/exec
```

うまく書き込まれました  
次は Web アプリから投稿してみようと

```
const submit = e => {
  e.preventDefault()
  const event = document.getElementById('event').value || null

  const data = { event: event }

  fetch(URL, {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => console.log(res))
    .catch(err => console.error(err))
}
```

といったコードを実行してみましたが、パラメータ変えたりしても 405 エラー  
CORS(クロスオリジン)は、GAS では POST に対して、許可されてるらしいですが、preflight で送られる OPTIONS は許可されてないらしい...  
preflight で OPTIONS を送らなくしたりしましたが、うまくいかず、GET で投稿するようにしてみました

```
const submitByGet = e => {
  e.preventDefault()
  const event = document.getElementById('event').value || ''

  const urlWithParams =
    URL +
    '?event=' +
    event

  fetch(urlWithParams, {
    method: 'GET',
    mode: 'no-cors',
  })
    .then(res => console.log(res))
    .catch(err => console.error(err))
}
```

これを試すと、Spreadsheet に無事書き込まれました  
まだ、

```
VM9752:1 Cross-Origin Read Blocking (CORB) blocked cross-origin response https://script.google.com/macros/s/xxxxxxx/exec?event=&health=&pain=&poo=2&kanpo=1 with MIME type text/html. See https://www.chromestatus.com/feature/5629709824032768 for more details.
```

の警告がでますが、さくっと直せませんでした

他にも POST + JSONP で送る方法もあるようです
