---
title: 'Dev ContainerからGitHubにpushする'
date: '2024-04-11'
updated: '2024-05-13'
---

VSCode Dev Containerで開発しているときに `git push` すると

```bash
$ git push origin HEAD
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```

とエラーになりました  
Dev Containerには.gitconfigは自動でコピーされています  
GitHub にpushするのにSSHキーを使う場合、必要なSSHキーもシェアしないといけません  

[Sharing git credentials](https://code.visualstudio.com/remote/advancedcontainers/sharing-git-credentials#_using-ssh-keys) に書いてありますがちょっとはまったのでまとめます  

WSLで

```bash
eval "$(ssh-agent -s)"
```

~/.bashrc に

```txt
if [ -z "$SSH_AUTH_SOCK" ]; then
   # Check for a currently running instance of the agent
   RUNNING_AGENT="`ps -ax | grep 'ssh-agent -s' | grep -v grep | wc -l | tr -d '[:space:]'`"
   if [ "$RUNNING_AGENT" = "0" ]; then
        # Launch a new instance of the agent
        ssh-agent -s &> $HOME/.ssh/ssh-agent
   fi
   eval `cat $HOME/.ssh/ssh-agent`
fi
```

を追加、確認で読み込み直してみる

```bash
source ~/.bashrc
```

必要なキーを登録します

```bash
ssh-add $HOME/.ssh/github_rsa
```

VSCode Dev Container内で確認

```bash
git fetch origin
git push origin HEAD
```

うまくいきました

追記)  

~/.bashrc に鍵を追加するコマンドをいれないと再起動後に動きませんでした

```bash
eval `ssh-add ~/.ssh/github_rsa > /dev/null 2>&1`
```

## まとめ

PCを新しくするたびにやり方忘れますが、公式ドキュメント見てやり直すのがいいですね

<hr />

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/47fcefs" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71soeH9BOlL._SY522_.jpg" alt="改訂新版 Visual Studio Code実践ガイド —— 定番コードエディタを使い倒すテクニック" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">改訂新版 Visual Studio Code実践ガイド —— 定番コードエディタを使い倒すテクニック</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
