# Private Bank Proposal Generator

這是一個專為私人銀行設計的提案產生器，使用 React, Vite 和 Tailwind CSS 構建。

## 主要功能
- **一鍵生成 PDF**: 使用 A4 標準排版，直接從瀏覽器列印成 PDF。
- **雙情境分析**: 資本增值 (Scenario A) 與 被動收入 (Scenario B) 模擬。
- **促銷計算**: 自動整合預繳利率與保費回贈。
- **CI/CD**: 推送到 `main` 分支後自動部署至 GitHub Pages。

## 開發指南

### 1. 安裝環境
確保您的環境已安裝 Node.js。
```bash
npm install
```

> [!IMPORTANT]
> 在 Windows 系統上如果遇到腳本執行限制，請使用：
> `powershell -ExecutionPolicy Bypass -Command "npm install"`

### 2. 本地開發
啟動開發伺服器：
```bash
npm run dev
```

### 3. 建置與部署
建置專案：
```bash
npm run build
```

部署至 GitHub Pages：
```bash
npm run deploy
```

## CI/CD 設定
本專案整合了 GitHub Actions。
- 當程式碼推送到 `main` 分支時，會自動觸發 `.github/workflows/deploy.yml`。
- **請務必在 GitHub Repository Settings 中設定 Secrets**: `GEMINI_API_KEY` 以確保 AI 功能正常運作。

## 技術棧
- **Frontend**: React 19, Vite, TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: GitHub Actions, GitHub Pages
