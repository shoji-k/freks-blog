---
title: 'Webサイトに動画をのせる'
date: '2023-09-08'
updated: ''
---

ウェブサイトに動画を載せる方法を調べました

## YouTubeにあげた動画を埋め込む

埋め込みたい動画のYouTubeページを開いて、共有ボタンを押します  
動画の埋め込みを選んでiframeのコードをコピーします

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/9DIfb1apceA?si=rdvRibCDMiByZZoK"
  title="YouTube video player"
  frameborder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  allowfullscreen
></iframe>
```

これをHTMLに貼り付けると動画が埋め込まれます

## 自分で動画を公開する

動画をウェブサイトやAmazon S3など見れる場所へアップロードします

```html
<video controls>
  <source src="/somewhere/sample.webm" type="video/webm" />
  <source src="/somewhere/sample.mp4" type="video/mp4" />
</video>
```

mp4など一つの形式だけでもいいですが、より軽量なwebmも用意しておくといいです

オプションの詳細は [video | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Element/Video)

## ひと手間

### webmの形式の動画を用意する

検索すると変換してくれるサイトがいくつか見つかります

Ubuntu 22.04でffmpegを使ってmp4からwebmを作ってみました

```bash
ffmpeg -i sample.mp4 sample.webm
```

試したところ50.2MBの動画が6.16MBになりました

### 動画のサムネイルを用意してページの表示を早くする

YouTubeのiframeやvideoタグで動画を表示させると、ページの読み込みが遅くなります

動画のサムネイルを用意、クリックすると動作が再生されるようにすると、ページの読み込みが早くなります

React.jsの例です

```js
export function Movie() {
  const [show, setShow] = useState(false)

  const movie = '/sample.mp4'
  const thumbnail = '/sample.jpg'

  return (
    <>
      {!show && (
        <img
          src={thumbnail}
          alt="movie thumbnail"
          onClick={() => setShow(true)}
          className="w-full"
          loading="lazy"
          width="1674"
          height="941"
        />
      )}
      {show && (
        <video controls autoPlay>
          <source src={movie} type="video/mp4" />
        </video>
      )}
    </>
  )
}
```

`autoPlay` は動画を自動再生するオプションです  
対応してない環境もあるようで注意です
