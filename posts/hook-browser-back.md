---
title: 'ブラウザバック時に動くJavaScript'
date: '2023-10-26'
updated: ''
---

ブラウザバックしたときにある処理をしたかったので試してみました

index.htmlに以下のコードを書いて、適当なリンクを用意、違うページに行ってからブラウザの戻るで戻ってきたときに発動すれば成功です

index.html表示 -> index.html内の適当なリンクで別ページに移動 -> ブラウザの戻るでindex.htmlに戻る -> alertが表示されれば成功！

試したのは Microsoft Edge　バージョン 118.0.2088.61 (公式ビルド) (64 ビット) です

### popstateイベント

[Window: popstate イベント - Web API | MDN](https://developer.mozilla.org/ja/docs/Web/API/Window/popstate_event)

```js
window.addEventListener("popstate", (e) => {
  alert("back");
});
window.onpopstate = (event) => {
  alert("back");
};
```

動かず

### PageTransitionEvent.persisted

[ブラウザバック感知の備忘録 #JavaScript - Qiita](https://qiita.com/tf_okrt/items/0cf72e5fe082cdec6801) より引用

```js
window.addEventListener("pageshow", function(event){
  if (event.persisted) {
    alert("back");
  }
});
```

動かず

### PerformanceNavigationTiming.type

[ブラウザバック感知の備忘録 #JavaScript - Qiita](https://qiita.com/tf_okrt/items/0cf72e5fe082cdec6801) より引用

```js
window.addEventListener("pageshow", function (event) {
  var entries = performance.getEntriesByType("navigation");
  entries.forEach(function (entry) {
    if (entry.type == "back_forward") {
      alert("back");
    }
  });
});
```

動きました！

### その他

戻ってきたときにdocument.referrerで行った先のURL取れるかと思いましたが、取れませんでした
