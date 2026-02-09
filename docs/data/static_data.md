# マスターデータ・定数定義

アプリ内静的JSON（Assets）として保持するデータ構造と定数定義です。

## ポケモンデータ構造

### pokemonSpecies (ポケモン種族)

| フィールド名 | 型 | 説明 |
| --- | --- | --- |
| `id` | integer | ポケモンID (主キー) |
| `dexNo` | integer | 全国図鑑番号 |
| `name` | string | 日本語名 |

### pokemonForms (ポケモンの姿)

| フィールド名 | 型 | 説明 |
| --- | --- | --- |
| `id` | integer | 姿ID (主キー) |
| `speciesId` | integer | 種族ID (FK: pokemonSpecies.id) |
| `formIndex` | integer | 姿番号 |
| `formName` | string | 姿名 |
| `imageUrl` | string | 画像URL |
| `generation` | integer | 登場世代 |
| `isDefault` | boolean | デフォルトの姿フラグ |
| `isMega` | boolean | メガシンカフラグ |
| `genderType` | string | 性別タイプ (`male` / `female` / `genderless` / `both`) |
| `region` | string? | リージョン（`alola` / `galar` / `hisui` / `paldea`）。該当なしは未設定 |
| `isGigantamax` | boolean | キョダイマックスフラグ |
| `isPrimal` | boolean | ゲンシカイキフラグ |

## ID設計（マスターデータ）

本プロジェクトでは、永続化（Firestoreの `pokemonId`）や参照の安定性を優先し、**表示上の連番性よりも「不変で一意なID」**を重視します。

- `pokemonSpecies.id` は現時点では `dexNo` と同値（冗長）ですが、将来 `dexNo`（表示用）と内部ID（不変）を分離したくなった場合に備えて残しています。
- `pokemonForms.id` は **種族ごとの連番である必要はありません**。後からフォームが増減/並び替えされても既存IDがズレないよう、`speciesId` と `formIndex` から決定できる「安定ID」を採用しています。
- `pokemonForms` の並び順は、UI/検索では `speciesId` と `formIndex` を用いて制御します（`id` の連続性には依存しません）。

## 定数定義

### genderType (性別タイプ)
- `male`, `female`, `genderless`, `both`

### region (地方・リージョン)
- `alola`, `galar`, `hisui`, `paldea`

### gameIds (ゲーム識別子)
- `swsh`, `bdsp`, `la`, `sv`, `lza`, `go`, `plp` 等（詳細はシステム仕様書から移行）
