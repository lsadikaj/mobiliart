import { useState, useEffect, useRef } from 'react'

/**
 * Anime un chiffre de 0 jusqu'à `target` quand il entre dans le viewport.
 * Ne se déclenche qu'une seule fois.
 */
export default function Counter({ target, suffix = '', duration = 2400 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const startTime = Date.now()
          const tick = () => {
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            // easeOutQuart — démarre vite, ralentit à l'arrivée
            const ease = 1 - Math.pow(1 - progress, 4)
            setCount(Math.round(ease * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}
