import './SectionTitle.css'

/**
 * SectionTitle - 統一的區塊標題
 * @param {string} level - 'h1' | 'h2' | 'h3'
 * @param {string} gradient - 是否使用漸層效果
 */
export function SectionTitle({ 
  children, 
  level = 'h2',
  gradient = true,
  subtitle,
  className = '',
  ...props 
}) {
  const Tag = level
  
  const classNames = [
    'ui-section-title',
    `ui-section-title--${level}`,
    gradient && 'ui-section-title--gradient',
    className
  ].filter(Boolean).join(' ')

  return (
    <div className="ui-section-title-wrapper" {...props}>
      <Tag className={classNames}>
        {children}
      </Tag>
      {subtitle && (
        <div className="ui-section-subtitle">
          {subtitle}
        </div>
      )}
    </div>
  )
}

