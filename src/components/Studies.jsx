import { API_BASE } from '../api'
import { useEffect, useMemo, useState } from 'react'
import { Button, SectionTitle } from './ui'
import './Studies.css'

export function Studies({ query }) {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [sortKey, setSortKey] = useState('year')
  const [sortDir, setSortDir] = useState('desc') // 'asc' | 'desc'
  const [page, setPage] = useState(1)
  const pageSize = 20

  // Reset page when query changes
  useEffect(() => {
    setPage(1)
  }, [query])

  // Fetch studies
  useEffect(() => {
    if (!query) return

    let alive = true
    const ac = new AbortController()

    ;(async () => {
      setLoading(true)
      setErr('')
      try {
        const url = `${API_BASE}/query/${encodeURIComponent(query)}/studies`
        const res = await fetch(url, { signal: ac.signal })
        const data = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(data?.error || `HTTP ${res.status}`)
        if (!alive) return
        const list = Array.isArray(data?.results) ? data.results : []
        setRows(list)
      } catch (e) {
        if (!alive) return
        setErr(`Unable to fetch studies: ${e?.message || e}`)
        setRows([])
      } finally {
        if (alive) setLoading(false)
      }
    })()

    return () => {
      alive = false
      ac.abort()
    }
  }, [query])

  const changeSort = (key) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  const sorted = useMemo(() => {
    const arr = [...rows]
    const dir = sortDir === 'asc' ? 1 : -1
    arr.sort((a, b) => {
      const A = a?.[sortKey]
      const B = b?.[sortKey]
      // Numeric comparison for year; string comparison for other fields
      if (sortKey === 'year') {
        return (Number(A || 0) - Number(B || 0)) * dir
      }
      return String(A || '').localeCompare(String(B || ''), 'en') * dir
    })
    return arr
  }, [rows, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const pageRows = sorted.slice((page - 1) * pageSize, page * pageSize)

  if (!query) {
    return (
      <div className="studies studies--empty">
        <SectionTitle level="h2">Studies</SectionTitle>
        <div className="studies__placeholder">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <p>Build a query to see related studies</p>
        </div>
      </div>
    )
  }

  return (
    <div className="studies">
      <div className="studies__header">
        <SectionTitle
          level="h2"
          subtitle={
            !loading && !err && sorted.length > 0
              ? `${sorted.length} ${sorted.length === 1 ? 'result' : 'results'} found`
              : undefined
          }
        >
          Studies
        </SectionTitle>
      </div>

      {loading && (
        <div className="studies__skeleton">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="studies__skeleton-item" />
          ))}
        </div>
      )}

      {err && <div className="studies__error">{err}</div>}

      {!loading && !err && sorted.length > 0 && (
        <>
          <div className="studies__table-wrapper">
            <table className="studies__table">
              <thead>
                <tr>
                  {[
                    { key: 'year', label: 'Year', width: '80px' },
                    { key: 'journal', label: 'Journal', width: '200px' },
                    { key: 'title', label: 'Title', width: 'auto' },
                    { key: 'authors', label: 'Authors', width: '220px' }
                  ].map(({ key, label, width }) => (
                    <th
                      key={key}
                      style={{ width }}
                      onClick={() => changeSort(key)}
                    >
                      <div className="studies__th-content">
                        {label}
                        <span className="studies__sort-indicator">
                          {sortKey === key &&
                            (sortDir === 'asc' ? '↑' : '↓')}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageRows.map((r, i) => (
                  <tr key={i}>
                    <td className="studies__cell studies__cell--year">
                      {r.year ?? '—'}
                    </td>
                    <td className="studies__cell studies__cell--journal">
                      {r.journal || '—'}
                    </td>
                    <td className="studies__cell studies__cell--title">
                      {r.title || '—'}
                    </td>
                    <td className="studies__cell studies__cell--authors">
                      {r.authors || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="studies__pagination">
              <div className="studies__pagination-info">
                Page <strong>{page}</strong> of <strong>{totalPages}</strong>
              </div>

              <div className="studies__pagination-controls">
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage(1)}
                  title="First page"
                >
                  ⏮
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={page >= totalPages}
                  onClick={() => setPage(totalPages)}
                  title="Last page"
                >
                  ⏭
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {!loading && !err && sorted.length === 0 && (
        <div className="studies__empty">
          <p>No studies found for this query.</p>
          <p className="studies__empty-hint">
            Try adjusting your search terms or using different operators.
          </p>
        </div>
      )}
    </div>
  )
}
