#!/bin/sh
set -e

# パッケージインストール
if [ -f "package.json" ]; then
    echo "Installing dependencies..."
    pnpm install
fi

# コミットテンプレート設定
if [ -f ".github/COMMIT_MESSAGE_TEMPLATE.txt" ]; then
    echo "Setting up git commit template..."
    git config --global --add safe.directory /workspace
    git config --local commit.template .github/COMMIT_MESSAGE_TEMPLATE.txt || true
fi

# メインコマンド実行
exec "$@"
