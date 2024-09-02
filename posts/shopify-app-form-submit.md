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
