# services/ 共通境界仕様（Infra）

本ドキュメントは `services/` レイヤーにおける共通の責務、依存関係、およびエラー方針を定義します。
※実装詳細は各ソースコードを正とし、ここでは「使いかたのルール」に絞って解説します。

---

## 🎯 責務と役割

`services/` は **「インフラ連携の具体的実装」** を担う抽象化レイヤーです。

- **技術スタックの隠蔽**: Firebase SDK やローカルマスターデータ（JSON）等の詳細を閉じ込めます。
- **純粋な TypeScript**: Nuxt/Vue に依存しない「素の TS モジュール」として実装し、ポータビリティを確保します。
- **DI (Dependency Injection)**: 直接インスタンスを export せず、原則としてファクトリ関数（`create...Service`）を提供します。

---

## 🧭 依存方向の定義

依存の矢印は常に **「外から内（Domain）」** または **「上から下（Infra）」** へ向けます。



### ✅ 許可される依存
* **UI層 (`pages/`, `components/`)** → **UIロジック (`composables/`)** → **Infra (`services/`)**
* **`plugins/`** → **`services/`** (初期化・DI)
* **`services/`** → **`domain/`, `types/`** (ビジネスロジックや型定義の参照)

### ❌ 禁止・注意事項
* **`services/`** → **`pages/`, `composables/` 等**: UI・Nuxt 依存の逆流禁止。
* **`domain/`** → **`services/`**: ドメイン層はインフラを知ってはならない。
* **`services/`** → **`services/`**: サービス間での密結合は避け、必要なら Composable 層で合成する。

---

## 📦 提供サービス一覧

### 1. Firebase (Infrastructure)
Firebase の初期化とインスタンス提供。
* **詳細仕様**: [Firebase 境界仕様](./firebase.md) を参照。

### 2. MasterData (Local Static Data)
ローカルの JSON データを型安全に提供する読み取り専用サービス。

| 項目 | 内容 |
| :--- | :--- |
| **Service ファクトリ** | `createMasterDataService(): MasterDataService` |
| **推奨入口** | `useMasterData(): MasterDataService` (Composable) |
| **データソース** | `constants/master/*.json` |
| **主要 API** | `listSpecies()`, `getSpecies(id)`, `listForms(speciesId)` |

---

## ⚠️ エラー・例外ハンドリング

「どこで落とすべきか」を明確にし、デバッグ効率を最大化します。

### 1. 即時表明 (Throw)
以下の「アプリ構成上の致命的ミス」は、発生した瞬間に `throw` して開発者に知らせます。
* **初期化エラー**: 必須設定（APIキー等）が不足している場合。
* **DI エラー**: `composables/` 側で、注入されるべきサービスが存在しない場合。

### 2. 伝播 (Propagate)
以下の「外部要因による失敗」は、サービス内で握りつぶさず上位へ投げます。
* **SDK 由来のエラー**: 通信遮断、権限不足、タイムアウトなど。
* **ハンドリング**: 最終的な UI（Page 等）で `try-catch` または ErrorBoundary を用いて処理します。

### 3. 安全な返却 (Undefined/Empty)
データが存在しないこと自体が「正常な状態」である場合は、例外を投げません。
* `get...` 系関数でデータなし → `undefined` を返却。
* `list...` 系関数で該当なし → `[]` (空配列) を返却。

---

## 🔗 関連リンク
* [Firebase 境界仕様（詳細）](./firebase.md)
* [データ定義 (types/masterData.ts)](../../types/masterData.ts)
