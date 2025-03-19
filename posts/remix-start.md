---
title: 'Remixを使ってみる'
date: '2024-08-26'
updated: ''
---

なんとなく[Remix](https://remix.run/)を使ってたりしましたが、ちゃんと入門してみます

[Tutorial \(30m\) \| Remix](https://remix.run/docs/en/main/start/tutorial) をやりつつまとめます

## faviconやcssファイルを読み込む  

[links](https://remix.run/docs/en/main/route/links) を使います  

```tsx
import type { LinksFunction } from "@remix-run/node";

import stylesHref from "../styles/something.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    { rel: "stylesheet", href: stylesHref },
  ];
};
```

## ファイル名でルーティング用意

`app/routes` にファイルを置くと、そのファイル名でルーティングされます  
`_` で始まるファイル名はルーティングから無視  
ディレクトリで区切るか`.`で区切ると、ネストされたルーティングになります

[Route File Naming \| Remix](https://remix.run/docs/en/main/file-conventions/routes)  
を読むのがいいです

[Remixのルーティングを理解する | freks blog](/remix-routing) にもまとめました

## 全体のレイアウト

[root \| Remix](https://remix.run/docs/en/main/file-conventions/root)

`app/routes` が全部のページの枠
`<Outlet />` で子が読み込まれます  

## クライアントサイドのページ移動

[Link \| Remix](https://remix.run/docs/en/main/components/link) を使うとページ全体を読み込みなおさない移動になります

## データロード

サーバーサイドでデータロードします  
[loader | Remix](https://remix.run/docs/en/main/route/loader) を使います

```tsx
export const loader = async () => {
  const contacts = await getContacts();
  return json({ contacts });
};

export default function App() {
  const { contacts } = useLoaderData<typeof loader>();
}
```

URLのパラメータを使うには

```tsx
export const loader = async ({ params }) => {
  invariant(params.contactId, "Missing contactId param");
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ contact });
};
```

[invariant](https://github.com/alexreardon/tiny-invariant) でエラーを投げることができます  

## データ送信

[action | Remix](https://remix.run/docs/en/main/route/action) を使います

```tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";

import { updateContact } from "../data";

export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
};

export default function EditContact() {
  return (
    <Form id="contact-form" method="post">
      ...
    </Form>
  );
}
```

RemixのFormでsubmitすると、サーバーサイドでactionが実行されます  

## リンクのスタイル

[NavLink \| Remix](https://remix.run/docs/en/main/components/nav-link) を使うと今開いてるページのリンクスタイルを変えられます  

```tsx
<NavLink
  className={({ isActive, isPending }) =>
    isActive
      ? "active"
      : isPending
      ? "pending"
      : ""
  }
  to={`contacts/${contact.id}`}
>
  {/* existing elements */}
</NavLink>
```

## 全体でローディング中の表示

[useNavigation \| Remix](https://remix.run/docs/en/main/hooks/use-navigation) でローディング中かどうかを取得できます

```tsx
import {
  Outlet,
  useNavigation,
} from "@remix-run/react";

export default function App() {
  const navigation = useNavigation();

  return (
    <html lang="en">
      <body>
        <div
          className={
            navigation.state === "loading" ? "loading" : ""
          }
        >
          <Outlet />
        </div>
      </body>
    </html>
  );
}
```

## データを削除する

```tsx
<Form
  action="destroy"
  method="post"
  onSubmit={(event) => {
    const response = confirm(
      "Please confirm you want to delete this record."
    );
    if (!response) {
      event.preventDefault();
    }
  }}
>
  <button type="submit">Delete</button>
</Form>
```

`action="destroy"` で削除処理になります  

`app/routes/contacts.\$contactId.tsx` で削除処理を実行したとき  
`app/routes/contacts.\$contactId.destroy.tsx` が呼ばれます  

`app/routes/contacts.\$contactId.destroy.tsx` は

```tsx
import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteContact } from "../data";

export const action = async ({
  params,
}: ActionFunctionArgs) => {
  invariant(params.contactId, "Missing contactId param");
  await deleteContact(params.contactId);
  return redirect("/");
};
```

と削除のactionだけを書きます  

## トップページのコンテンツ

`app/routes/_index.tsx` がトップページのコンテンツになります

## 前の画面に戻る

[useNavigate \| Remix](https://remix.run/docs/en/main/hooks/use-navigate) を使います

```tsx
import { useNavigate } from "@remix-run/react";

function SomeComponent() {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
    />
  );
}
```

## URLのクエリを使ってデータを取得

```tsx
import type {
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";

// existing imports & exports

export const loader = async ({
  request,
}: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return json({ contacts });
};
```

## URLと同期しながら検索

[remix\.run/docs/en/main/start/tutorial\#synchronizing\-urls\-to\-form\-state](https://remix.run/docs/en/main/start/tutorial#synchronizing-urls-to-form-state) にいいサンプルがあります  

## 画面遷移しないデータ送信

[useFetcher \| Remix](https://remix.run/docs/en/main/hooks/use-fetcher) を使います

```tsx
export const action = async ({
  params,
  request,
}: ActionFunctionArgs) => {
  // some action
};

function SomeComponent() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="post">
      <input type="text" />
    </fetcher.Form>
  );
}
```

これでページ遷移せずにデータ送信がされます  

## 楽観的なUI

[remix\.run/docs/en/main/start/tutorial\#optimistic\-ui](https://remix.run/docs/en/main/start/tutorial#optimistic-ui) にいいサンプルがあります  

お気に入りボタンを押す、サーバーサイドで反映される前に表示を変えておくというものです

## まとめ

チュートリアルがよくできてていいです  
あとは必要な時に公式ドキュメント [Remix Docs Home \| Remix](https://remix.run/docs/en/main) を読んでいけばいいかなと思います
