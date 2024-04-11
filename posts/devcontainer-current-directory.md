---
title: 'Dev Containerの立ち上げ時のカレントディレクトリ'
date: '2024-04-08'
updated: ''
---

VSCode devcontainerでDockerfileをbuildして使うようにしてみました  
Python環境を用意しようとしていて

```bash
├── README.md
├── app.py
├── poetry.lock
├── pyproject.toml
└── .devcontainer
  ├── Dockerfile
  ├── compose.yaml
  └── devcontainer.json

```

としていました  

compose.yaml

```yml
services:
  app:
    build:
      context: .
      target: final
```

Dockerfile

```Dockerfile
FROM python:3.12.2

RUN pip install --upgrade pip && pip install poetry
```

Docker containerにpoetryを入れて、コンテナを立ち上げたら `poetry install` も終わるようにしたかったのでDockerfileに

```Dockerfile
COPY poetry.lock pyproject.toml /app/
RUN poetry install
```

を追記すると、`poetry.lock` が見つからずエラーになります  

これは `docker build` するときに、カレントディレクトリが `.devcontainer` になっているからです  
コンテナ立ち上げ時に一つ上を見ることはできなさそうです  

なのでbuild時に入れるのでなく、build後にコンテナを立ち上げるときに入れるようにいれます  
`.devcontainer.json` に

```json
{
  // ---
 "updateContentCommand": "poetry install",
  // ---
}
```

を追記します  

これでカレントディレクトリの `poetry.lock` を見てPythonモジュールがインストールされます  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/43SdymD" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81j5GPdg+JL._SY466_.jpg" alt="Pythonチュートリアル 第4版" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonチュートリアル 第4版</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
