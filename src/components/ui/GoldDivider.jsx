export default function GoldDivider({ className = '' }) {
  return (
    <div className={`w-full h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-40 ${className}`} />
  )
}
