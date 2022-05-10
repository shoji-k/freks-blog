---
title: 'ダウンロードファイルが正しいかgpgチェックする'
date: '2022-05-10'
updated: ''
---

[agriggio / ART](https://bitbucket.org/agriggio/art/wiki/Home) の Windows 11 版をインストールするのにバイナリが正式なものか確認しました  

key を取り込む

```bash
$ gpg --import https://keys.openpgp.org/vks/v1/by-fingerprint/942FCFB1CBE1E38928A1A6BEA94D951156835A5D
gpg: can't open 'https://keys.openpgp.org/vks/v1/by-fingerprint/942FCFB1CBE1E38928A1A6BEA94D951156835A5D': No such file or directory
gpg: Total number processed: 0
```

で失敗してしまうのでいったんダウンロードしました（解決策知りたい...）

```bash
wget https://keys.openpgp.org/vks/v1/by-fingerprint/942FCFB1CBE1E38928A1A6BEA94D951156835A5D
```

で import

```bash
gpg --import 942FCFB1CBE1E38928A1A6BEA94D951156835A5D
gpg: key A94D951156835A5D: public key "Alberto Griggio <alberto.griggio@gmail.com>" imported
gpg: Total number processed: 1
gpg:               imported: 1
```

Windows 用の exe とチェックするファイルをダウンロードして

```bash
wget https://bitbucket.org/agriggio/art/downloads/ART_1.13_Win64.exe
wget https://bitbucket.org/agriggio/art/downloads/ART_1.13_Win64.exe.asc
```

確認

```bash
$ gpg --verify ART_1.13_Win64.exe.asc ART_1.13_Win64.exe
gpg: Signature made Mon Apr  4 04:34:32 2022 JST
gpg:                using RSA key 942FCFB1CBE1E38928A1A6BEA94D951156835A5D
gpg: Good signature from "Alberto Griggio <alberto.griggio@gmail.com>" [unknown]
gpg: WARNING: This key is not certified with a trusted signature!
gpg:          There is no indication that the signature belongs to the owner.
Primary key fingerprint: 942F CFB1 CBE1 E389 28A1  A6BE A94D 9511 5683 5A5D
```

`Good signature` なのでよさそうです
