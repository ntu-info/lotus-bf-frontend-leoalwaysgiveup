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

### 🎨 專業設計系統
- **完整的字體系統**：優化長時間閱讀體驗
- **統一的間距系統**：基於 4px 網格，創造呼吸感
- **流暢的互動回饋**：Hover、Focus、Loading 狀態
- **響應式三欄布局**：可調整大小的面板
- **漸層與動畫**：現代化視覺效果
- **無障礙支援**：符合 WCAG AA 標準

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

**Brain Viewer 面板**：
- 查看查詢相關的腦部活動熱圖（三視圖）
- 點擊切片調整觀察位置
- **控制參數**：
  - **Threshold Mode**：選擇閾值類型（Percentile/Value）
  - **Percentile**：設定百分位數（如 95 = 顯示前 5% 最強激活）
  - **MNI Coordinates**：精確輸入 X/Y/Z 座標
  - **Opacity**：調整熱圖透明度（40% = 半透明）
  - **FWHM**：高斯平滑參數（12mm = 標準平滑）

---

## 🛠️ 技術架構

### 前端技術棧
- **框架**：React 19
- **建置工具**：Vite 7
- **醫學影像**：@niivue/niivue
- **腦影像處理**：nifti-reader-js
- **壓縮演算法**：pako

### 設計系統
- **字體系統**：系統字體堆疊，優化中英文顯示
- **排版**：基於 Major Third (1.250) 比例的字體階層
- **間距**：4px 基準單位的統一間距系統
- **互動**：150ms/250ms/400ms 三級過渡動畫
- **色彩**：符合 WCAG AA 的對比度標準
- **詳細文檔**：參見 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md)

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
│       └── static.yml              # GitHub Actions 部署配置
├── public/
│   └── static/
│       └── mni_2mm.nii.gz          # MNI152 2mm 模板
├── src/
│   ├── components/
│   │   ├── ui/                     # 可重用 UI 組件系統
│   │   │   ├── Button.jsx          # 統一按鈕組件
│   │   │   ├── Button.css
│   │   │   ├── Card.jsx            # 卡片容器
│   │   │   ├── Card.css
│   │   │   ├── Input.jsx           # 輸入框組件
│   │   │   ├── Input.css
│   │   │   ├── SectionTitle.jsx    # 區塊標題
│   │   │   ├── SectionTitle.css
│   │   │   └── index.js
│   │   ├── Terms.jsx               # 術語搜尋元件
│   │   ├── Terms.css
│   │   ├── QueryBuilder.jsx        # 查詢建構器
│   │   ├── QueryBuilder.css
│   │   ├── Studies.jsx             # 研究結果列表
│   │   ├── Studies.css
│   │   ├── NiiViewer.jsx           # 腦影像查看器
│   │   └── NiiViewer.css
│   ├── hooks/
│   │   └── useUrlQueryState.js     # URL 狀態管理
│   ├── api.js                      # API 配置
│   ├── App.jsx                     # 主應用元件
│   ├── App.css                     # 全域樣式
│   ├── typography.css              # 字體與排版系統
│   ├── spacing.css                 # 間距系統
│   ├── interactions.css            # 互動與動效系統
│   ├── index.css                   # 基礎樣式
│   └── main.jsx                    # 應用入口
├── DESIGN_SYSTEM.md                # 設計系統文檔
├── UI_REFACTOR_GUIDE.md            # UI 重構指南
├── index.html
├── lotus-bf-chat.md                # 聊天檔
├── package.json
├── vite.config.js                  # Vite 配置
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
- ✅ 自動化建置與部署流程（GitHub Actions）
- ✅ 響應式設計支援各種螢幕尺寸
- ✅ 完整的設計系統（Typography, Spacing, Interactions）
- ✅ 可重用的 UI 組件庫
- ✅ 無障礙支援（WCAG AA 合規）
- ✅ 模組化的 CSS 架構

---

## 🎨 設計系統特點

### 字體與排版
- **系統字體堆疊**：優先使用本地字體，快速載入
- **中英文優化**：macOS/Windows 都有專用中文字體
- **15px 基準字體**：適合資訊密集的研究介面
- **1.625 行距**：論文標題等長文本不擠，舒適閱讀
- **8 級字體大小**：12px (xs) 到 36px (4xl)
- **Monospace 字體**：座標輸入使用等寬字體

### 間距系統
- **4px 基準單位**：所有間距都是 4 的倍數
- **14 級間距尺度**：4px → 8px → 12px → 16px → 24px → 32px...
- **組件級變數**：卡片、表格、列表都有專用間距設定
- **Utility Classes**：`.mt-4`, `.p-6`, `.gap-4` 快速套用

### 互動與動效
- **三級過渡時間**：
  - Fast (150ms)：Hover 快速回饋
  - Base (250ms)：標準動畫
  - Slow (400ms)：複雜動畫
- **統一的狀態**：Hover、Focus、Active、Disabled
- **Loading States**：Skeleton 載入動畫、Pulse 效果
- **鍵盤導航**：`:focus-visible` 支援
- **Reduced Motion**：尊重使用者偏好設定

### 無障礙支援
- **WCAG AA 合規**：所有文字顏色符合對比度標準
- **語意化 HTML**：正確使用標籤和 ARIA 屬性
- **鍵盤操作**：所有功能都能用鍵盤完成
- **Focus 指示器**：清楚的焦點狀態

📖 **詳細文檔**：[DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) 包含完整的設計指南、使用範例與最佳實踐。

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
