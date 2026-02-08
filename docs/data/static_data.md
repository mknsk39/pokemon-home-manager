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

## 定数定義

### genderType (性別タイプ)
- `male`, `female`, `genderless`, `both`

### region (地方・リージョン)
- `alola`, `galar`, `hisui`, `paldea`

### gameIds (ゲーム識別子)
- `swsh`, `bdsp`, `la`, `sv`, `lza`, `go`, `plp` 等（詳細はシステム仕様書から移行）
