# CLAUDE.md

共通ガイドラインは [AGENTS.md](./AGENTS.md) を参照してください。

## 💻 開発環境

ホスト側から Claude Code を実行するため、コンテナ内コマンドは `docker compose exec` 経由で実行してください。

## 🔧 コマンド

- `docker compose exec app pnpm dev` - 開発サーバー起動
- `docker compose exec app pnpm build` - ビルド（TypeScript 型チェック含む）
- `docker compose exec app pnpm test` - Vitest テスト実行
- `docker compose exec app pnpm lint` - ESLint チェック
- `docker compose exec app pnpm storybook` - Storybook 起動
- `docker compose exec app pnpm emulator` - Firebase Emulator 起動

### 実装完了時の確認コマンド

実装が完了したら、以下を順に実行して品質を担保してください。

1. `docker compose exec app pnpm lint` - コードスタイルチェック
2. `docker compose exec app pnpm test` - テスト実行
3. `docker compose exec app pnpm build` - 型チェック + ビルド確認

> **注意**: ESLint は型の互換性エラーを検出できません（type-aware ルール未設定のため）。
> `pnpm build` を実行することで TypeScript の型エラーを確実に検出できます。

---

## 🛠️ Skill 自動化の方針

作業を進める中で、**繰り返し発生する作業パターン**を発見した場合、Skill化を検討してください。

### Skill化すべきタスクの特徴

- 同じ手順を3回以上繰り返している
- 毎回同じドキュメントを参照している
- 定型的なチェックリストがある
- 特定のファイル構造に従っている

### Skill化の判断基準

**Skill化すべき例**
- Atomic Design に従った新規コンポーネント作成
- Pinia Store の標準的な作成パターン
- Firebase サービス層の追加手順
- テストコードの作成パターン

**Skill化すべきでない例**
- 一度きりの特殊な実装
- プロジェクト固有すぎる内容
- 頻繁に変更される手順

### Skill作成の手順

Skill化が適切だと判断した場合：

1. **ユーザーに提案**
   ```
   このタスクは今後も繰り返し発生しそうです。
   Skill化することで、今後の作業を効率化できます。

   【提案する Skill】
   - 名前: atomic-component-creation
   - 対象: Atomic Design に従った新規コンポーネント作成
   - 含める内容: ファイル構成、命名規則、Storybook 作成手順

   Skill化してもよろしいですか？
   ```

2. **Skill ファイル作成**
   - 承認されたら `/mnt/skills/user/<skill-name>/SKILL.md` を作成
   - 既存の `skill-creator` Skill を参照

3. **次回から活用**
   - 同様のタスクが発生した際、該当 Skill を読み込んで作業

---

## 🔌 Context7 MCP の活用

Context7 MCP が利用可能な場合、ライブラリやフレームワークのドキュメント参照には WebSearch ではなく **Context7 MCP を優先的に使用**してください。

### 自動で使用すべき場面

ユーザーが「use context7」と明示しなくても、Context7 MCP が利用可能であれば以下の場面で自動的に活用すること：

- **Nuxt 3** / **Vue 3** / **Vuetify 3** の API・設定・コンポーネントの仕様確認
- **Firebase**（Auth, Firestore）の SDK メソッドや設定方法の確認
- **Pinia** のストア定義・パターンの確認
- **Vitest** のテスト API・マッチャーの確認
- **Storybook** の設定・アドオンの使い方確認
- エラーの原因がライブラリの仕様に関係していそうな時

### Context7 MCP が利用できない場合

プロジェクトの `.mcp.json` に Context7 の設定が含まれているため、通常は自動で利用可能です。
もし Context7 MCP が利用できない場合は、以下のコマンドでセットアップしてください：

```bash
claude mcp add --scope project context7 -- npx -y @upstash/context7-mcp@latest
```

### フォールバック

Context7 で情報が見つからない場合は、WebSearch を使用してください。
