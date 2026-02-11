# Contributing Guide / 開発運用ガイド

このドキュメントは、本リポジトリにおける **開発手法・アーキテクチャ・Git 運用ルール** をまとめたものです。

> [!IMPORTANT]
> 「何を作るか」の仕様は [docs/](./docs/index.md) を参照してください。
> このドキュメントは「どう作るか」のルールを定義しています。

作業の流れに沿って上から読むことで、「何をどう進めればいいか」が分かる構成になっています。

---

## 0. 🚀 開発環境のセットアップ

本プロジェクトの開発環境セットアップについては、[README.md](./README.md) を参照してください。
依存パッケージのインストールや Git の初期設定は DevContainer によって自動化されています。

---

## 1. 🛠️ 開発手法

### 1.1 仕様書駆動開発 (Spec-Driven Development)

実装前に `docs/` 配下の仕様を確認してください。不明点は質問し、合意を得てから着手します。

### 1.2 テスト駆動開発 (TDD)

ロジック（Composables / Stores / Domain）の実装には **Vitest** によるテストを先行させてください。
**Red → Green → Refactor** のサイクルを遵守します。

### 1.3 カタログ駆動開発 (CDD)

コンポーネント作成時は **Storybook** を同時に作成し、全パターンを網羅してください。
UI のテストは Storybook + 実機確認を基本とし、テストコードは必要に応じて作成します。

---

## 2. 🏗️ アーキテクチャ・コーディング規約

### 2.1 簡略化クリーンアーキテクチャ

```
Domain層    (domain/)       … 純粋関数。外部依存なし
Store層     (stores/)       … Pinia。ユースケース・状態管理
UIロジック層 (composables/)  … Nuxt hooks。UI と Infra の橋渡し
UI層        (components/, pages/) … Vuetify, Atomic Design
Infra層     (services/)     … Firebase SDK 等の隠蔽。DI 提供
```

### 2.2 依存方向

依存の矢印は常に **「外から内（Domain）」** へ向けます。逆流は禁止です。

**許可される依存:**
- **UI層** (`pages/`, `components/`) → **UIロジック** (`composables/`) → **Infra** (`services/`)
- **`plugins/`** → **`services/`** (初期化・DI)
- **`services/`** → **`domain/`, `types/`** (ビジネスロジックや型定義の参照)

**禁止:**
- `services/` → `pages/`, `composables/` 等（UI・Nuxt 依存の逆流）
- `domain/` → `services/`（ドメイン層はインフラを知らない）
- `services/` → `services/`（必要なら Composable 層で合成する）

### 2.3 Plugin・Composable パターン

外部サービス（Firebase 等）の初期化と利用は、以下の3層で構成します。

```
Plugin (plugins/)         … サービスを生成し Nuxt に provide
  ↓
Composable (composables/) … useNuxtApp() 経由で取得する DI ラッパー
  ↓
Store / Page              … Composable を通じてサービスを利用
```

#### Plugin（初期化・注入）

- `services/` のファクトリ関数を呼び出し、生成したインスタンスを `provide` します
- 設定値は `useRuntimeConfig()` から取得します

#### Composable（DI ラッパー）

- `useNuxtApp()` から Plugin が注入したインスタンスを取得します
- 未初期化の場合はエラーを throw します（即時表明）
- 遅延初期化が必要な場合はシングルトンキャッシュを使います（例: `useMasterData()`）

#### 新規サービス追加時の手順

1. `services/` にファクトリ関数を作成
2. `plugins/` で初期化し `provide` で注入
3. `composables/` に `useXxx()` ラッパーを作成
4. Store や Page から Composable 経由で利用

### 2.4 エラーハンドリング方針

| 種類 | 方針 | 例 |
| --- | --- | --- |
| **即時表明 (Throw)** | アプリ構成上の致命的ミスは即 `throw` | 必須設定の不足、DI エラー |
| **伝播 (Propagate)** | 外部要因の失敗は上位へ投げる | 通信遮断、権限不足 |
| **安全な返却** | データなしが正常なら例外を投げない | `get...` → `undefined`、`list...` → `[]` |

### 2.5 ディレクトリ構造

```text
/
├── components/     # Atomic Design (Atoms, Molecules, Organisms)
├── composables/    # UIロジック (Nuxt の hooks/composables)
├── constants/      # 静的JSON (Assets)
├── docs/           # 仕様書
├── domain/         # 純粋ビジネスロジック
├── layouts/        # Nuxt レイアウト
├── middleware/     # Nuxt ミドルウェア (認証ガード等)
├── pages/          # Nuxt ページコンポーネント
├── plugins/        # Nuxt プラグイン
├── services/       # Firebase などインフラ連携ロジック
├── stores/         # Pinia
├── tests/          # Vitest
└── types/          # TypeScript型定義
```

### 2.6 Atomic Design

UI コンポーネントは以下のルールで分割します。

- **Atoms**: 最小単位。Vuetify のラッパー、または独自の最小パーツ。ビジネスロジックを持たない
- **Molecules**: 複数の Atoms の組み合わせ。Store には依存せず Props/Emit で完結
- **Organisms**: Molecules 等の組み合わせ。Pinia Store と接続し、具体的な機能を実装

コンポーネントを1つ作成する際は、以下のファイルをセットで作成してください。
1. `ComponentName.vue` — 実装本体
2. `ComponentName.stories.ts` — Storybook 用カタログ（全 Props パターン網羅）

### 2.7 Vuetify 抽象化

将来のフレームワーク変更に備え、主要な Vuetify コンポーネントは Atoms でラップします。
- `pages/` や `organisms/` から `v-btn` 等を**直接呼び出さない**でください
- 必ずラッパーコンポーネント（例: `BaseButton.vue`）を経由してください

### 2.8 コーディングスタイル

- Language: TypeScript (Strict Mode)
- CSS: Vuetify 3 ユーティリティクラス優先

---

## 3. 📋 Issue 運用

### 3.1 親タスク / 子タスクの考え方

本リポジトリでは Issue を以下の2種類に分けて運用します。

#### 親 Issue

- 目的・課題・やりたいことを表す Issue です
- 「なぜやるのか」「何を達成したいのか」を残します
- PR は **原則この親 Issue 単位** で作成します

> 例：
> - 新機能の追加
> - 仕様変更
> - 大きめのリファクタ
> - バグの原因調査＋修正

#### 子 Issue（task）

- 親 Issue を分解した **実行単位の作業** です
- 実装・調査・設定変更など、具体的なアクションを表します
- 親 Issue にぶら下がる形で管理します

> 例：
> - API 実装
> - マイグレーション作成
> - UI 修正
> - 設定ファイル更新

### 3.2 ラベルについて

ラベルは Issue の **役割や作業範囲を表す補助情報** として使います。

進捗管理は GitHub Project 側で行います。

#### 基本方針

- **役割ラベル（type:）は必須**：1 Issue につき必ず1つ付ける
- **作業カテゴリ（category:）は任意**：複数付けてもよい
- ラベルは Issue を探しやすくするための補助情報。迷ったら付けない

#### 役割ラベル

| ラベル | 対象 | 内容 |
| --- | --- | --- |
| `type: dev 🛠️` | 親タスク専用 | 実装・設計・改善・リファクタなど、開発に関するIssue |
| `type: idea 💡` | 親タスク専用 | アイデア・検討メモ・将来やりたいことのストック |
| `type: bug 🐞` | 親タスク専用 | 不具合・障害・想定外の挙動の修正 |
| `type: task 📋` | 子タスク専用 | 親Issueを分解した子タスク（実装・設定・調査などの作業単位） |

#### 作業カテゴリ

| ラベル | 対象 | 内容 |
| --- | --- | --- |
| `category: ui 🎨` | `components/`, `pages/` | コンポーネント・画面・スタイリングの変更 |
| `category: domain 🧠` | `domain/`, `stores/`, `composables/` | ビジネスロジック・状態管理・UIロジックの変更 |
| `category: data 📊` | `types/`, `constants/`, Firestore | 型定義・静的データ・データ設計の変更 |
| `category: infra ☁️` | `.devcontainer/`, Firebase, CI/CD | インフラ・デプロイ・PWA設定の変更 |
| `category: docs 📚` | `docs/` | 設計資料・運用ドキュメントの変更 |
| `category: refactor ♻️` | 全体 | リファクタ・構造改善・技術的負債の解消 |

### 3.3 Issue のクローズ方針

- **子 Issue**

  - 対応が完了したコミットで `Fixes #xxx` を使ってクローズする
  - 実際にクローズされるタイミングは、親 Issue の PR が merge された時

- **親 Issue**

  - 関連する子 Issue がすべて完了し、PR が merge されたタイミングでクローズする

---

## 4. 🌿 ブランチ運用

ブランチは **対応する親 Issue を起点** に作成します。

### 4.1 ブランチ名のフォーマット

```
<type>/#<issue-no>/<description>
```

- `<type>`：対応する親 Issue のラベルに合わせて `feature` / `fix` を設定
- `#<issue-no>`：対応する親 Issue 番号
- `<description>`：対応概要を Snake Case で設定

> 例：
> - feature/#123/add_pokedex_filter
> - fix/#45/fix_flag_not_updated

---

## 5. 💬 コミット運用

### 5.1 コミットメッセージのフォーマット

```
<type>: Fixes #<issue-no> <summary>
```

- `<type>`：変更の種類（下記参照）
- `Fixes #<issue-no>`：紐づく子 Issue 番号
- `<summary>`：何をしたかを1行・50文字目安で簡潔に

#### type 一覧

| type | 用途 |
| --- | --- |
| `feat` | 機能追加・変更 |
| `fix` | バグ修正 |
| `refactor` | 挙動を変えない構造改善 |
| `chore` | 開発環境・設定追加・変更 |
| `docs` | ドキュメント追加・変更 |

> 例
> - `feat: #12 種類別フィルターの追加`
> - `fix: #345 フラグが更新されない不具合の修正`


### 5.2 コミットメッセージテンプレート

本リポジトリでは、コミットメッセージ用のテンプレートを用意しています。

- テンプレート定義：`.github/COMMIT_MESSAGE_TEMPLATE.txt`
- Git 設定例：

  ```bash
  git config commit.template .github/COMMIT_MESSAGE_TEMPLATE.txt
  ```

これにより、コミット時にフォーマットを意識しやすくなります。

DevContainer を使用している場合は、開発コンテナ作成時に自動で設定されます。

---

## 6. 🔀 Pull Request 運用

### 6.1 PR の基本方針

- PR は **親 Issue 単位** で作成します
- 子 Issue の対応は、PR 内でまとめて扱います
- merge 時に子 Issue がすべて Close される状態を目指します


### 6.2 PR テンプレートについて

PR 作成時には、用意されたテンプレートを使用してください。

- テンプレート：`.github/pull_request_template.md`

動作確認項目は、運用しながら必要に応じて拡張していきます。

---

## おわりに

この運用は **固定ルールではありません** 。
開発を進める中で違和感が出た場合は、Issue を立ててルール自体を改善していきます。
