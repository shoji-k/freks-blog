---
title: 'VSCode Dev Containerでbash historyをホストPCと同期する'
date: '2025-03-05'
updated: ""
---

VSCode Dev Containerでbash historyをホストPCと同期する方法を調べました

Dev Containerのbash historyをコンテナに保持する方法は  
[Persist bash history](https://code.visualstudio.com/remote/advancedcontainers/persist-bash-history)  
に書いてあります

保存しているDocker volumeを消すと消えてしまうし、最初にhistoryなしから始めるのが不便なのでホストPCのbash historyと同期してみます  

devcontainer.json に以下を追加します

```yaml
  "mounts": [
    "source=${localEnv:HOME}/.bash_history,target=/home/vscode/.bash_history,type=bind"
  ],
```

Docker containerをvscode userで使っていたので `/home/vscode/.bash_history` にマウントしています  
`.bash_history` の場所は

```bash
echo $HISTFILE
```

で確認できます

これでホストPCのbash historyと同期されるようになりました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3Zi5mvE" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81+8Yg3nKjL._SY466_.jpg" alt="Visual Studio Codeパーフェクトマスター" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Visual Studio Codeパーフェクトマスター</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
