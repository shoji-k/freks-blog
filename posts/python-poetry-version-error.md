---
title: 'Python Poetryでバージョン違いエラー'
date: '2024-05-09'
updated: ''
---

PythonでPoetryでモジュール管理してるのですが、[microsoft/autogen](https://github.com/microsoft/autogen) を試してみたくて

```bash
poetry add pyautogen
```

するとエラーが

```bash
The current project's supported Python range (>=3.12,<4.0) is not compatible with some of the required packages Python requirement: - pyautogen requires Python <3.13,>=3.8, so it will not be satisfied for Python >=3.13,<4.0
```

```bash
$ python --version
Python 3.12.2
```

Pythonは3.12.2で、pyautogenは3.8以上3.13未満にはあてはまってます

原因は`pyproject.toml`の記載でした

```toml
[tool.poetry.dependencies]
python = "^3.12"
```

と書いてたので、Python >=3.12,<4.0 が条件になっていました  
pyautogenは3.13未満にしないとだめなので

```toml
[tool.poetry.dependencies]
python = "^3.12,<3.13"
```

に変更

これで

```bash
poetry add pyautogen
```

成功しました

## まとめ

Pythonに慣れてないので慣れていきたいです

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3JQjt2J" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81Tfw3iSJUL._SY466_.jpg" alt="Pythonプログラミングパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Pythonプログラミングパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
