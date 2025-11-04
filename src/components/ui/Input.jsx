import './Input.css'

/**
 * Input - 統一的輸入框組件
 * @param {string} variant - 'default' | 'search'
 * @param {string} size - 'sm' | 'md' | 'lg'
 */
export function Input({ 
  variant = 'default',
  size = 'md',
  fullWidth = true,
  error,
  className = '',
  ...props 
}) {
  const classNames = [
    'ui-input',
    `ui-input--${variant}`,
    `ui-input--${size}`,
    fullWidth && 'ui-input--full',
    error && 'ui-input--error',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="ui-input-wrapper">
      <input 
        className={classNames}
        {...props}
      />
      {error && (
        <div className="ui-input-error">{error}</div>
      )}
    </div>
  )
}

export function SearchInput({ placeholder = 'Search...', ...props }) {
  return (
    <div className="ui-search-input">
      <svg className="ui-search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M7 12.5a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM14.5 14.5l-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
      <Input 
        variant="search" 
        placeholder={placeholder}
        {...props}
      />
    </div>
  )
}

