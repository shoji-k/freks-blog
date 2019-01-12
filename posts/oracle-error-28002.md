---
title: "Oracle 11g ORA-28002 エラー"
date: "2019-01-12"
---

データベースにOracleを使っている案件があって  
[Oracle Database Express Edition 11g Release 2](https://www.oracle.com/technetwork/jp/database/database-technologies/express-edition/overview/index.html)
を使って開発してたのですが、突然

```
ORA-28002: the password will expier within 7days 
```

のエラーが出るようになりました

Oracle 11gはデフォルトのパスワードの期限が180日になってて切れるようでした..

期限を延ばしてやればいいようで無期限にします

Oracle Database Express Editionのデフォルトユーザー、パスワードは system/oracle なので  
sqlplusでログインして  

```
$ sqlplus system/oracle
> alter profile default limit password_life_time unlimited;
> alter user system identified by oracle; 
```

で同じパスワードでも期限延長できました   

