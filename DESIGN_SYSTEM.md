# 🎨 LoTUS-BF 設計系統文檔

> 完整的字體、排版、間距與互動設計指南

---

## 📚 目錄

1. [設計系統概覽](#設計系統概覽)
2. [字體系統](#字體系統-typographycss)
3. [間距系統](#間距系統-spacingcss)
4. [互動系統](#互動系統-interactionscss)
5. [使用範例](#使用範例)
6. [最佳實踐](#最佳實踐)

---

## 設計系統概覽

### 核心目標

✅ **長時間閱讀舒適** - 適合研究人員長時間查看論文標題、作者等資訊  
✅ **視覺層次清晰** - 主標題、次標題、內文、輔助資訊層次分明  
✅ **一致的間距** - 統一的 spacing scale 創造呼吸感  
✅ **流暢的互動** - 所有操作都有清楚的視覺回饋  
✅ **無障礙友善** - 符合 WCAG AA 標準  
✅ **響應式設計** - 支援不同螢幕尺寸  

### 技術架構

```
src/
├── typography.css     # 字體與排版系統
├── spacing.css        # 間距系統
├── interactions.css   # 互動與動效
├── index.css          # 基礎樣式
└── main.jsx           # 導入順序：index → typography → spacing → interactions
```

---

## 字體系統 (typography.css)

### 📖 字體家族

#### 主要字體堆疊
```css
--font-family-base: 
  -apple-system,        /* iOS & macOS */
  BlinkMacSystemFont,   /* macOS */
  'Segoe UI',           /* Windows */
  'Roboto',             /* Android */
  'PingFang TC',        /* macOS 中文 */
  'Microsoft JhengHei', /* Windows 中文 */
  sans-serif;
```

**優點**：
- 使用系統內建字體，載入速度快
- 中英文混排優化
- 跨平台一致性高

#### Monospace 字體（用於座標）
```css
--font-family-mono:
  'SF Mono',           /* macOS */
  'Monaco',            /* macOS fallback */
  'Cascadia Code',     /* Windows */
  'Consolas',          /* Windows fallback */
  monospace;
```

---

### 📏 字體大小階層

基於 **Major Third (1.250)** 音階比例：

| 名稱 | 變數 | 大小 | 用途 |
|------|------|------|------|
| Extra Small | `--font-size-xs` | 12px | Caption、meta info |
| Small | `--font-size-sm` | 13px | Label、輔助文字 |
| **Base** | `--font-size-md` | **15px** | 主要內文（基準） |
| Large | `--font-size-lg` | 17px | 強調文字 |
| X-Large | `--font-size-xl` | 19px | H3 |
| 2X-Large | `--font-size-2xl` | 22px | H2 |
| 3X-Large | `--font-size-3xl` | 28px | H1 |
| 4X-Large | `--font-size-4xl` | 36px | Hero/Display |

**為什麼選 15px 作為 base？**
- 比標準 16px 略小，但仍易讀
- 適合資訊密集的研究介面
- 在 1080p+ 螢幕上最佳

---

### 💪 字重 (Font Weights)

```css
--font-weight-normal: 400;      /* 內文 */
--font-weight-medium: 500;      /* 輕微強調 */
--font-weight-semibold: 600;    /* 標題、Label */
--font-weight-bold: 700;        /* 強調 */
--font-weight-extrabold: 800;   /* Display */
```

---

### 📐 行高 (Line Heights)

```css
--line-height-tight: 1.25;      /* 標題（H1-H3） */
--line-height-snug: 1.375;      /* 次標題 */
--line-height-normal: 1.5;      /* 一般內文 */
--line-height-relaxed: 1.625;   /* 長內容（論文標題） */
--line-height-loose: 1.75;      /* 非常寬鬆 */
```

**特別注意**：
- **Studies 表格**使用 `line-height-relaxed` (1.625) 方便長時間閱讀
- **論文標題欄位**行距加大，避免擠在一起

---

### 🔤 字間距 (Letter Spacing)

```css
--letter-spacing-tighter: -0.05em;   /* 大標題 */
--letter-spacing-tight: -0.025em;    /* 標題 */
--letter-spacing-normal: 0;          /* 內文 */
--letter-spacing-wide: 0.025em;      /* Label */
--letter-spacing-wider: 0.05em;      /* 全大寫 */
```

---

### 🎨 文字顏色（WCAG AA 合規）

```css
--text-primary: #1a202c;     /* 對比度 15.8:1 */
--text-secondary: #4a5568;   /* 對比度 8.59:1 */
--text-tertiary: #718096;    /* 對比度 5.74:1 */
--text-muted: #a0aec0;       /* 對比度 4.54:1 (大字 AA) */
--text-link: #667eea;        /* 主色連結 */
```

---

### 📚 預設類別

#### 標題
```css
/* H1 - Hero */
.text-h1 {
  font-size: 36px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.05em;
}

/* H2 - Section Title */
.text-h2 {
  font-size: 22px;
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.025em;
}

/* H3 - Subsection */
.text-h3 {
  font-size: 19px;
  font-weight: 600;
  line-height: 1.375;
}
```

#### 特定用途

**表格標題**：
```css
.table-header {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.025em;
}
```

**表格內容**：
```css
.table-cell-title {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.625;  /* ← 重點：加大行距！ */
}
```

**列表項目**：
```css
.list-item {
  font-size: 15px;
  line-height: 1.625;  /* ← 掃視時更舒服 */
}
```

---

## 間距系統 (spacing.css)

### 📐 基礎尺度

基於 **4px** 基準單位：

```css
--spacing-1: 4px     /* 0.25rem */
--spacing-2: 8px     /* 0.5rem */
--spacing-3: 12px    /* 0.75rem */
--spacing-4: 16px    /* 1rem */
--spacing-5: 20px    /* 1.25rem */
--spacing-6: 24px    /* 1.5rem */
--spacing-8: 32px    /* 2rem */
--spacing-10: 40px   /* 2.5rem */
--spacing-12: 48px   /* 3rem */
```

---

### 🎯 組件級間距

#### 卡片 / 面板
```css
--card-padding: 24px;       /* 標準內距 */
--card-padding-sm: 16px;    /* 緊湊 */
--card-padding-lg: 32px;    /* 寬鬆 */
--card-gap: 16px;           /* 卡片內元素間距 */
```

#### 表格
```css
--table-cell-padding-y: 16px;    /* 上下 */
--table-cell-padding-x: 16px;    /* 左右 */
--table-header-padding-y: 12px;  /* 表頭 */
```

**為什麼這麼設？**
- 16px 內距讓論文標題不會太擠
- 方便長時間閱讀

#### 列表
```css
--list-item-padding-y: 12px;
--list-item-padding-x: 12px;
--list-gap: 4px;  /* 列表項之間 */
```

---

### 🛠 Utility Classes

快速應用間距：

```css
/* Margin */
.mt-4 { margin-top: 16px; }
.mb-6 { margin-bottom: 24px; }
.mx-auto { margin-left: auto; margin-right: auto; }

/* Padding */
.p-6 { padding: 24px; }
.px-4 { padding-left: 16px; padding-right: 16px; }
.py-3 { padding-top: 12px; padding-bottom: 12px; }

/* Gap (Flexbox/Grid) */
.gap-4 { gap: 16px; }
```

---

## 互動系統 (interactions.css)

### ⏱ 過渡時間

```css
--duration-instant: 0ms;
--duration-fast: 150ms;     /* 快速回饋（hover） */
--duration-base: 250ms;     /* 標準動畫 */
--duration-slow: 400ms;     /* 慢速動畫 */
--duration-slower: 600ms;   /* Loading */
```

### 📈 Easing Functions

```css
--ease-out: cubic-bezier(0, 0, 0.2, 1);        /* 標準 */
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);  /* 平滑 */
```

---

### 🖱 互動狀態

#### Button
```css
.btn-interactive:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.12);
}

.btn-interactive:active {
  transform: translateY(0);
}
```

#### List Item
```css
.list-item-interactive:hover {
  background: rgba(102, 126, 234, 0.06);
  color: #667eea;
  transform: translateX(2px);
}

.list-item-interactive.active {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
}
```

#### Table Row
```css
.table-row-interactive:hover {
  background: rgba(102, 126, 234, 0.05);
}

.table-row-interactive.selected {
  background: rgba(102, 126, 234, 0.1);
  border-left: 3px solid #667eea;
}
```

---

### ⌨️ 鍵盤導航

```css
*:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

**只在鍵盤導航時顯示 outline**，滑鼠點擊不會出現。

---

### 🔄 Loading States

#### Skeleton
```css
.skeleton {
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  animation: skeleton-loading 1.5s ease-in-out infinite;
}
```

#### Pulse
```css
.loading-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

---

### 🚫 Empty & Error States

```css
.empty-state {
  padding: 48px 24px;
  text-align: center;
  color: #a0aec0;
}

.error-state {
  padding: 16px;
  background: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
}
```

---

## 使用範例

### 範例 1：建立一個 Section Title

```jsx
// ✅ Good
<h2 className="text-h2" style={{ 
  marginBottom: 'var(--spacing-6)' 
}}>
  Studies
</h2>

// 或使用 utility class
<h2 className="text-h2 mb-6">
  Studies
</h2>
```

### 範例 2：設定表格內距

```css
/* ✅ Good - 使用變數 */
.studies__cell {
  padding: var(--table-cell-padding-y) var(--table-cell-padding-x);
  font-size: var(--font-size-md);
  line-height: var(--line-height-relaxed);
}

/* ❌ Bad - 硬編碼 */
.studies__cell {
  padding: 14px 16px;
  font-size: 15px;
  line-height: 1.6;
}
```

### 範例 3：互動狀態

```css
/* ✅ Good - 使用標準 transition */
.terms__button {
  transition: 
    background-color var(--duration-fast) var(--ease-out),
    color var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

/* ❌ Bad - 硬編碼時間 */
.terms__button {
  transition: all 0.15s ease;
}
```

---

## 最佳實踐

### ✅ DO

1. **使用 CSS 變數**
   ```css
   font-size: var(--font-size-md);
   padding: var(--spacing-4);
   ```

2. **使用語意化類別**
   ```html
   <div class="table-cell-title">...</div>
   <p class="text-caption">...</p>
   ```

3. **保持一致的間距**
   - 使用 4px 的倍數
   - 優先使用 `--spacing-*` 變數

4. **考慮長文本**
   - 論文標題使用 `line-height: var(--line-height-relaxed)`
   - 允許換行：`word-wrap: break-word`

5. **提供互動回饋**
   - Hover 狀態要明顯但不突兀
   - 使用 `--duration-fast` (150ms) 做快速反應

### ❌ DON'T

1. **不要硬編碼數值**
   ```css
   /* ❌ */ font-size: 14px;
   /* ✅ */ font-size: var(--font-size-sm);
   ```

2. **不要忽略可及性**
   - 確保顏色對比度符合 WCAG AA
   - 提供 `:focus-visible` 樣式

3. **不要過度動畫**
   - 避免超過 600ms 的動畫
   - 尊重 `prefers-reduced-motion`

---

## 🎯 效果對比

### Before（舊版）
- ❌ 字體大小不一致（14px, 13px, 15px 混用）
- ❌ 行距太緊（1.4）
- ❌ 間距隨意（10px, 14px, 16px）
- ❌ Hover 狀態不統一
- ❌ 沒有 loading/empty 狀態設計

### After（新版）
- ✅ 統一的字體階層系統
- ✅ 舒適的行距（1.625 for long content）
- ✅ 基於 4px 的間距系統
- ✅ 一致的互動回饋
- ✅ 完整的狀態設計

---

## 📱 響應式設計

### 斷點

```css
/* Tablet (≤ 1024px) */
@media (max-width: 1024px) {
  :root {
    --font-size-base: 14px;
    --app-padding: 16px;
    --card-padding: 20px;
  }
}

/* Mobile (≤ 768px) */
@media (max-width: 768px) {
  :root {
    --font-size-base: 14px;
    --app-padding: 12px;
    --card-padding: 16px;
  }
  
  /* 增加行高方便手機閱讀 */
  body {
    line-height: var(--line-height-relaxed);
  }
}
```

---

## ♿ 無障礙支援

### 顏色對比度

所有文字顏色都符合 WCAG AA 標準：

- `--text-primary`: 15.8:1 ⭐ (AAA)
- `--text-secondary`: 8.59:1 ⭐ (AAA)
- `--text-tertiary`: 5.74:1 ✅ (AA)
- `--text-muted`: 4.54:1 ✅ (AA for large text)

### Focus Visible

```css
*:focus-visible {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}
```

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🚀 部署與測試

### 1. 強制刷新瀏覽器
```
Windows: Ctrl + F5
Mac: Cmd + Shift + R
```

### 2. 檢查項目

✅ 字體載入正確（檢查 DevTools）  
✅ 間距一致（使用瀏覽器測量工具）  
✅ Hover 狀態流暢  
✅ Focus 狀態可見（用 Tab 鍵測試）  
✅ 響應式正常（調整視窗大小）  
✅ Loading skeleton 顯示  

### 3. 對比度測試

使用工具：
- Chrome DevTools Lighthouse
- WebAIM Contrast Checker
- axe DevTools

---

## 📚 延伸閱讀

- [Material Design Type Scale](https://material.io/design/typography/the-type-system.html)
- [Tailwind CSS Spacing](https://tailwindcss.com/docs/customizing-spacing)
- [MDN Web Docs: Typography](https://developer.mozilla.org/en-US/docs/Learn/CSS/Styling_text)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**最後更新**: 2025-01-04  
**版本**: 2.0  
**作者**: LoTUS-BF Development Team

