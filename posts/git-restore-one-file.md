---
title: 'Gitで古いコミットの1ファイルだけ戻す'
date: '2024-12-06'
updated: ""
---

Gitで古いコミットの1ファイルだけ戻す方法です  

git restore を使うとできます  

```bash
git restore --source=commit_hash file_path
```

`--source` でコミットのハッシュを指定して、ファイルのパスを指定します  

`commit_hash` は、git logで探してコピーしてきます  

`file_path` は、戻したいファイルのパスを指定します  

たとえば

```bash
git restore --source=abcde src/sample.tsx
```

な感じで使います  

## まとめ

あっとなったときに覚えておくと便利ですね

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4ebO87I" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/91sJnOahFiL._SY466_.jpg" alt="スーパーユーザーなら知っておくべきLinuxシステムの仕組み" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">スーパーユーザーなら知っておくべきLinuxシステムの仕組み</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
