---
title: "VSCodeでRemote WSLが立ち上がらなくなった"
date: "2020-09-26"
---

WSL2 + Ubuntu 18.04 + VSCode + Remote WSL を使ってたところ、起動しなくなりました

```
[2020-09-26 05:44:32.090] Resolving wsl+ubuntu-18.04, resolveAttempt: 1
[2020-09-26 05:44:32.137] Starting VS Code Server inside WSL (Ubuntu-18.04)
[2020-09-26 05:44:32.137] Extension version: 0.44.5, Windows build: 20175. Multi distro support: available. WSL path support: enabled
[2020-09-26 05:44:32.256] Probing if server is already installed: C:\WINDOWS\System32\wsl.exe -d Ubuntu-18.04 -e sh -c "[ -d ~/.vscode-server/bin/e5e9e69aed6e1984f7499b7af85b3d05f9a6883a ] && printf found || ([ -f /etc/alpine-release ] && printf alpine-; uname -m)"
[2020-09-26 05:44:33.908] Probing result: found
[2020-09-26 05:44:33.908] Server install found in WSL
[2020-09-26 05:44:33.908] Launching C:\WINDOWS\System32\wsl.exe -d Ubuntu-18.04 sh -c '"$VSCODE_WSL_EXT_LOCATION/scripts/wslServer.sh" e5e9e69aed6e1984f7499b7af85b3d05f9a6883a stable .vscode-server 0  ' in c:\Users\shoji\.vscode\extensions\ms-vscode-remote.remote-wsl-0.44.5}
[2020-09-26 05:44:34.119] Setting up server environment: Looking for /home/user/.vscode-server/server-env-setup. Not found.
[2020-09-26 05:44:34.119] WSL version: 4.19.128-microsoft-standard Ubuntu-18.04
[2020-09-26 05:44:34.119] WSL2-shell-PID: 12
[2020-09-26 05:44:34.119] Starting server: /home/user/.vscode-server/bin/e5e9e69aed6e1984f7499b7af85b3d05f9a6883a/server.sh  --port=0 --use-host-proxy --enable-remote-auto-shutdown 
[2020-09-26 05:44:34.120] internal/errors.js:1
[2020-09-26 05:44:34.120] 
[2020-09-26 05:44:34.120] 
[2020-09-26 05:44:34.120] 
[2020-09-26 05:44:34.120] SyntaxError: Invalid or unexpected token
[2020-09-26 05:44:34.120] VS Code Server for WSL closed unexpectedly.
[2020-09-26 05:44:34.120] For help with startup problems, go to
[2020-09-26 05:44:34.120] https://code.visualstudio.com/docs/remote/troubleshooting#_wsl-tips
```

リンクを見ても特に記載はなく、`/home/user/.vscode-server/` をいったん

```
mv .vscode-server .vscode-server.1
```

と変えてみて起動すると動作しました  

## 追記

また、起動するとエラーが...
windows TerminalでUbuntu開くとエラー

```
既存の接続はリモート ホストに強制的に切断されました。

[プロセスはコード 4294967295 で終了しました]
```

Insider PreviewでWSL2いれてて、通常のWindows updateでWSL2が来たからっぽい..
参考) [Windows Updateしたら「プロセスはコード 4294967295 で終了しました」が出てWSL2が使えなくなった \- Qiita](https://qiita.com/fujiQ/items/9997916e5756c9e85e37) 

[https://docs.microsoft.com/ja-jp/windows/wsl/install-win10  WSL 2 に更新する]

で、選択した Linux ディストリビューションをインストールする、の手前まで実行して、PC再起動したら使えるようになりました