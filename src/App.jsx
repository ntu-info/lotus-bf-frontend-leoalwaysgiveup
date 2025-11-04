import { useCallback, useRef, useState } from 'react'
import { Terms } from './components/Terms'
import { QueryBuilder } from './components/QueryBuilder'
import { Studies } from './components/Studies'
import { NiiViewer } from './components/NiiViewer'
import { Card, SectionTitle } from './components/ui'
import { useUrlQueryState } from './hooks/useUrlQueryState'
import './App.css'

export default function App() {
  const [query, setQuery] = useUrlQueryState('q')

  const handlePickTerm = useCallback(
    (t) => {
      setQuery((q) => (q ? `${q} ${t}` : t))
    },
    [setQuery]
  )

  // --- resizable panes state ---
  const gridRef = useRef(null)
  const [sizes, setSizes] = useState([22, 48, 30]) // [left, middle, right]
  const MIN_PX = 240

  const startDrag = (which, e) => {
    e.preventDefault()
    const startX = e.clientX
    const rect = gridRef.current.getBoundingClientRect()
    const total = rect.width
    const curPx = sizes.map((p) => (p / 100) * total)

    const onMouseMove = (ev) => {
      const dx = ev.clientX - startX
      if (which === 0) {
        let newLeft = curPx[0] + dx
        let newMid = curPx[1] - dx
        if (newLeft < MIN_PX) {
          newMid -= MIN_PX - newLeft
          newLeft = MIN_PX
        }
        if (newMid < MIN_PX) {
          newLeft -= MIN_PX - newMid
          newMid = MIN_PX
        }
        const s0 = (newLeft / total) * 100
        const s1 = (newMid / total) * 100
        const s2 = 100 - s0 - s1
        setSizes([s0, s1, Math.max(s2, 0)])
      } else {
        let newMid = curPx[1] + dx
        let newRight = curPx[2] - dx
        if (newMid < MIN_PX) {
          newRight -= MIN_PX - newMid
          newMid = MIN_PX
        }
        if (newRight < MIN_PX) {
          newMid -= MIN_PX - newRight
          newRight = MIN_PX
        }
        const s1 = (newMid / total) * 100
        const s2 = (newRight / total) * 100
        const s0 = (curPx[0] / total) * 100
        setSizes([s0, s1, Math.max(s2, 0)])
      }
    }
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div className="app">
      <header className="app__header">
        <div className="app__header-content">
          <h1 className="app__title">LoTUS-BF</h1>
          <div className="app__subtitle">
            Location-or-Term Unified Search for Brain Functions
          </div>
        </div>
      </header>

      <main className="app__grid" ref={gridRef}>
        {/* Left Panel: Terms */}
        <div className="app__panel" style={{ flexBasis: `${sizes[0]}%` }}>
          <Card variant="elevated" padding="lg">
            <SectionTitle level="h2">Terms</SectionTitle>
            <Terms onPickTerm={handlePickTerm} />
          </Card>
        </div>

        {/* Resizer 1 */}
        <div
          className="app__resizer"
          aria-label="Resize left/middle"
          onMouseDown={(e) => startDrag(0, e)}
        >
          <div className="app__resizer-line" />
        </div>

        {/* Middle Panel: Query Builder + Studies */}
        <div className="app__panel" style={{ flexBasis: `${sizes[1]}%` }}>
          <Card variant="elevated" padding="lg">
            <QueryBuilder query={query} setQuery={setQuery} />
            
            <div className="app__divider" />
            
            <Studies query={query} />
          </Card>
        </div>

        {/* Resizer 2 */}
        <div
          className="app__resizer"
          aria-label="Resize middle/right"
          onMouseDown={(e) => startDrag(1, e)}
        >
          <div className="app__resizer-line" />
        </div>

        {/* Right Panel: NIfTI Viewer */}
        <div className="app__panel" style={{ flexBasis: `${sizes[2]}%` }}>
          <Card variant="elevated" padding="lg">
            <NiiViewer query={query} />
          </Card>
        </div>
      </main>

      <footer className="app__footer">
        <span>🧠 LoTUS-BF</span>
        <span>•</span>
        <span>Brain Function Meta-Analysis</span>
        <span>•</span>
        <span>NTU Psychology</span>
      </footer>
    </div>
  )
}
