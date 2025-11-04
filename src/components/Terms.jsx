import { API_BASE } from '../api'
import { useEffect, useMemo, useState } from 'react'
import { SearchInput, Button } from './ui'
import './Terms.css'

export function Terms({ onPickTerm }) {
  const [terms, setTerms] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')

  useEffect(() => {
    let alive = true
    const ac = new AbortController()
    const load = async () => {
      setLoading(true)
      setErr('')
      try {
        const res = await fetch(`${API_BASE}/terms`, { signal: ac.signal })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!alive) return
        setTerms(Array.isArray(data?.terms) ? data.terms : [])
      } catch (e) {
        if (!alive) return
        setErr(`Failed to fetch terms: ${e?.message || e}`)
      } finally {
        if (alive) setLoading(false)
      }
    }
    load()
    return () => {
      alive = false
      ac.abort()
    }
  }, [])

  const filtered = useMemo(() => {
    const s = search.trim().toLowerCase()
    if (!s) return terms
    return terms.filter((t) => t.toLowerCase().includes(s))
  }, [terms, search])

  return (
    <div className="terms">
      <div className="terms__header">
        <SearchInput
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search terms…"
          size="md"
        />
        {search && (
          <Button variant="ghost" size="sm" onClick={() => setSearch('')}>
            Clear
          </Button>
        )}
      </div>

      <div className="terms__meta">
        {!loading && filtered.length > 0 && (
          <span className="terms__count">
            {filtered.length} {filtered.length === 1 ? 'term' : 'terms'}
          </span>
        )}
      </div>

      {loading && (
        <div className="terms__skeleton">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="terms__skeleton-item" />
          ))}
        </div>
      )}

      {err && <div className="terms__error">{err}</div>}

      {!loading && !err && (
        <div className="terms__list">
          {filtered.length === 0 ? (
            <div className="terms__empty">
              {search ? `No terms matching "${search}"` : 'No terms available'}
            </div>
          ) : (
            <ul className="terms__ul">
              {filtered.slice(0, 500).map((t, idx) => (
                <li key={`${t}-${idx}`} className="terms__item">
                  <button
                    className="terms__button"
                    title={`Add "${t}" to query`}
                    onClick={() => onPickTerm?.(t)}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
