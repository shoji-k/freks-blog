---
title: 'CPUについて'
date: '2024-09-21'
updated: ''
---

CPUをおさらいしてみます

CPU  
データの処理や演算、制御を行う

GPU  
像を描写するために必要な計算処理を行う

NPU
AIの推論処理を高速化する  

NPU搭載チップセット

- Snapdragon 8 Gen 3から
- M2 Ultraから
- Core Ultraから

CPUのアーキテクチャ  

- x86 -> インテル社のアーキテクチャ  
- x64 -> AMDのAMD64とインテルのIntel 64がある  
- ARM -> ARM社のアーキテクチャ  

Qualcomm社  

- Snapdragon モバイル向けチップセット ARM命令セット

インテル社  

- Celeron  
- Pentium  
- Core iシリーズ  
- Xeon  
- Core Ultra  

AMD社  

- Ryzen AMD64命令セット  

Apple社  

- Apple silicon (M1-M4) ARM命令セット  

ARM社

半導体製造会社へ設計図の利用を許可する段階で、契約料としてライセンスを徴収  
半導体が工場で生産・出荷されるたびに、ロイヤリティをもらう  

## チップセットの流れ

モバイル用のチップセットが電力消費が少なく作られていた  
高速に動作するようになりPCにも使われるように  
CPUにGPUも組み込まれるようになり、さらにNPUも組み込まれるようになってきた  

## まとめ

各社の関係がこんがらがるのですっきりしました

PR

<div style="width: 200px; border: 1px solid #ddd; padding: 10px; padding-bottom: 0;">
  <a href="https://amzn.to/3ZwcLro" target="_blank" style="text-decoration: none; color: black;">
    <img src="https://m.media-amazon.com/images/I/71erSKFIYKL._SY466_.jpg" alt="RISC-VとChiselで学ぶ　はじめてのCPU自作　――オープンソース命令セットによるカスタムCPU実装への第一歩" style="width: 100%; height: auto;">
    <h2 style="font-size: 16px; margin: 0;">RISC-VとChiselで学ぶ　はじめてのCPU自作　――オープンソース命令セットによるカスタムCPU実装への第一歩</h2>
  </a>
  <p style="font-size: 10px; color: #888;">このリンクは、アフィリエイトリンクです</p>
</div>
