# Pokemon HOME Manager 🎮

ポケモンHOMEの「全国図鑑（姿違い含む）」の完成を支援するプログレッシブWebアプリ（PWA）。  
「どのソフトで捕まえ、いつHOMEに送ったか」を直感的に管理できる「自分専用のロトム図鑑」を目指します。

## 🎨 デザインコンセプト

- **ビジュアルテーマ**: スマホロトム / ロトム図鑑
- **カラーパレット**:
  - Header: ビビットなオレンジ (`#FF8200`)
  - Background: ダークモード (`#1A1B1E` / `#2C2E33`)
  - Accent: ロトムの電撃をイメージしたライトブルー (`#00E5FF`)

## 🛠️ 技術スタック

| カテゴリ | 技術 |
|---------|------|
| Frontend | Nuxt3, TypeScript |
| Styling | Vuetify3 |
| Component Catalog | Storybook |
| Backend/Auth | Firebase (Authentication / Firestore) |
| Infrastructure | Docker / Docker Compose |

## 📋 前提条件

- [Docker](https://www.docker.com/get-started) がインストールされていること
- [VS Code](https://code.visualstudio.com/) がインストールされていること
- [Dev Containers 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) がインストールされていること

## 🚀 セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/mknsk39/pokemon-home-manager.git
cd pokemon-home-manager
```

### 2. DevContainer で開く

1. VS Code でこのフォルダを開く
2. 右下に表示される「Reopen in Container」をクリック、または  
   `Ctrl/Cmd + Shift + P` → `Dev Containers: Reopen in Container` を実行

> [!NOTE]
> 初回起動時はコンテナのビルドに数分かかります。  
> 依存パッケージのインストールや Git の初期設定は、コンテナ起動時に自動的に実行されます。

## 💻 開発コマンド

| コマンド | 説明 |
|---------|------|
| `npm run dev` | 開発サーバーを起動（http://localhost:3000） |
| `npm run build` | プロダクションビルド |
| `npm run test` | Vitestでテストを実行 |
| `npm run storybook` | Storybookを起動 |
| `npm run lint` | ESLintでコードをチェック |

## 🔥 Firebase Emulator

ローカル開発時は Firebase Emulator を使用します。

```bash
# Firebase Emulator を起動
npm run emulator
```

## 📚 ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| [ドキュメント目次](./docs/index.md) | **全ての詳細ドキュメントへの入り口** |
| [開発規約](./docs/management/conventions.md) | 開発手法、ディレクトリ構造、コーディングスタイル |
| [開発運用ガイド](./.github/CONTRIBUTING.md) | Issue・ブランチ・コミット・PRの運用ルール |

## 🤝 コントリビュート

本プロジェクトへの貢献については [CONTRIBUTING.md](./.github/CONTRIBUTING.md) をご覧ください。

## 📄 ライセンス

<!-- TODO: ライセンスを決定後に記載 -->
