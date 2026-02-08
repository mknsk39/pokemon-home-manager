# Contributing Guide / 開発運用ガイド

このドキュメントは、本リポジトリにおける **Issue・ブランチ・コミット・Pull Request の運用ルール** をまとめたものです。

> [!IMPORTANT]
> 実装手法（TDD、クリーンアーキテクチャなど）やコード品質に関する具体的なルールについては、[プロジェクト開発規約](../docs/management/conventions.md) を必ず確認してください。

作業の流れに沿って上から読むことで、「何をどう進めればいいか」が分かる構成になっています。

---

## 0. 開発環境のセットアップ

本プロジェクトの開発環境セットアップについては、[README.md](../README.md) を参照してください。
依存パッケージのインストールや Git の初期設定は DevContainer によって自動化されています。

---

## 1. Issue 運用

### 1.1 親タスク / 子タスクの考え方

本リポジトリでは Issue を以下の2種類に分けて運用します。

#### 親 Issue

- 目的・課題・やりたいことを表す Issue
- 「なぜやるのか」「何を達成したいのか」を残す
- PR は **原則この親 Issue 単位** で作成する

> 例：
> - 新機能の追加
> - 仕様変更
> - 大きめのリファクタ
> - バグの原因調査＋修正

#### 子 Issue（task）

- 親 Issue を分解した **実行単位の作業**
- 実装・調査・設定変更など、具体的なアクション
- 親 Issue にぶら下がる形で管理する

> 例：
> - API 実装
> - マイグレーション作成
> - UI 修正
> - 設定ファイル更新

### 1.2 ラベルについて

ラベルは Issue の **役割や作業範囲を表し**、Issue を探しやすくするための **補助情報** として使います。

なお、進捗管理は GitHub Project 側で行います。

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

### 1.3 Issue のクローズ方針

- **子 Issue**

  - 対応が完了したコミットで `Fixes #xxx` を使ってクローズする
  - 実際にクローズされるタイミングは、親 Issue の PR が merge された時

- **親 Issue**

  - 関連する子 Issue がすべて完了し、PR が merge されたタイミングでクローズする

---

## 2. ブランチ運用

ブランチは、 **対応する親 Issue を起点** に作成します。

### 2.1 ブランチ名のフォーマット

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

## 3. コミット運用

### 3.1 コミットメッセージのフォーマット

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


### 3.2 コミットメッセージテンプレート

本リポジトリでは、コミットメッセージ用のテンプレートを用意しています。

- テンプレート定義：`.github/COMMIT_MESSAGE_TEMPLATE.txt`
- Git 設定例：

  ```bash
  git config commit.template .github/COMMIT_MESSAGE_TEMPLATE.txt
  ```

これにより、コミット時にフォーマットを意識しやすくなります。

DevContainer を使用している場合は、開発コンテナ作成時に自動で設定されます。

---

## 4. Pull Request 運用

### 4.1 PR の基本方針

- PR は **親 Issue 単位** で作成する
- 子 Issue の対応は、PR 内でまとめて扱う
- merge 時に子 Issue がすべて Close される状態を目指す


### 4.2 PR テンプレートについて

PR 作成時には、用意されたテンプレートを使用します。

- テンプレート：`.github/pull_request_template.md`

動作確認項目は、運用しながら必要に応じて拡張していきます。

---

## おわりに

この運用は **固定ルールではありません** 。
開発を進める中で違和感が出た場合は、Issue を立ててルール自体を改善していきます。
