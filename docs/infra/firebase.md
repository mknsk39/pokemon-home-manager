# Firebase 境界仕様（Infra）

このドキュメントは、Firebase SDK の初期化・設定・Nuxt への注入プロセスを定義する境界仕様書です。

## 1. 構成図（データフロー）

設定値が環境変数から UI へ届くまでの依存関係フローです。

1. **`.env`** (環境変数)
2. **`nuxt.config.ts`** (RuntimeConfig への流し込み)
3. **`plugins/firebase.ts`** (DI 実行)
4. **`services/firebase.ts`** (SDK 初期化ロジック)
5. **`composables/useFirebase.ts`** (利用口の提供)

## 2. 環境設定（Configuration）

### ✅ 接続設定 (`runtimeConfig.public.firebase`)
必須項目が欠けている場合、**アプリ起動時にエラー (throw)** となります。

| カテゴリ | キー名 | 必須 | 備考 |
| :--- | :--- | :---: | :--- |
| **Basic** | `apiKey`, `authDomain`, `projectId` | 🔥 | Firebase Console から取得 |
| **App** | `storageBucket`, `messagingSenderId`, `appId` | 🔥 | 同上 |
| **Optional** | `measurementId` | - | GA(分析)用 |
| **Debug** | `emulator` | - | `useEmulator: true` の時のみ有効 |

### 🧪 エミュレータ設定
`.env` で `USE_FIREBASE_EMULATOR=true` の場合に有効化されます。

* **Host:** `FIREBASE_EMULATOR_HOST` (Default: `127.0.0.1`)
* **Ports:** `firebase.json` の設定を正とします。
    * Auth: `9099` / Firestore: `8080`

## 3. 公開 API ＆ インターフェース

開発時は原則として **Composables** を経由してアクセスしてください。

### 📦 利用可能なエンドポイント
| 公開場所 | 利用可能な関数・キー | 用途 |
| :--- | :--- | :--- |
| **Composables** | `useFirebase()`, `useFirebaseAuth()`, `useFirebaseFirestore()` | **推奨。** UI や UseCase からの利用 |
| **Nuxt Plugin** | `$firebase`, `$firebaseAuth`, `$firebaseFirestore` | `useNuxtApp()` 経由でのアクセス用 |
| **Service** | `createFirebaseServices(config)` | Plugin 内での初期化専用 |

## 4. 初期化フローと役割（DI）

### 1️⃣ `services/firebase.ts`
Firebase SDK の生インスタンスを生成する純粋なロジック層。
- `createFirebaseServices(config)` を実行。
- エミュレータ接続（`connectAuthEmulator` 等）もここで完結。

### 2️⃣ `plugins/firebase.ts`
生成したインスタンスを Nuxt コンテキストに `provide` する。
- RuntimeConfig を読み取り、Service へ渡す。

### 3️⃣ `composables/useFirebase.ts`
`inject` されたインスタンスを安全に取得するためのラッパー。
- コンテキスト外（Plugin 未初期化）での呼び出しを防止。

## 5. エラーハンドリング方針

不適切な設定による「原因不明のバグ」を最小化するため、フェイルファースト（早期失敗）を徹底します。

* **初期化エラー**:
    `createFirebaseServices()` 実行時、必須 Config が欠落していれば即座に **throw**。
* **注入エラー**:
    `useFirebase*()` 呼び出し時、Plugin による注入が確認できない場合は **throw**。
    （Nuxt のライフサイクル外での呼び出しや、プラグイン設定ミスの早期検知）
* **SDK エラー**:
    通信エラーや権限不足（Firebase SDK 由来）は、原則として上位（呼び出し元）へ伝播させ、UI 側でハンドリングします。
