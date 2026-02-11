# AGENTS.md - AI エージェント共通ガイドライン

本プロジェクト「ポケモン HOME Manager」を AI エージェントが開発する際の共通指針です。

## 🎮 プロジェクト概要

ポケモンHOMEの全国図鑑（姿違い含む）完成を支援する PWA です。
技術スタック: **Nuxt3 / TypeScript / Vuetify3 / Firebase / Storybook**
開発環境: **Docker (DevContainer)** 内での操作が前提です。パッケージマネージャーは **pnpm** を使用します。

詳細は [README.md](./README.md) を参照してください。

## 📚 ドキュメントの読み方

本プロジェクトのドキュメントは **「何を作るか」と「どう作るか」** で分かれています。

| 種類 | 場所 | 内容 |
| --- | --- | --- |
| **仕様書**（何を作るか） | [docs/](./docs/index.md) | 機能要件、データ設計、画面構成 |
| **規約**（どう作るか） | [CONTRIBUTING.md](./CONTRIBUTING.md) | 開発手法、アーキテクチャ、Git 運用 |

### docs/ と実装ディレクトリの対応

| docs/ | 実装ディレクトリ | 内容 |
| --- | --- | --- |
| `business/` | `domain/` | ドメイン知識・機能要件 |
| `data/` | `types/`, `stores/`, `services/` | データ定義・状態管理・インフラ境界 |
| `ui/` | `components/` | UI コンポーネント (Atomic Design) |
| `flow/` | `pages/`, `composables/` | 画面遷移・ユースケース |

## 🛠️ 開発の心得

詳細は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。ここでは要点のみ記載します。

1. **仕様書駆動** — 実装前に `docs/` の仕様を確認。矛盾があれば必ず質問してください
2. **TDD** — ロジック（Domain / Stores / Composables）は Vitest でテスト先行してください
3. **CDD** — コンポーネント作成時は Storybook を同時に作成してください
4. **Vuetify 抽象化** — `components/atoms/` のラッパー (`BaseXXXX.vue`) を経由してください

## 🔄 標準ワークフロー

1. **Spec** — 対応する `docs/` に仕様を作成・更新し、ゴールを定義します
2. **Plan** — 実装方針を提示し、ユーザー承認を得ます
3. **Types** — `types/` に型定義を作成します
4. **Tests** — ロジック (Domain / Stores / Composables) の失敗テストを作成します (Red)
5. **Implement** — テストを通す実装を行います (Green)
6. **UI/Story** — コンポーネント + Storybook を作成します（テストコード不要、実機で確認）
7. **Refactor** — クリーンアップを行います
8. **Review** — 完了報告を行います
