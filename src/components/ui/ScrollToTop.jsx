import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const RADIUS = 20
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function ScrollToTop() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible]   = useState(false)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop    = window.scrollY
      const docHeight    = document.documentElement.scrollHeight - window.innerHeight
      const pct          = docHeight > 0 ? scrollTop / docHeight : 0
      setProgress(pct)
      setVisible(scrollTop > 200)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const strokeOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Remonter en haut"
      className={`fixed bottom-[5.5rem] right-9 z-50 flex items-center justify-center
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
    >
      {/* Anneau de progression SVG */}
      <svg
        width="48" height="48"
        viewBox="0 0 48 48"
        className="absolute"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Piste de fond */}
        <circle
          cx="24" cy="24" r={RADIUS}
          fill="none"
          stroke="rgba(201,168,76,0.2)"
          strokeWidth="2.5"
        />
        {/* Arc de progression */}
        <circle
          cx="24" cy="24" r={RADIUS}
          fill="none"
          stroke="#C9A84C"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={strokeOffset}
          style={{ transition: 'stroke-dashoffset 0.15s linear' }}
        />
      </svg>

      {/* Fond + flèche */}
      <span className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-dark-surface border border-gold/30 hover:border-gold/70 hover:bg-dark-DEFAULT transition-colors duration-200 shadow-lg">
        <ArrowUp size={16} className="text-gold" />
      </span>
    </button>
  )
}
