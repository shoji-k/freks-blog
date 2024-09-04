---
title: 'Shopify appでFormがsubmitされない'
date: '2024-09-02'
updated: ""
---

RemixのShopify appつくっていてactionが動かなかったので調べました  

コードはこんな感じ

`app/routes/app._index.tsx`

```tsx
export const action = async ({ request }: ActionFunctionArgs) => {
  // some action
}

export default function IndexPage() {
  const records = useLoaderData<typeof loader>();

  return (
    <div>
      {records.map((record) => (
        <Layout.Section key={record.id}>
          <Record record={record} />
        </Layout.Section>
      ))}
      <Listbox accessibilityLabel="Listbox with Action example">
        {records
          .map((record) => (
            <Listbox.Option key={record.id} value={record.id}>
              <Record record={record} />
            </Listbox.Option>
        ))}
      </Listbox>
    </div>
  )
}

function Record() {
  return (
    <Form method="post">
      <Button type="submit">Action</Button>
    </Form>
  )
}
```

IndexPageの中でRecordコンポーネントを読みこんで、Recordコンポーネントの中でFormをsubmitする、これが動きません

`Listbox` の中でFormをsubmitすると動かないっぽいです  
`Listbox` を外すと動きました  

## まとめ

はまってしまいました  
余力あれば原因追いたいです

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Xtt7j7" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81veEHwK-4L._SY466_.jpg" alt="いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">いちばんやさしいShopifyの教本 人気講師が教える売れるネットショップ制作・運営 「いちばんやさしい教本」シリーズ</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
