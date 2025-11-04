import './Card.css'

/**
 * Card - 可重用的卡片組件
 * @param {string} variant - 'default' | 'elevated' | 'bordered'
 * @param {string} padding - 'sm' | 'md' | 'lg'
 * @param {boolean} hoverable - 是否有 hover 效果
 */
export function Card({ 
  children, 
  variant = 'default', 
  padding = 'md',
  hoverable = false,
  className = '',
  ...props 
}) {
  const classNames = [
    'ui-card',
    `ui-card--${variant}`,
    `ui-card--padding-${padding}`,
    hoverable && 'ui-card--hoverable',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  )
}

