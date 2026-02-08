# データ設計 (Firestore)

動的に保存・同期されるデータモデルの定義です。

## userCollection (個人の所持状況)

ドキュメントIDは `{userId}_{pokemonId}` を推奨します。

| フィールド名 | 型 | 説明 |
| --- | --- | --- |
| `userId` | string | ユーザーID (FK: users.id) |
| `pokemonId` | integer | ポケモン姿ID (FK: pokemonForms.id) |
| `capturedGames` | map | 各ソフトでの所持状況 (`Map<GameID, boolean>`) |
| `sentToHome` | boolean | HOME転送済みフラグ |
| `updatedAt` | timestamp | 最終更新日時 |

## users (ユーザー)

| フィールド名 | 型 | 説明 |
| --- | --- | --- |
| `id` | string | ユーザーID (Firebase Auth UID) |
| `displayName` | string | アプリ内表示名 |
| `photoURL` | string | プロフィール画像URL |
| `settings` | map | アプリ設定 (表示テーマ、デフォルトフィルタ等) |
| `createdAt` | timestamp | アカウント作成日時 |
