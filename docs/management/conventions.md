# 開発規約・手法

## 🚀 厳守すべき4つの開発手法

1. **仕様書駆動開発 (Spec-Driven Development)**: 実装前に `docs/` を確認。不明点は質問し、合意を得る。
2. **テスト駆動開発 (Test-Driven Development)**: Composables/Stores/Domainロジック実装前にVitestを書く。
3. **カタログ駆動開発 (Catalog-Driven Development)**: コンポーネント実装と同時にStorybookを作成。
4. **簡略化クリーンアーキテクチャ**:
  - **Domain層**: 純粋関数 (`domain/`)
  - **Use Case/Store層**: Pinia (`stores/`)
  - **UI/Infra層**: Vuetify, Firebase SDK (`components/`, `pages/`)

## 📂 ディレクトリ構造

```text
/
├── components/ # Atomic Design (Atoms, Molecules, Organisms)
├── composables/ # UIロジック
├── constants/ # 静的JSON (Assets)
├── docs/ # 構造化されたドキュメント
├── domain/ # 純粋ビジネスロジック
├── stores/ # Pinia
├── tests/ # Vitest
└── types/ # TypeScript型定義
```

## 📝 コーディングスタイル
- Language: TypeScript (Strict Mode)
- CSS: Vuetify 3 ユーティリティクラス優先
