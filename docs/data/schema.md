# データ設計 (Firestore)

動的に保存・同期されるデータモデルの定義。

## userOwnership (所持管理)

ドキュメント ID は `{userId}`。ユーザーごとに 1 ドキュメントで所持済みフォームを管理する。

| フィールド名 | 型 | 説明 |
| --- | --- | --- |
| `ownedFormIds` | number[] | 所持済みの PokemonForm.id の配列 |
| `updatedAt` | timestamp | 最終更新日時 |

- `arrayUnion` / `arrayRemove` で個別トグル（配列全体の書き換え不要）
- 1591 件全所持でも約 6.4KB（Firestore 1MB リミットの問題なし）
- `onSnapshot` によるリアルタイムリスナーで複数端末同期

> [!NOTE]
> `ownedFormIds` の各値は `pokemonForms.id` を参照する。将来的にソフト別所持管理などが必要になった場合は、`userCollection` コレクションへの移行を検討する。

## userCollection (個人の所持状況) ※将来拡張用

ドキュメント ID は `{userId}_{pokemonId}` を推奨。

| フィールド名 | 型 | 説明 |
| --- | --- | --- |
| `userId` | string | ユーザーID (FK: users.id) |
| `pokemonId` | integer | ポケモン姿ID (FK: pokemonForms.id) |
| `capturedGames` | map | 各ソフトでの所持状況 (`Map<GameID, boolean>`) |
| `sentToHome` | boolean | HOME転送済みフラグ |
| `updatedAt` | timestamp | 最終更新日時 |

> [!NOTE]
> `pokemonId` は `pokemonForms.id` を参照する。`pokemonForms.id` は表示上の連番性よりも参照の安定性を優先した ID で、並び順は `speciesId` / `formIndex` で制御（詳細は `docs/data/static_data.md` を参照）。

## users (ユーザー)

| フィールド名 | 型 | 説明 |
| --- | --- | --- |
| `id` | string | ユーザーID (Firebase Auth UID) |
| `displayName` | string | アプリ内表示名 |
| `photoURL` | string | プロフィール画像URL |
| `settings` | map | アプリ設定 (表示テーマ、デフォルトフィルタ等) |
| `createdAt` | timestamp | アカウント作成日時 |
