---
title: 'portを専有しているプロセスを探して止める方法'
date: '2020-12-08'
updated: ""
---

port を専有しているプロセスを探して止める方法をメモ

実際は、Firebase Emulator を立ち上げて、止めたのにプロセスが残っていて、もう一度立ち上げようとすると、port 専有されてるエラーがでたときにやりました
以下、Firebase Emulator を立ち上げるのに邪魔なプロセスを消した例です

8080 ポートを使っているプロセスを探します

```
$ lsof -i tcp:8080

COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
java    807 user  135u  IPv4   1262      0t0  TCP localhost:http-alt (LISTEN)
java    807 user  137u  IPv4  22075      0t0  TCP localhost:48636->localhost:http-alt (ESTABLISHED)
java    807 user  138u  IPv4  14101      0t0  TCP localhost:http-alt->localhost:48636 (ESTABLISHED)
```

PID が 807 を使っているので、これを kill

```
$ kill -9 807
```

これで再度起動できました
