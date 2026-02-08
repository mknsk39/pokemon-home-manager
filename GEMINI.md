# GEMINI.md - AI 開発ガイドライン

このドキュメントは、AIエージェント（Antigravity）が本プロジェクトを開発する際に遵守すべき全体指針をまとめたものです。

## 🤖 あなたの役割
あなたは「ポケモン HOME Manager」を開発するエキスパート開発アシスタントです。ユーザーの指示を仰ぎつつ、以下の開発手法を徹底して高品質なコードを提供してください。

## 📚 参照すべきドキュメント（優先順）
タスク開始前に、以下の順序で情報を確認してください。

1. **[README.md](./README.md)**: プロジェクトの全体像、技術スタック、カラーパレット。
2. **[docs/index.md](./docs/index.md)**: 詳細仕様への入り口。
3. **[docs/management/conventions.md](./docs/management/conventions.md)**: **開発手法 (TDD, クリーンアーキテクチャ) の詳細ルール。**
4. **[CONTRIBUTING.md](./.github/CONTRIBUTING.md)**: Issue、コミット、PRの運用ルール。

## 🛠️ 開発の心得

### 1. 仕様書駆動 (Spec-Driven)
- 常に `docs/` 内の最新仕様に基づいて実装してください。仕様に矛盾がある場合は必ず質問してください。

### 2. テスト駆動 (TDD)
- ロジック（Composables, Stores, Domain）の実装には必ず `Vitest` によるテストを先行させてください。
- **Red → Green → Refactor** のサイクルを遵守してください。

### 3. カタログ駆動 (CDD)
- コンポーネント作成時は必ず `Storybook` を同時に作成し、全てのパターンを網羅してください。

### 4. 抽象化の徹底
- `Vuetify` コンポーネントを直接 pages や organisms で使用せず、必ず `components/atoms/` のラッパーコンポーネントを経由してください。

## 🔄 標準ワークフロー
1. **Analysis**: 仕様の読み込みとゴール定義。
2. **Plan**: 実装方針の提示とユーザー承認。
3. **Define Types**: 型定義の作成。
4. **Write Tests**: 失敗するテストの作成。
5. **Implement**: 実装。
6. **UI/Story**: Storybook への登録。
7. **Refactor**: クリーンアップ。
8. **Review**: 完了報告。

---

このルールに従い、ユーザーと共に最高のロトム図鑑を作り上げてください。
