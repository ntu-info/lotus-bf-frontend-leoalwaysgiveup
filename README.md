# LoTUS-BF 🧠

**Location-or-Term Unified Search for Brain Functions**

一個現代化的神經科學研究查詢系統，專為腦功能研究設計的互動式網頁應用程式。

🌐 **線上展示：** [https://ntu-info.github.io/lotus-bf-frontend-leoalwaysgiveup/](https://ntu-info.github.io/lotus-bf-frontend-leoalwaysgiveup/)

---

## ✨ 功能特色

### 🔍 多維度搜尋
- **術語搜尋**：瀏覽並搜尋神經科學相關術語
- **空間搜尋**：使用 MNI 座標查詢特定腦區
- **布林運算**：支援 AND、OR、NOT 等邏輯運算子建構複雜查詢

### 📊 研究文獻檢索
- 即時搜尋相關神經科學研究論文
- 顯示完整論文資訊（標題、作者、年份、期刊）
- 支援表格排序與分頁瀏覽

### 🧠 3D 腦部視覺化
- **三視圖顯示**：冠狀面（Coronal）、矢狀面（Sagittal）、軸向面（Axial）
- **熱圖疊加**：視覺化查詢相關的腦區活動
- **互動操作**：
  - 點擊切片移動十字線
  - 輸入 MNI 座標精確定位
  - 調整閾值、平滑參數、透明度等

### 🎨 現代化介面設計
- 響應式三欄布局
- 可調整大小的面板
- 流暢的動畫效果
- 漸層色彩配置

---

## 🚀 快速開始

### 環境需求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安裝步驟

```bash
# 克隆倉庫
git clone https://github.com/ntu-info/lotus-bf-frontend-leoalwaysgiveup.git

# 進入專案目錄
cd lotus-bf-frontend-leoalwaysgiveup

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

開發伺服器將運行在 `http://localhost:5173`

### 建置部署

```bash
# 建置生產版本
npm run build

# 預覽建置結果
npm run preview
```

建置後的檔案將輸出至 `./dist` 資料夾。

---

## 📚 使用說明

### 1. 搜尋術語
在左側 **Terms** 面板中：
- 瀏覽完整術語列表
- 使用搜尋框過濾術語
- 點擊任一術語將其加入查詢

### 2. 建構查詢
在中間 **Query Builder** 面板中：
- 直接輸入查詢字串
- 使用運算子按鈕：`AND`、`OR`、`NOT`、`()`
- 支援 MNI 座標格式：`[-22,-4,18]`
- 範例查詢：
  ```
  emotion AND memory
  [-22,-4,18] NOT emotion
  (working OR spatial) AND memory
  ```

### 3. 查看結果
**Studies 面板**：
- 顯示符合查詢的研究論文
- 點擊表頭排序
- 使用分頁按鈕瀏覽更多結果

**NIfTI Viewer 面板**：
- 查看查詢相關的腦部活動熱圖
- 點擊切片調整觀察位置
- 使用參數控制項微調視覺化效果

---

## 🛠️ 技術架構

### 前端技術棧
- **框架**：React 19
- **建置工具**：Vite 7
- **醫學影像**：@niivue/niivue
- **腦影像處理**：nifti-reader-js
- **壓縮演算法**：pako

### 後端 API
- **Base URL**：`https://mil.psy.ntu.edu.tw:5000`
- **端點**：
  - `GET /terms` - 獲取術語列表
  - `GET /query/:query/studies` - 查詢研究論文
  - `GET /query/:query/nii` - 生成腦部活動地圖（NIfTI 格式）

### 部署方式
- **平台**：GitHub Pages
- **CI/CD**：GitHub Actions
- **自動化**：推送至 main 分支自動觸發建置與部署

---

## 📁 專案結構

```
lotus-bf-frontend/
├── .github/
│   └── workflows/
│       └── static.yml          # GitHub Actions 部署配置
├── public/
│   └── static/
│       └── mni_2mm.nii.gz      # MNI152 2mm 模板
├── src/
│   ├── components/
│   │   ├── Terms.jsx           # 術語搜尋元件
│   │   ├── QueryBuilder.jsx    # 查詢建構器
│   │   ├── Studies.jsx         # 研究結果列表
│   │   └── NiiViewer.jsx       # 腦影像查看器
│   ├── hooks/
│   │   └── useUrlQueryState.js # URL 狀態管理
│   ├── api.js                  # API 配置
│   ├── App.jsx                 # 主應用元件
│   ├── App.css                 # 全域樣式
│   └── main.jsx                # 應用入口
├── index.html
├── package.json
├── vite.config.js              # Vite 配置
└── README.md
```

---

## 🎓 開發資訊

### 課程資訊
- **課程**：心理資訊學 (Psychoinformatics)
- **學期**：114-1
- **作業**：Lotus-BF Frontend Deployment

### 技術要點
- ✅ 無使用 Vite proxy（直接連接 API）
- ✅ 正確設定 GitHub Pages base 路徑
- ✅ 自動化建置與部署流程
- ✅ 響應式設計支援各種螢幕尺寸

---

## 📝 開發筆記

### 本地開發
```bash
npm run dev
```
開發環境使用 `base: '/'`

### 生產環境
```bash
npm run build
```
生產環境自動設定 `base: '/lotus-bf-frontend-leoalwaysgiveup/'`




## 📄 授權

本專案為課程作業，僅供學術用途。

---



<div align="center">

**🧠 Made with 💜 for Neuroscience Research**

*探索大腦，理解心智*

</div>
