---
title: 'Oracle Pivotの使い方'
date: '2019-05-09'
updated: ""
---

Oracle Pivot を使った SQL を読むたびに、どうなるんだっけ..となってしまってたのでここにまとめます

1 行でいうと、縦表示を横表示に変えるものです  
使い方を見てみます

まずはサンプルのテーブル

```
create table PivotSample(
ID   number(1),
Year number(4),
Val  number(3),
primary key (ID,Year));
```

データは

```
select * from PivotSample;
```

| ID  | Year | Val |
| --- | ---- | --- |
| 1   | 2010 | 1   |
| 1   | 2011 | 2   |
| 1   | 2012 | 6   |
| 2   | 2010 | 70  |
| 2   | 2011 | 80  |
| 3   | 2012 | 90  |
| 4   | 2010 | 300 |
| 4   | 2012 | 500 |

こんな感じで用意されてるとして

Pivot の例は

```
select *
  from PivotSample
 Pivot (max(Val) for Year in(2010 as Agg2010,
                             2011 as Agg2011,
                             2012 as Agg2012))
order by ID;
```

| ID  | Agg2010 | Agg2011 | Agg2012 |
| --- | ------- | ------- | ------- |
| 1   | 1       | 2       | 6       |
| 2   | 70      | 80      | null    |
| 3   | null    | null    | 90      |
| 4   | 300     | null    | 500     |

ポイントとしては、Pivot() に出てこない列が暗黙の GROUP BY のキーになるところ  
つまり、ここだと ID 列で GROUP BY されてます

Pivot 内の in の項目が横表示になります  
値は、max(Val)が表示されます

出典: [図でイメージする Oracle Database の SQL 全集 第 8 回 Pivot と UnPivot](https://www.oracle.com/technetwork/jp/articles/otnj-sql-image8-1869572-ja.html#c)

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3ZajRSg" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://a.media-amazon.com/images/I/81mwLGJmsqL._SY466_.jpg" alt="図解入門よくわかる 最新Oracleデータベースの基本と仕組み[第6版]" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">図解入門よくわかる 最新Oracleデータベースの基本と仕組み[第6版]</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
