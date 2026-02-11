# ユーザープロフィール

ユーザープロフィールのライフサイクルを定義する。
データモデルは [schema.md](../data/schema.md) を参照。

## プロフィール作成・更新フロー

認証状態が変化するたびに、以下のフローが実行される。

```
Auth 状態変化（onAuthStateChanged）
  │
  ├─ ユーザーあり
  │    │
  │    ├─ Firebase User → UserProfile 変換（domain 層）
  │    ├─ Firestore の users ドキュメントを確認
  │    │    ├─ 存在しない → createdAt 付きで新規作成
  │    │    └─ 存在する   → displayName / photoURL をマージ更新
  │    └─ Store にプロフィールを保持
  │
  └─ ユーザーなし（ログアウト）
       └─ Store のプロフィールをクリア
```

## Firebase User → UserProfile 変換

Google アカウントから取得した情報を `UserProfile` 型に変換する。

| UserProfile フィールド | 変換元 (Firebase User) | 備考 |
| --- | --- | --- |
| `id` | `uid` | Firebase Auth UID |
| `displayName` | `displayName` | 未設定時は空文字 |
| `photoURL` | `photoURL` | 未設定時は空文字 |

## Firestore 保存戦略

- 書き込みは `setDoc` に `merge: true` を指定し、既存フィールドを破壊しない
- 初回作成時のみ `createdAt`（サーバータイムスタンプ）を付与
- `settings` 等の他フィールドはプロフィール更新では上書きしない
