---
title: 'Linuxで行数の多いファイルを調べてみた'
date: '2022-11-08'
updated: ''
---

行数の少ない(多い)ファイルを調べてみました

```bash
find ./src -name "*.tsx" | xargs wc -l | sort
```

src ディレクトリで拡張子が tsx のものです

結果は

```txt
     3 ./src/components/atoms/EmptyBox/index.tsx
     3 ./src/components/organisms/Notifications/NotificationDialog.tsx
     3 ./src/components/pages/Login/index.tsx
     3 ./src/components/pages/PasswordReset/index.tsx
     3 ./src/components/pages/SignUp/index.tsx
     5 ./src/components/layouts/Drawer/List/index.tsx
     8 ./src/components/atoms/UploadButton.test.tsx
    11 ./src/components/atoms/ErrorMessage.tsx
    11 ./src/components/atoms/Image.tsx
    12 ./src/components/atoms/FlagIcon.tsx
    12 ./src/components/pages/Cart.tsx
    12 ./src/components/pages/Checkout.tsx
    13 ./src/components/pages/PhotoBox.tsx
```

こんな感じにになります
