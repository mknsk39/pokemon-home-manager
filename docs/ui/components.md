# コンポーネント設計・UI規約

## 🎨 Atomic Design

UIコンポーネントは Atomic Design の思想に基づき、以下のルールで分割します。

- **Atoms**: 最小単位。Vuetifyのラップ、または独自の最小パーツ。ビジネスロジックを持たない。
- **Molecules**: 複数のAtomsの組み合わせ。特定の文脈を持つが、Storeには依存せずProps/Emitで完結。
- **Organisms**: Molecules等の組み合わせ。Pinia Storeと接続し、具体的な機能を実装。

## 🛠️ コンポーネント開発ルール

コンポーネントを1つ作成する際、以下の3ファイルをセットで作成します。
1. `ComponentName.vue`: 実装本体
2. `ComponentName.stories.ts`: Storybook用カタログ（全Propsパターン網羅）
3. `ComponentName.test.ts`: UIの振る舞いテスト（必要に応じて）

## 📦 Vuetifyの抽象化（Wrapper Atoms）

将来のフレームワーク変更に備え、主要なVuetifyコンポーネントは `Atoms` でラップします。
- **直接使用の禁止**: `pages/` や `organisms/` から `v-btn` 等を直接呼び出さない。
- **BaseXXXX.vue**: 必ずラッパーコンポーネント（例: `BaseButton.vue`）を経由する。
