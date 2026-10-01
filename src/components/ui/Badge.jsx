export default function Badge({ children, variant = 'gold' }) {
  const variants = {
    gold: 'bg-gold text-dark-DEFAULT',
    dark: 'bg-dark-surface text-gold border border-gold/40',
  }
  return (
    <span className={`inline-block text-xs font-semibold tracking-widest uppercase px-4 py-2 ${variants[variant]}`}>
      {children}
    </span>
  )
}
