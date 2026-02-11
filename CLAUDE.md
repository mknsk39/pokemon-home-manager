# CLAUDE.md

共通ガイドラインは [AGENTS.md](./AGENTS.md) を参照してください。

## 💻 開発環境

ホスト側から Claude Code を実行するため、コンテナ内コマンドは `docker compose exec` 経由で実行してください。

## 🔧 コマンド

- `docker compose exec app pnpm dev` - 開発サーバー起動
- `docker compose exec app pnpm test` - Vitest テスト実行
- `docker compose exec app pnpm lint` - ESLint チェック
- `docker compose exec app pnpm storybook` - Storybook 起動
- `docker compose exec app pnpm emulator` - Firebase Emulator 起動
