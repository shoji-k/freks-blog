---
title: 'Remixのルーティングを理解する'
date: '2024-10-30'
updated: ""
---

Remixのルーティングを理解するため、かみ砕いていきます  
[Route File Naming \| Remix](https://remix.run/docs/en/main/file-conventions/routes) を見るのがいいですが、例が足りないと思うので補足していきます  

## 前提

`app/route.tsx` が一番の大元のファイル  
その中の `<Outlet />` で続くファイルを読み込みます  

## Dotで区切る

ドットでURLが区切られ、`_` で始まるものはURLには現れません  

<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="border: 1px solid #ccc; padding: 4px;">ファイル</th>
<th style="border: 1px solid #ccc; padding: 4px;">url</th>
<th style="border: 1px solid #ccc; padding: 4px;">layout</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/_index.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/route.tsx</td>
</tr>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">--</td>
<td style="border: 1px solid #ccc; padding: 4px;">--</td>
</tr>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing._index.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/landing</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/route.tsx</td>
</tr>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing.one.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/landing/one</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing.tsx</td>
</tr>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing.one.two.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/landing/one/two</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing.tsx + app/routes/landing.one.tsx</td>
</tr>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing.$number.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/landing/(number)</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/landing.tsx</td>
</tr>
</tbody>
</table>

`/one/two` にアクセスしたときに  
`app/routes/landing.one.tsx` に `<Outlet >` がなかったら、`app/routes/landing.one.two.tsx` は読み込まれません  

`/one` にアクセスしたときに
`app/routes/landing.one.tsx` の `<Outlet >` は無視されます  

`/landing/three` にアクセスしたときに `app/routes/landing.$number.tsx` が表示されます  
`$number` に定義済の `one` 以外の文字列がなんでも入ってきます

## Layoutを無視したい

<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="border: 1px solid #ccc; padding: 4px;">ファイル</th>
<th style="border: 1px solid #ccc; padding: 4px;">url</th>
<th style="border: 1px solid #ccc; padding: 4px;">layout</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing_.three.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/landing/three</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/route.tsx</td>
</tr>
</tbody>
</table>

つづいて `landing_` とすると `landing` がLayoutにならなくなります

## URLに含めたくない

`_` で始まるファイルはURLには現れません  
layoutファイルを変えるのに便利です  

<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="border: 1px solid #ccc; padding: 4px;">ファイル</th>
<th style="border: 1px solid #ccc; padding: 4px;">url</th>
<th style="border: 1px solid #ccc; padding: 4px;">layout</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/_auth.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">--</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/route.tsx</td>
</tr>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/_auth.login.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/login</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/_auth.tsx</td>
</tr>
</tbody>
</table>

ただし、`_index.tsx` は特殊なファイルのため、`app/routes/_index.login.tsx` はできません  
`Index routes must not have child routes. Please remove all child routes from route path "/".` のエラーになります

## 動的なURL

動的なURLでなくてもいけるようにするなら `($value)` の形を使います  

<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="border: 1px solid #ccc; padding: 4px;">ファイル</th>
<th style="border: 1px solid #ccc; padding: 4px;">url</th>
<th style="border: 1px solid #ccc; padding: 4px;">layout</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/lang.($lang)._index.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/lang/(なんでも)</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/lang.tsx</td>
</tr>
</tbody>
</table>

これで  

```tsx
export async function loader({ params }: LoaderFunctionArgs) {
  const lang = params.lang;
  return json({ lang });
}
```

で `lang` にアクセスされたURLの値が入ります  
定義済のURLがあればそっちが優先され、`app/routes/($lang)._index.tsx` へのアクセスにはなりません  

`($value)` はどの位置でも使えるので `/places/($places)` とかにもできます

## 特殊な記号をURLに含めたい

`.` とか `_` が特別に扱われるので、URLに含めたいときは`[]` で囲むといいです  

<table style="border-collapse: collapse; width: 100%;">
<thead>
<tr>
<th style="border: 1px solid #ccc; padding: 4px;">ファイル</th>
<th style="border: 1px solid #ccc; padding: 4px;">url</th>
<th style="border: 1px solid #ccc; padding: 4px;">layout</th>
</tr>
</thead>
<tbody>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/sitemap[.]xml.tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/sitemap.xml</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/route.tsx</td>
</tr>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing.[_index].tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/landing/_index</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/landing.tsx</td>
</tr>
<tr>
<td style="border: 1px solid #ccc; padding: 4px;">app/routes/landing.[$money].tsx</td>
<td style="border: 1px solid #ccc; padding: 4px;">/landing/$money</td>
<td style="border: 1px solid #ccc; padding: 4px;">app/landing.tsx</td>
</tr>
</tbody>
</table>

## ディレクトリでURLを管理したい

`/routes/` にファイルを置くとルーティングに関係してしまい、コンポーネントだけのファイルがおけません  
ディレクトリで管理する方法を使うと、ルーティングに関係ないファイルがおけるようになります

ディレクトリ名がURLになります  
ディレクトリ内の `route.tsx` だけが読み込まれ、他のファイルはルーティングと関係なくなります  
なのでコンポーネントだけのファイルがおけていいです  

```bash
├── app
│   ├── footer.tsx
│   └── route.tsx
```

みたいにすると `/app` でアクセスしたら `app/route.tsx` が読み込まれます  
`app/footer.tsx` のコンポーネントを `app/route.tsx` で読み込んで使えていい感じですね  

## まとめ

ぱっと公式ドキュメントをみてふんわり使ってましたが、理解深められました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
