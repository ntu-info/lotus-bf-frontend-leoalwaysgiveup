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
      <SectionTitle level="h2" subtitle="Build complex search queries using terms, coordinates, and boolean operators">
        Query Builder
      </SectionTitle>

      <div className="query-builder__input">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='e.g., "emotion AND memory", "[-22,-4,18] NOT anxiety"'
          size="lg"
          fullWidth
        />
      </div>

      <div className="query-builder__toolbar">
        <div className="query-builder__group">
          <span className="query-builder__label">Boolean:</span>
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

        <div className="query-builder__group">
          <span className="query-builder__label">Brackets:</span>
          <Button variant="ghost" size="sm" onClick={() => append('(')}>
            (
          </Button>
          <Button variant="ghost" size="sm" onClick={() => append(')')}>
            )
          </Button>
        </div>

        <div className="query-builder__group query-builder__group--right">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setQuery('')}
            disabled={!query}
          >
            🗑️ Clear
          </Button>
        </div>
      </div>

      <div className="query-builder__hint">
        💡 <strong>Tip:</strong> You can use MNI coordinates like{' '}
        <code>[-22,-4,18]</code> directly in your query
      </div>
    </div>
  )
}
