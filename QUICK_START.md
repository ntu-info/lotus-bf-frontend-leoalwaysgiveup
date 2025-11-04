# 快速入門 - GitHub Pages 部署

## 🚀 最簡單的部署方式（推薦）

### 步驟 1：準備倉庫
```bash
cd /Users/l.d/Downloads/lotus-bf-frontend-leoalwaysgiveup-main

# 初始化 git（如果需要）
git init

# 添加遠端倉庫（替換成你從 GitHub Classroom 接受作業後獲得的倉庫 URL）
git remote add origin https://github.com/<你的用戶名>/<倉庫名>.git

# 添加所有文件
git add .

# 提交
git commit -m "Ready for GitHub Pages deployment"

# 推送
git push -u origin main
```

### 步驟 2：啟用 GitHub Pages
1. 前往你的 GitHub 倉庫頁面
2. 點擊 **Settings** (設定)
3. 左側選單選擇 **Pages**
4. 在 **Source** 選擇 **GitHub Actions**
5. 完成！🎉

### 步驟 3：等待部署
- 前往倉庫的 **Actions** 標籤
- 查看部署進度（通常需要 2-3 分鐘）
- 部署完成後會顯示網站 URL

## ⚙️ 重要配置調整

### 如果你的倉庫名稱不是 `<username>.github.io`

編輯 `vite.config.js`，修改第 9 行：

```javascript
base: process.env.NODE_ENV === 'production' ? '/<倉庫名稱>/' : '/',
```

例如，如果倉庫名稱是 `lotus-bf-frontend-leoalwaysgiveup`：
```javascript
base: process.env.NODE_ENV === 'production' ? '/lotus-bf-frontend-leoalwaysgiveup/' : '/',
```

然後重新推送：
```bash
git add vite.config.js
git commit -m "Update base path"
git push
```

## 📋 已完成的配置

✅ 已創建 `.github/workflows/deploy.yml` - GitHub Actions 自動部署設定
✅ 已更新 `vite.config.js` - 添加部署配置註解
✅ API 設定正確 (`src/api.js`: `https://mil.psy.ntu.edu.tw:5000`)
✅ 已移除舊版 proxy 配置

## 🔧 本地開發與測試

```bash
# 安裝依賴
npm install

# 本地開發
npm run dev
# 訪問 http://localhost:5173

# 本地建置測試
npm run build
npm run preview
```

## 📚 詳細說明

查看 `DEPLOYMENT_GUIDE.md` 獲取完整的部署指南，包括：
- 手動部署方法
- 故障排除
- 詳細配置說明

## 需要幫助？

常見問題：
1. **404 錯誤**：檢查 `vite.config.js` 中的 `base` 設定
2. **部署失敗**：查看 GitHub Actions 日誌
3. **API 錯誤**：確認 `src/api.js` 中的 API_BASE 設定

