import './Button.css'

/**
 * Button - 統一的按鈕組件
 * @param {string} variant - 'primary' | 'secondary' | 'ghost' | 'danger'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} fullWidth - 是否全寬
 */
export function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  ...props 
}) {
  const classNames = [
    'ui-button',
    `ui-button--${variant}`,
    `ui-button--${size}`,
    fullWidth && 'ui-button--full',
    disabled && 'ui-button--disabled',
    className
  ].filter(Boolean).join(' ')

  return (
    <button 
      className={classNames} 
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

