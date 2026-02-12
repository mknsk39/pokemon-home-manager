# レイアウト

画面の共通構造を定義する。
各レイアウトの表示条件や振る舞いは [screen_structure.md](../flow/screen_structure.md) を参照。

## default レイアウト

全画面に適用される標準レイアウト。

```
┌──────────────────────────────┐
│ AppHeader (sticky)           │
│  [Brand]            [User]   │
├──────────────────────────────┤
│                              │
│  <slot /> (ページコンテンツ)  │
│                              │
└──────────────────────────────┘
```

### 構成要素

| 領域 | コンポーネント | 内容 |
| --- | --- | --- |
| ヘッダー | `AppHeader` (Organism) | ブランド表示 + ユーザーメニュー |
| メイン | `<slot />` | 各ページのコンテンツ |

### AppHeader

- ヘッダー高さ: 56px、sticky 配置
- 左側: ポケボールアイコン + アプリ名
- 右側: ユーザーメニュー（認証済みの場合のみ表示）
  - アカウント名ボタンをクリックでメニュー展開
  - メニュー内にアバター、表示名、UID、ログアウトボタン
  - アバター未設定時はフォールバックアイコン

---

## 共通 UI パーツ

### スクロールトップボタン

長いリスト画面で使用する「ページ先頭に戻る」FAB ボタン。

- Composable: `useScrollToTop` (`composables/useScrollToTop.ts`)
- 表示条件: `window.scrollY` が 200px 以上
- 配置: 画面右下固定 (`position: fixed`, `bottom: 24px`, `right: 24px`)
- 動作: `window.scrollTo({ top: 0, behavior: 'smooth' })`
- トランジション: opacity によるフェードイン/アウト (0.3s)
- 使用箇所: `PokemonListView` (Organism)

### PokemonCard (Molecule)

ポケモン1体分の情報を表示するカードコンポーネント。

- Props: `dexNo`（図鑑No）、`name`（ポケモン名）、`formName?`（姿名）
- 構成: `BaseCard` + `BaseIcon` + `BaseTooltip`
- 姿名がある場合はサブテキストとして1行表示（テキスト省略 + ツールチップ）
- 姿名が無い場合もサブテキスト領域の高さを確保し、カード高さを統一
- 使用箇所: `PokemonListView` (Organism)
