# ドキュメントインデックス

`docs/` には **「何を作るか」の仕様書** のみを格納する。
「どう作るか」の規約は [CONTRIBUTING.md](../CONTRIBUTING.md) を参照。

## docs/ と実装ディレクトリの対応

| docs/ | 実装ディレクトリ | 役割 |
| --- | --- | --- |
| `business/` | `domain/` | ドメイン知識・純粋ビジネスロジック |
| `data/` | `types/`, `stores/`, `services/` | データ定義・状態管理・インフラ境界 |
| `ui/` | `components/`, `layouts/` | UI コンポーネント (Atomic Design)、レイアウト |
| `flow/` | `pages/`, `composables/` | 画面遷移・ユースケース |

> 実装前に、対応する `docs/` 配下のドキュメントを確認すること。

---

## 仕様書一覧

### 業務知識・機能要件 (`business/`)
- [機能要件 (requirements.md)](./business/requirements.md): MVP で実現する機能、ハイブリッド・チェックシステムの詳細

### データ構造 (`data/`)
- [データ設計 (schema.md)](./data/schema.md): Firebase (Auth/Firestore) のデータモデル定義
- [マスターデータ・定数 (static_data.md)](./data/static_data.md): ポケモン種族・姿の JSON 構造、性別・地方などの定数定義

### UI (`ui/`)
- [レイアウト (layouts.md)](./ui/layouts.md): 共通レイアウトの構造定義、AppHeader の構成

### 画面遷移・ユースケース (`flow/`)
- [画面構成 (screen_structure.md)](./flow/screen_structure.md): 一覧画面、ダッシュボード等の構成
- [ユーザープロフィール (user_profile.md)](./flow/user_profile.md): プロフィールの作成・更新フロー、Firestore 保存戦略

---

## ドキュメント管理ルール

1. **仕様書のみ格納**: `docs/` に置くのは「何を作るか」の仕様のみ。規約・設計方針は [CONTRIBUTING.md](../CONTRIBUTING.md) に書く
2. **基本情報は README 参照**: プロジェクトの全体像・セットアップは [README.md](../README.md) に集約
3. **情報の唯一性**: 同じ情報を複数のファイルに書かず、必要に応じてリンクを貼る
