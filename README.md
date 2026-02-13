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
| `pnpm dev` | 開発サーバーを起動（http://localhost:3000） |
| `pnpm build` | プロダクションビルド |
| `pnpm test` | Vitestでテストを実行 |
| `pnpm storybook` | Storybookを起動 |
| `pnpm lint` | ESLintでコードをチェック |
| `pnpm emulator` | Firebase Emulator Auth/Firestore を起動 |

## 🔥 Firebase Emulator

ローカル開発時は Firebase Emulator を使用します。

```bash
# Firebase Emulator を起動
pnpm emulator
```

### Firebase 設定

`.env.example` をコピーして `.env` を作成し、Firebase の接続情報を設定してください。
詳細は `.env.example` 内のコメントを参照してください。

## 🚀 デプロイ

Firebase Hosting へのデプロイ手順です。

### 前提条件

Firebase Console で以下を事前に設定してください。

1. **Authentication** → **Sign-in method** で **Google** プロバイダを有効化
2. **Firestore Database** を作成済みであること

### デプロイ手順

```bash
# 1. Firebase にログイン（初回 or セッション切れ時）
pnpm firebase login --no-localhost

# 2. プロダクションビルド
pnpm build

# 3. Hosting と Firestore ルールをデプロイ
pnpm firebase deploy
```

> [!NOTE]
> ビルド時は `NODE_ENV=production` が自動設定されるため、`USE_FIREBASE_EMULATOR=true` が `.env` に設定されていてもエミュレーターには接続しません。

> [!TIP]
> Docker 環境から実行する場合は `docker compose exec app` を先頭に付けてください。
> Firebase の認証情報は named volume で永続化されているため、コンテナの再ビルドでログインが切れることはありません。

## 📚 ドキュメント

| ドキュメント | 内容 |
|-------------|------|
| [仕様書](./docs/index.md) | **機能要件・データ設計・画面構成** |
| [開発運用ガイド](./CONTRIBUTING.md) | 開発手法・アーキテクチャ・Git 運用ルール |

## 🤝 コントリビュート

本プロジェクトへの貢献については [CONTRIBUTING.md](./CONTRIBUTING.md) をご覧ください。

## 📄 ライセンス

<!-- TODO: ライセンスを決定後に記載 -->
