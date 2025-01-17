---
title: 'Windowsでディスクを修復する'
date: '2025-01-17'
updated: ''
---

Windowsでディスクのチェックと修復をしてみました  
[chkdsk \| Microsoft Learn](https://learn.microsoft.com/ja-jp/windows-server/administration/windows-commands/chkdsk?tabs=event-viewer) が参考になります  

## chkdsk

コマンドプロンプトでコマンドを実行してやります  
Windowsの検索窓で `cmd` とうったりしてコマンドプロンプトを見つけ、管理者として実行を選びます  

今回チェックしたかったのはOSも入っているCドライブだったので、以下のコマンドを実行しました

```cmd
chkdsk c: /r
```

`/r` で物理ディスク エラーの追加分析を含む  
`/f` の機能が含まれているので、`/r` で十分です  

OSが動いているドライブだったため、再起動後にチェックが始まりました  
ブート画面でチェックが始まり、進捗が表示されます  
1時間くらい放置したら終わっていました

## 結果を確認

Windowsが起動したら結果を確認します  

[chkdsk \| Microsoft Learn](https://learn.microsoft.com/ja-jp/windows-server/administration/windows-commands/chkdsk?tabs=event-viewer#viewing-chkdsk-logs)
のイベントビューワーの指示通りに開いてみました  

結果を貼り付けてみます  

```txt
ログの名前:         Application
ソース:           Microsoft-Windows-Wininit
日付:            2025/01/16 17:58:06
イベント ID:       1001
タスクのカテゴリ:      なし
レベル:           情報
キーワード:         クラシック
ユーザー:          N/A
コンピューター:       inspiron14
説明:


Checking file system on C:
The type of the file system is NTFS.
Volume label is OS.

A disk check has been scheduled.
Windows will now check the disk.                         

Stage 1: Examining basic file system structure ...
  1145600 file records processed.                                                        


File verification completed.
 Phase duration (File record verification): 30.95 seconds.
  32060 large file records processed.                                   


 Phase duration (Orphan file record recovery): 39.75 milliseconds.
  0 bad file records processed.                                     


 Phase duration (Bad file record checking): 6.24 milliseconds.

Stage 2: Examining file name linkage ...
  1372 reparse records processed.                                      


  1521484 index entries processed.                                                       


Index verification completed.
 Phase duration (Index verification): 1.50 minutes.
  0 unindexed files scanned.                                        


 Phase duration (Orphan reconnection): 4.64 seconds.
  0 unindexed files recovered to lost and found.                    


 Phase duration (Orphan recovery to lost and found): 9.74 seconds.
  1372 reparse records processed.                                      


 Phase duration (Reparse point and Object ID verification): 25.01 milliseconds.

Stage 3: Examining security descriptors ...
Cleaning up 6642 unused index entries from index $SII of file 0x9.
Cleaning up 6642 unused index entries from index $SDH of file 0x9.
Cleaning up 6642 unused security descriptors.
CHKDSK is compacting the security descriptor stream
Security descriptor verification completed.
 Phase duration (Security descriptor verification): 483.87 milliseconds.
  187943 data files processed.                                           


 Phase duration (Data attribute verification): 6.48 milliseconds.
CHKDSK is verifying Usn Journal...
  41843072 USN bytes processed.                                                           


Usn Journal verification completed.
 Phase duration (USN journal verification): 208.66 milliseconds.

Stage 4: Looking for bad clusters in user file data ...
  1145584 files processed.                                                               


File data verification completed.
 Phase duration (User file recovery): 26.46 minutes.

Stage 5: Looking for bad, free clusters ...
  24517455 free clusters processed.                                                       


Free space verification is complete.
 Phase duration (Free space recovery): 15.73 seconds.
CHKDSK discovered free space marked as allocated in the
master file table (MFT) bitmap.
Correcting errors in the Volume Bitmap.

Windows has made corrections to the file system.
No further action is required.

 482818047 KB total disk space.
 382915828 KB in 751897 files.
    553736 KB in 187946 indexes.
         0 KB in bad sectors.
   1278659 KB in use by the system.
     65536 KB occupied by the log file.
  98069824 KB available on disk.

      4096 bytes in each allocation unit.
 120704511 total allocation units on disk.
  24517456 allocation units available on disk.
Total duration: 29.00 minutes (1740499 ms).

Internal Info:
00 7b 11 00 fd 56 0e 00 7f d7 18 00 00 00 00 00  .{...V..........
e7 01 00 00 75 03 00 00 00 00 00 00 00 00 00 00  ....u...........

イベント XML:
<Event xmlns="http://schemas.microsoft.com/win/2004/08/events/event">
  <System>
    <Provider Name="Microsoft-Windows-Wininit" Guid="{206f6dea-d3c5-4d10-bc72-989f03c8b84b}" EventSourceName="Wininit" />
    <EventID Qualifiers="16384">1001</EventID>
    <Version>0</Version>
    <Level>4</Level>
    <Task>0</Task>
    <Opcode>0</Opcode>
    <Keywords>0x80000000000000</Keywords>
    <TimeCreated SystemTime="2025-01-16T08:58:06.7542277Z" />
    <EventRecordID>116409</EventRecordID>
    <Correlation />
    <Execution ProcessID="808" ThreadID="0" />
    <Channel>Application</Channel>
    <Computer>inspiron14</Computer>
    <Security />
  </System>
  <EventData>
    <Data>

Checking file system on C:
The type of the file system is NTFS.
Volume label is OS.

A disk check has been scheduled.
Windows will now check the disk.                         

Stage 1: Examining basic file system structure ...
  1145600 file records processed.                                                        


File verification completed.
 Phase duration (File record verification): 30.95 seconds.
  32060 large file records processed.                                   


 Phase duration (Orphan file record recovery): 39.75 milliseconds.
  0 bad file records processed.                                     


 Phase duration (Bad file record checking): 6.24 milliseconds.

Stage 2: Examining file name linkage ...
  1372 reparse records processed.                                      


  1521484 index entries processed.                                                       


Index verification completed.
 Phase duration (Index verification): 1.50 minutes.
  0 unindexed files scanned.                                        


 Phase duration (Orphan reconnection): 4.64 seconds.
  0 unindexed files recovered to lost and found.                    


 Phase duration (Orphan recovery to lost and found): 9.74 seconds.
  1372 reparse records processed.                                      


 Phase duration (Reparse point and Object ID verification): 25.01 milliseconds.

Stage 3: Examining security descriptors ...
Cleaning up 6642 unused index entries from index $SII of file 0x9.
Cleaning up 6642 unused index entries from index $SDH of file 0x9.
Cleaning up 6642 unused security descriptors.
CHKDSK is compacting the security descriptor stream
Security descriptor verification completed.
 Phase duration (Security descriptor verification): 483.87 milliseconds.
  187943 data files processed.                                           


 Phase duration (Data attribute verification): 6.48 milliseconds.
CHKDSK is verifying Usn Journal...
  41843072 USN bytes processed.                                                           


Usn Journal verification completed.
 Phase duration (USN journal verification): 208.66 milliseconds.

Stage 4: Looking for bad clusters in user file data ...
  1145584 files processed.                                                               


File data verification completed.
 Phase duration (User file recovery): 26.46 minutes.

Stage 5: Looking for bad, free clusters ...
  24517455 free clusters processed.                                                       


Free space verification is complete.
 Phase duration (Free space recovery): 15.73 seconds.
CHKDSK discovered free space marked as allocated in the
master file table (MFT) bitmap.
Correcting errors in the Volume Bitmap.

Windows has made corrections to the file system.
No further action is required.

 482818047 KB total disk space.
 382915828 KB in 751897 files.
    553736 KB in 187946 indexes.
         0 KB in bad sectors.
   1278659 KB in use by the system.
     65536 KB occupied by the log file.
  98069824 KB available on disk.

      4096 bytes in each allocation unit.
 120704511 total allocation units on disk.
  24517456 allocation units available on disk.
Total duration: 29.00 minutes (1740499 ms).

Internal Info:
00 7b 11 00 fd 56 0e 00 7f d7 18 00 00 00 00 00  .{...V..........
e7 01 00 00 75 03 00 00 00 00 00 00 00 00 00 00  ....u...........
</Data>
  </EventData>
</Event>
```

こんな結果でした

ChatGPTに結果を評価してもらったら

```txt
総合的に見ると、ディスクの物理障害はなく、MFTビットマップの割り当て情報に不整合があったのを自動的に修正した、という内容です。
最終的に「No further action is required.」とある通り、現状では特に追加の対処は必要ありません。
引き続きバックアップをこまめに取りつつ、異常な動作が出ないか観察しておくと安心です。
```

と問題なさそうです

## まとめ

ディスクが壊れると面倒なのでおかしいと感じたらチェックしておきたいです  

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/4jmDXjO" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/81QnV2OzIKL._SY385_.jpg" alt="Windowsコマンド環境のすべて" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">Windowsコマンド環境のすべて</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
