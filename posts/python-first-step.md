---
title: "Pythonはじめのメモ"
date: "2018-12-16"
updated: ""
tags: "python"
---

少し[Python](https://www.python.org/)を触ったのでメモです

ファイルの先頭

```
# coding: utf-8
```

インデント

スペース4つ or タブ

出力

```
print('Hello')
# Hello
print('Hello', 'World')
# Hello World
print('Hello', 'World', end="!!")
# Hello World!!

# 改行しない
print('Hello', 'World', end="")
```

コメントアウト
```
# one line

'''
block comment out
'''
```

代入

```
num = 10
```

if文

```
# インデントでブロックになる
if num < 10:
    print('under 10')
elif num < 20:
    print('under 20')
else:
    print('Hello')
```

ランダム生成

```
import random

num = random.random()
# 0-1 random

num = random.randint(1, 100)
# 1-100 random
```

日付

```
import datetime
print(datetime.date.today())
# 2018-07-28
```

for

```
for i in range(5, 10):
    print(i)
```

標準入力

```
word = input()
```

リスト

```
list = ["number", 100, 200]
count = len(list)
list.append("sample") # add
list.pop(1) # delete
```

リストのループ

```
for v in list:
    print(v)

# indexを使う
for (i, v) in enumerate(list)
    print(str(i) + ": " + v)
```

リストのソート

```
# stringは文字コード順になる
sorted(list)
sorted(list, reverse=True)
```

辞書

```
d = {"one": 1, "two": 2}
len(d) # size
```

辞書のループ

```
for i in d:
    print(d[i])

for i, v in d.items():
    print("i: " + i + " v:" + v)
```

辞書のソート

```
# keyでソートされリストが返る
sorted(d)
sorted(d, reverse=True)
# ['one', 'two']

# keyでソートされタプルが返る
sorted(d.items)
# [('one', 1), ('two', 2)]
```

タプル

リストっぽいけど、内容の変更ができない

多次元リスト

```
list = [[1,2,3], [4,5,6]]

# add
list.append([7,8,9])

# remove
del list[0]
```

リストの作成

```
num = [i * 2 for i in range(10)]
# [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
num = [[1 for i in range(3)] for j in range(4)]
# [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]]
```

関数

```
def say_hello():
    print("hello")

def calc(x, y):
    return x + y
```

関数の引数

```
# デフォルト引数
def say(greeting = "hello"):
    print(greeting)

# キーワード引数、順番を自由にできる
def say(name = "someone", greeting = "hello"):
    print(greeting = "ora", name="Hose")

# リストを渡す

def say(*list):
    for greeting in list:
        print(greeting)

say(["ora", "hello"])

# 辞書を渡す
def say(**dic):
    for name, greeting in dic.items():
        print(name + " < " + greeting)

say(Hose="ora", Ben="hello")
```

クラス

クラス名は最初は大文字

```
# 引数に自身オブジェクトのselfが必要
class Person:
    power = 100 # class変数

    # constructor
    def __init__(self, name):
        self.name = name # instance変数
        self.__age = 20 # private変数

    def say(self, hello = "hello"):
        self.__lose_power()
        print(self.name + " < " + hello)

    def get_power(self):
        return Person.power

    def __lose_power(self):
        Person.power -= 10

taro = Person("Taro")
taro.say()
print(taro.get_power())
```

