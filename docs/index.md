# ドキュメントインデックス

本プロジェクトの各ドキュメントへのポータルです。

## 📚 ドキュメント構成

### 💼 業務知識・機能要件 (`business/`)
- [機能要件 (requirements.md)](./business/requirements.md): MVPで実現する機能、ハイブリッド・チェックシステムの詳細。

### 📊 データ構造 (`data/`)
- [データ設計 (schema.md)](./data/schema.md): Firebase (Auth/Firestore) のデータモデル定義。
- [マスターデータ・定数 (static_data.md)](./data/static_data.md): ポケモン種族・姿のJSON構造、性別・地方などの定数定義。

### 🎨 UI/UXデザイン (`ui/`)
- [画面構成 (screen_structure.md)](./ui/screen_structure.md): 一覧画面、ダッシュボード等の構成。
- [コンポーネント規約 (components.md)](./ui/components.md): Atomic Design、Vuetify抽象化、Storybook運用。

### 🛠️ プロジェクト管理 (`management/`)
- [開発規約 (conventions.md)](./management/conventions.md): TDD、クリーンアーキテクチャ、ディレクトリ構造、コーディングスタイル。
- [ロードマップ (roadmap.md)](./management/roadmap.md): 開発フェーズと進捗状況。

---

## 📝 ドキュメント管理ルール

1. **基本情報は README 参照**: プロジェクトの全体像、技術スタック、カラーパレット、セットアップ手順は [README.md](../README.md) に集約しています。
2. **情報の唯一性**: 同じ情報を複数のファイルに書かず、必要に応じてリンクを貼ってください。
3. **AIへの指示**: AIエージェントは実装前に必ず関連する `docs/` 内のファイルを読み、最新の仕様を把握してください。
