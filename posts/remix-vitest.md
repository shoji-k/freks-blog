---
title: 'RemixでVitestを使う'
date: '2025-03-19'
updated: ''
---

RemixでVitestを導入してみました

```bash
npx create-remix@latest
```

で作った、vite 6.2.2 で試しています  

## vitestを動かす  

[Getting Started | Guide | Vitest](https://vitest.dev/guide/) をみて vitest を入れる

```bash
npm install --save-dev vitest
```

`package.json` に

```json
"scripts": {
  "test": "vitest"
}
```

を追加しておいて

`vitest.config.ts` の設定ファイルを用意

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true
  },
})
```

`import { expect, test } from 'vitest'` のimportが省略できます  

TypeScriptにも `vitest` を読み込ませたいので `tsconfig.json` に

```json
{
  "compilerOptions": {
    "types": ["vitest/globals"]
  }
}
```

を追加

これで `sample.test.ts` を作って

```ts
test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})
```

`npm run test` でテストが走ります

## React componentをvitestで動かす  

Button componentを作ってテストしてみます

```tsx
export function Buttion() {
  return <button>Click me</button>;
}
```

このままではvitestでReactを動かせないので、`@testing-library/react` を使います  

[React Testing Library | Testing Library](https://testing-library.com/docs/react-testing-library/intro)  

```bash
npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom
```

dom操作をするために  
[Setup | Testing Library](https://testing-library.com/docs/react-testing-library/setup/#using-without-jest)  
を見て  

```bash
npm install --save-dev jsdom global-jsdom
```

`vitest.config.ts` の設定ファイルに `environment: 'jsdom'` を追加

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
})
```

これで `vitest` でdom操作できるようになります  

Button componentのテストを用意します  

```tsx
import { render, screen } from '@testing-library/react';
import { Buttion } from './Button';

describe('Button', () => {
  test('renders button with correct text', () => {
    render(<Buttion />);
    const button = screen.getByRole('button');
    expect(button.textContent).toBe('Click me');
  });
});
```

テストを実行して通ればOKです

## まとめ

一気に確認できるドキュメントがなくて調べながらやりました  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
