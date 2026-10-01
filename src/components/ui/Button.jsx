export default function Button({ children, variant = 'gold', className = '', onClick, href, target, type = 'button' }) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 font-sans font-medium text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer'

  const variants = {
    gold: 'bg-gold text-dark-DEFAULT hover:bg-gold-light shadow-lg hover:shadow-gold/30',
    outline: 'border border-gold text-gold hover:bg-gold hover:text-dark-DEFAULT',
    white: 'border border-white/70 text-white bg-white/10 hover:bg-white hover:text-dark-DEFAULT',
    ghost: 'text-gold hover:text-gold-light underline-offset-4 hover:underline',
  }

  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <a href={href} target={target} className={cls}>{children}</a>
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  )
}
