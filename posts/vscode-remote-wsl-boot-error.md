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

[WSL 2 に更新する https://docs.microsoft.com/ja-jp/windows/wsl/install-win10](https://docs.microsoft.com/ja-jp/windows/wsl/install-win10)

で、選択した Linux ディストリビューションをインストールする、の手前まで実行して、PC再起動したら使えるようになりました

## 追記2

Windows10のバージョンは

```txt
エディション	Windows 10 Pro Insider Preview
バージョン	2004
インストール日	‎2021/‎01/‎17
OS ビルド	21292.1010
エクスペリエンス	Windows Feature Experience Pack 220.35104.0.3
```

Linuxは、Ubuntu 18.04で

```sh
$ lsb_release -a
No LSB modules are available.
Distributor ID: Ubuntu
Description:    Ubuntu 18.04.5 LTS
Release:        18.04
Codename:       bionic

$ uname -a
Linux xps15 5.4.72-microsoft-standard-WSL2 #1 SMP Wed Oct 28 23:40:43 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

エラーメッセージはこれ

```sh
[2021-03-06 02:16:40.319] Resolving wsl+ubuntu-18.04, resolveAttempt: 1
[2021-03-06 02:16:40.362] Starting VS Code Server inside WSL (Ubuntu-18.04)
[2021-03-06 02:16:40.362] Extension version: 0.54.0, Windows build: 21292. Multi distro support: available. WSL path support: enabled
[2021-03-06 02:16:40.363] No shell environment set or found for current distro.
[2021-03-06 02:16:40.483] Probing if server is already installed: C:\WINDOWS\System32\wsl.exe -d Ubuntu-18.04 -e sh -c "[ -d ~/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8 ] && printf found || ([ -f /etc/alpine-release ] && printf alpine-; uname -m)"
[2021-03-06 02:16:40.598] Probing result: found
[2021-03-06 02:16:40.598] Server install found in WSL
[2021-03-06 02:16:40.598] Launching C:\WINDOWS\System32\wsl.exe -d Ubuntu-18.04 sh -c '"$VSCODE_WSL_EXT_LOCATION/scripts/wslServer.sh" f30a9b73e8ffc278e71575118b6bf568f04587c8 stable .vscode-server 5000  '}
[2021-03-06 02:16:40.701] Setting up server environment: Looking for /home/user/.vscode-server/server-env-setup. Not found.
[2021-03-06 02:16:40.701] WSL version: 5.4.72-microsoft-standard-WSL2 Ubuntu-18.04
[2021-03-06 02:16:40.701] WSL2-shell-PID: 321
[2021-03-06 02:16:40.701] Starting server: /home/user/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8/server.sh  --port=0 --use-host-proxy --without-browser-env-var --print-ip-address --enable-remote-auto-shutdown --fileWatcherPolling=5000:/mnt/** 
[2021-03-06 02:16:40.702] Large pages are not enabled.
[2021-03-06 02:16:40.702] 
[2021-03-06 02:16:40.702] 
[2021-03-06 02:16:40.702] #
[2021-03-06 02:16:40.702] # Fatal error in , line 0
[2021-03-06 02:16:40.702] # 
[2021-03-06 02:16:40.702] #
[2021-03-06 02:16:40.702] #
[2021-03-06 02:16:40.702] #
[2021-03-06 02:16:40.702] #FailureMessage Object: 0x7ffc213efe70
[2021-03-06 02:16:40.702]  1: 0xa760a1  [/home/user/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8/node]
[2021-03-06 02:16:40.702]  2: 0x19f5a75 V8_Fatal(char const*, ...) [/home/user/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8/node]
[2021-03-06 02:16:40.702]  3: 0x10c4c44 v8::internal::Snapshot::Initialize(v8::internal::Isolate*) [/home/user/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8/node]
[2021-03-06 02:16:40.702]  4: 0xba6b4d v8::Isolate::Initialize(v8::Isolate*, v8::Isolate::CreateParams const&) [/home/user/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8/node]
[2021-03-06 02:16:40.702]  5: 0xa4acb1 node::NodeMainInstance::NodeMainInstance(v8::Isolate::CreateParams*, uv_loop_s*, node::MultiIsolatePlatform*, std::vector<std::string, std::allocator<std::string> > const&, std::vector<std::string, std::allocator<std::string> > const&, std::vector<unsigned long, std::allocator<unsigned long> > const*) [/home/user/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8/node]
[2021-03-06 02:16:40.702]  6: 0x9da5a0 node::Start(int, char**) [/home/user/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8/node]
[2021-03-06 02:16:40.702]  7: 0x7f3cc55f1bf7 __libc_start_main [/lib/x86_64-linux-gnu/libc.so.6]
[2021-03-06 02:16:40.702]  8: 0x979215  [/home/user/.vscode-server/bin/f30a9b73e8ffc278e71575118b6bf568f04587c8/node]
[2021-03-06 02:16:40.702] Illegal instruction
[2021-03-06 02:16:40.702] VS Code Server for WSL closed unexpectedly.
[2021-03-06 02:16:40.702] For help with startup problems, go to
[2021-03-06 02:16:40.702] https://code.visualstudio.com/docs/remote/troubleshooting#_wsl-tips
[2021-03-06 02:16:40.704] C:\WINDOWS\System32\wsl.exe -d Ubuntu-18.04 -e kill 321
[2021-03-06 02:16:40.848] WSL Daemon exited with code 0
```

いろいろ調べましたが、結局、ラフなやり方で

```
cd ~
mv .vscode-server .vscode-server.1
```

で、直りました