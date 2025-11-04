# 🎨 LoTUS-BF UI/UX 重構指南

## 📊 重構進度

### ✅ 已完成（Phase 1）
- [x] 創建可重用的 UI 組件系統
  - Card 組件（3種變體）
  - Button 組件（4種樣式）
  - Input / SearchInput 組件
  - SectionTitle 組件

### 🚧 進行中（Phase 2）
- [ ] 重構 Terms 組件
- [ ] 重構 QueryBuilder 組件  
- [ ] 重構 Studies 組件（優化表格）
- [ ] 重構 NIfTI Viewer 組件

### 📅 待完成（Phase 3）
- [ ] 優化響應式布局
- [ ] 改善可調整大小的面板
- [ ] 最終視覺調整

---

## 🎯 設計原則

### 色彩系統
```css
/* 主色調 */
--primary: #667eea (紫藍色)
--primary-dark: #5568d3
--primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%)

/* 中性色 */
--gray-50: #f7fafc
--gray-100: #edf2f7
--gray-200: #e2e8f0
--gray-300: #cbd5e0
--gray-700: #4a5568
--gray-900: #1a202c

/* 語意色 */
--success: #48bb78
--warning: #ed8936
--danger: #f56565
```

### 間距系統
```
4px (xs) → 8px (sm) → 12px (md) → 16px (lg) → 24px (xl) → 32px (2xl)
```

### 圓角系統
```
8px (sm) → 10px (md) → 14px (lg) → 16px (xl) → 20px (2xl)
```

---

## 📁 新增的檔案結構

```
src/
├── components/
│   ├── ui/                    # ✨ 新增：可重用 UI 組件
│   │   ├── Button.jsx
│   │   ├── Button.css
│   │   ├── Card.jsx
│   │   ├── Card.css
│   │   ├── Input.jsx
│   │   ├── Input.css
│   │   ├── SectionTitle.jsx
│   │   ├── SectionTitle.css
│   │   └── index.js
│   │
│   ├── Terms.jsx              # 待重構
│   ├── QueryBuilder.jsx       # 待重構
│   ├── Studies.jsx            # 待重構
│   └── NiiViewer.jsx          # 待重構
```

---

## 🔧 重構示例

### 範例 1：使用新的 Button 組件

**Before:**
```jsx
<button 
  onClick={handleClick}
  style={{ 
    background: '#667eea', 
    color: 'white',
    padding: '8px 16px'
  }}
>
  Search
</button>
```

**After:**
```jsx
import { Button } from './ui'

<Button variant="primary" size="md" onClick={handleClick}>
  Search
</Button>
```

### 範例 2：使用新的 Card 組件

**Before:**
```jsx
<section className="card" style={{ flexBasis: '28%' }}>
  <div className="card__title">Terms</div>
  <Terms onPickTerm={handlePickTerm} />
</section>
```

**After:**
```jsx
import { Card, SectionTitle } from './ui'

<Card variant="elevated" padding="md">
  <SectionTitle level="h2">Terms</SectionTitle>
  <Terms onPickTerm={handlePickTerm} />
</Card>
```

### 範例 3：使用新的 SearchInput

**Before:**
```jsx
<input 
  type="search"
  placeholder="Search terms..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="input"
/>
```

**After:**
```jsx
import { SearchInput } from './ui'

<SearchInput
  placeholder="Search terms..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
```

---

## 📝 具體重構步驟

### Step 1: 重構 Terms 組件

**檔案**: `src/components/Terms.jsx`

**重點改進**:
1. 使用 `SearchInput` 替換原生 input
2. 使用 `Button` 組件統一按鈕樣式
3. 改善術語列表的視覺層次
4. 添加 loading 骨架屏
5. 優化間距和排版

**範例代碼**:
```jsx
import { SearchInput, Button } from './ui'
import './Terms.css'

export function Terms({ onPickTerm }) {
  const [terms, setTerms] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <div className="terms">
      <div className="terms__search">
        <SearchInput
          placeholder="Search terms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSearch('')}
        >
          Clear
        </Button>
      </div>

      {loading ? (
        <TermsLoadingSkeleton />
      ) : (
        <ul className="terms__list">
          {filtered.map((term, idx) => (
            <li key={idx} className="terms__item">
              <button
                className="terms__button"
                onClick={() => onPickTerm?.(term)}
              >
                {term}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
```

**對應的 CSS** (`Terms.css`):
```css
.terms {
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
}

.terms__search {
  display: flex;
  gap: 8px;
  align-items: center;
}

.terms__list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
  flex: 1;
}

.terms__item {
  margin-bottom: 4px;
}

.terms__button {
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border: none;
  background: transparent;
  color: #4a5568;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.terms__button:hover {
  background: rgba(102, 126, 234, 0.08);
  color: #667eea;
}

.terms__button:active {
  background: rgba(102, 126, 234, 0.15);
}
```

### Step 2: 重構 QueryBuilder 組件

**檔案**: `src/components/QueryBuilder.jsx`

**重點改進**:
1. 使用新的 `Button` 組件
2. 使用 `Input` 組件
3. 改善按鈕組的排版
4. 添加視覺分組

**範例代碼**:
```jsx
import { Input, Button, SectionTitle } from './ui'
import './QueryBuilder.css'

export function QueryBuilder({ query, setQuery }) {
  const append = (token) => setQuery((q) => (q ? `${q} ${token}` : token))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      setQuery(e.currentTarget.value)
    }
  }

  return (
    <div className="query-builder">
      <SectionTitle level="h2">Query Builder</SectionTitle>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Create a query, e.g.: [-22,-4,18] NOT emotion"
        size="lg"
      />

      <div className="query-builder__operators">
        <div className="button-group">
          <Button variant="secondary" size="sm" onClick={() => append('AND')}>
            AND
          </Button>
          <Button variant="secondary" size="sm" onClick={() => append('OR')}>
            OR
          </Button>
          <Button variant="secondary" size="sm" onClick={() => append('NOT')}>
            NOT
          </Button>
        </div>
        
        <div className="button-group">
          <Button variant="ghost" size="sm" onClick={() => append('(')}>
            (
          </Button>
          <Button variant="ghost" size="sm" onClick={() => append(')')}>
            )
          </Button>
        </div>

        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setQuery('')}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
```

### Step 3: 優化 Studies 表格

**檔案**: `src/components/Studies.jsx`

**重點改進**:
1. 固定表頭
2. 斑馬紋樣式
3. hover 高亮
4. 改善行距和可讀性
5. 優化分頁按鈕

**CSS 範例**:
```css
.studies__table-wrapper {
  overflow: auto;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.studies__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.studies__table thead {
  position: sticky;
  top: 0;
  background: linear-gradient(180deg, #f7fafc 0%, #edf2f7 100%);
  z-index: 10;
}

.studies__table th {
  padding: 14px 16px;
  text-align: left;
  font-weight: 600;
  color: #2d3748;
  border-bottom: 2px solid #cbd5e0;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;
}

.studies__table th:hover {
  background: rgba(102, 126, 234, 0.05);
}

.studies__table tbody tr {
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.15s ease;
}

.studies__table tbody tr:nth-child(even) {
  background: #f7fafc;
}

.studies__table tbody tr:hover {
  background: rgba(102, 126, 234, 0.05);
}

.studies__table td {
  padding: 14px 16px;
  color: #4a5568;
  line-height: 1.6;
}

.studies__table td:nth-child(3) {
  /* Title column */
  max-width: 500px;
  line-height: 1.5;
}
```

---

## 🎨 視覺改進清單

### 整體布局
- [ ] 優化三欄布局的預設比例（建議 20:50:30）
- [ ] 改善分隔線的視覺效果
- [ ] 添加整體的背景漸層
- [ ] 改善卡片之間的間距

### Terms 區塊
- [ ] 縮小寬度，專注於工具欄功能
- [ ] 添加分類或標籤功能
- [ ] 改善滾動條樣式
- [ ] 添加術語數量統計

### Query Builder 區塊
- [ ] 放大主工作區域
- [ ] 添加查詢歷史功能
- [ ] 改善錯誤提示
- [ ] 添加範例查詢快捷按鈕

### Studies 表格
- [ ] 固定表頭
- [ ] 添加表格導出功能
- [ ] 改善排序指示器
- [ ] 添加篩選功能

### NIfTI Viewer
- [ ] 分區設計（下載、設定、預覽）
- [ ] 添加全螢幕模式
- [ ] 改善控制項的組織
- [ ] 添加快捷鍵提示

---

## 📱 響應式設計

### 斷點系統
```css
/* Mobile */
@media (max-width: 768px) {
  .app__grid {
    flex-direction: column;
    gap: 16px;
  }
}

/* Tablet */
@media (max-width: 1024px) {
  .app__grid {
    /* Terms 變成抽屜 */
  }
}

/* Desktop */
@media (min-width: 1440px) {
  .app {
    max-width: 1920px;
    margin: 0 auto;
  }
}
```

---

## 🚀 下一步行動

1. **推送當前進度**
   ```bash
   git push
   ```

2. **測試 UI 組件**
   - 在瀏覽器中測試各個組件
   - 檢查顏色對比度
   - 測試 hover 和 focus 狀態

3. **逐步重構現有組件**
   - 從 Terms 開始
   - 然後 QueryBuilder
   - 最後 Studies 和 NIfTI Viewer

4. **收集反饋並迭代**

---

## 💡 最佳實踐

1. **保持功能不變**：只改介面，不改邏輯
2. **測試 API 呼叫**：確保所有功能正常
3. **逐步提交**：每完成一個組件就提交
4. **文檔化**：為新組件添加註釋

---

## 📞 技術支援

如果在重構過程中遇到問題，可以：
1. 查看瀏覽器 console 的錯誤
2. 檢查 CSS 是否正確導入
3. 確認組件 props 是否正確傳遞
4. 測試不同螢幕尺寸下的顯示

---

**Last Updated**: 2025-01-04
**Version**: 1.0

