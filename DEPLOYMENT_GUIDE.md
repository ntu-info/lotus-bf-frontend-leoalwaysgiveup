# GitHub Pages 部署指南

本指南將協助你將 Lotus-BF 前端應用部署到 GitHub Pages。

## 前置作業

### 1. 接受作業
前往 [https://classroom.github.com/a/DZepDCgF](https://classroom.github.com/a/DZepDCgF) 接受作業。

### 2. 安裝 Node.js (如果尚未安裝)
根據 README.md 的建議，使用 nvm 安裝 Node.js LTS 版本：

```bash
# 安裝 nvm (如果尚未安裝)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 重新載入 shell 配置
source ~/.zshrc  # 或 source ~/.bashrc

# 安裝 Node.js LTS
nvm install --lts

# 確認安裝成功
node --version
npm --version
```

## 方法一：使用 GitHub Actions 自動部署 (推薦)

這是最簡單的方法，每次推送代碼時會自動建置和部署。

### 步驟：

#### 1. 推送代碼到 GitHub
```bash
cd /Users/l.d/Downloads/lotus-bf-frontend-leoalwaysgiveup-main

# 初始化 git（如果還沒有）
git init

# 添加遠端倉庫（替換成你的倉庫 URL）
git remote add origin https://github.com/<你的用戶名>/<你的倉庫名>.git

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit with GitHub Actions deployment"

# 推送到 GitHub
git push -u origin main
```

#### 2. 在 GitHub 上啟用 GitHub Pages

1. 前往你的 GitHub 倉庫
2. 點擊 **Settings** (設定)
3. 在左側選單中點擊 **Pages**
4. 在 **Source** (來源) 部分，選擇 **GitHub Actions**
5. 儲存設定

#### 3. 等待部署完成

- GitHub Actions 會自動執行建置和部署
- 前往倉庫的 **Actions** 標籤查看部署進度
- 部署完成後，你的網站將可在以下網址訪問：
  - 如果倉庫名稱是 `<你的用戶名>.github.io`：`https://<你的用戶名>.github.io/`
  - 其他倉庫名稱：`https://<你的用戶名>.github.io/<倉庫名稱>/`

#### 4. 調整 base 路徑（如果需要）

如果你的倉庫名稱**不是** `<你的用戶名>.github.io`，需要修改 `vite.config.js`：

```javascript
export default defineConfig({
  base: '/<你的倉庫名稱>/',  // 例如：'/lotus-bf-frontend/'
  // ... 其他配置
})
```

然後重新推送：
```bash
git add vite.config.js
git commit -m "Update base path for GitHub Pages"
git push
```

## 方法二：手動建置並上傳 (傳統方法)

如果你想手動控制部署過程：

### 步驟：

#### 1. 本地建置
```bash
cd /Users/l.d/Downloads/lotus-bf-frontend-leoalwaysgiveup-main

# 清理並重新安裝依賴
rm -rf node_modules package-lock.json
npm install

# 建置專案
npm run build
```

這會在專案根目錄下生成 `./dist` 資料夾，裡面包含所有需要部署的檔案。

#### 2. 準備個人 GitHub Pages 倉庫

如果還沒有個人 GitHub Pages：

1. 在 GitHub 上創建一個新倉庫，命名為：`<你的用戶名>.github.io`
   例如：如果你的用戶名是 `john`，倉庫名就是 `john.github.io`

2. 這個倉庫會自動啟用 GitHub Pages

#### 3. 上傳 dist 資料夾內容

```bash
# 進入 dist 資料夾
cd dist

# 初始化 git
git init

# 添加所有檔案
git add .

# 提交
git commit -m "Deploy lotus-bf frontend"

# 添加遠端倉庫（替換成你的倉庫 URL）
git remote add origin https://github.com/<你的用戶名>/<你的用戶名>.github.io.git

# 推送到 GitHub
git push -f origin main
```

#### 4. 訪問你的網站

幾分鐘後，你的網站將可在 `https://<你的用戶名>.github.io/` 訪問。

## 故障排除

### 問題 1：頁面顯示 404 或資源載入失敗

**原因**：`base` 路徑設定不正確

**解決方法**：
- 如果部署到 `<username>.github.io`，設定 `base: '/'`
- 如果部署到 `<username>.github.io/<repo-name>`，設定 `base: '/<repo-name>/'`

### 問題 2：API 請求失敗

**原因**：API endpoint 設定在 `src/api.js`

**檢查**：確認 `src/api.js` 中的 `API_BASE` 設定正確：
```javascript
export const API_BASE = 'https://mil.psy.ntu.edu.tw:5000';
```

### 問題 3：GitHub Actions 部署失敗

**解決方法**：
1. 前往倉庫的 **Actions** 標籤
2. 查看失敗的工作流程日誌
3. 確認 GitHub Pages 在 Settings > Pages 中已啟用
4. 確認 Actions 在 Settings > Actions > General 中已啟用

## 本地開發

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 訪問 http://localhost:5173
```

## 參考範例

- [Web App] https://ntu-info.github.io/
- [App Repo] https://github.com/ntu-info/ntu-info.github.io

## 重要提醒

1. ✅ 新版本已移除 `vite.config.js` 中的 `proxy` 配置，改用直接 API URL
2. ✅ API endpoint 設定在 `src/api.js`：`https://mil.psy.ntu.edu.tw:5000`
3. ✅ 建置命令：`npm run build`
4. ✅ 輸出目錄：`./dist`
5. ✅ 支援自動部署（透過 GitHub Actions）和手動部署

## 額外資源

- [Vite 部署文檔](https://vitejs.dev/guide/static-deploy.html)
- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [GitHub Actions 文檔](https://docs.github.com/en/actions)

