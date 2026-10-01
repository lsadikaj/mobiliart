import { useState, useEffect, useRef } from 'react'

const FLIP_MS  = 1300
const PAUSE_MS = 4500

export default function BookSlider({ solutions, solutionLabels, title, tagline, subtitle }) {
  const n = solutions.length

  const [step, setStep]         = useState(0)
  const [angle, setAngle]       = useState(0)
  const [flipping, setFlipping] = useState(false)
  const [instant, setInstant]   = useState(false)

  const frontIdx = step % n
  const backIdx  = (step + 1) % n

  const timerRef = useRef(null)
  const flipRef  = useRef(null)

  const doFlip = () => {
    if (flipping) return
    setFlipping(true)
    setAngle(-180)

    setTimeout(() => {
      setInstant(true)
      setStep(s => s + 1)
      setAngle(0)
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setInstant(false)
          setFlipping(false)
        })
      )
    }, FLIP_MS)
  }

  flipRef.current = doFlip

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => flipRef.current?.(), PAUSE_MS + FLIP_MS)
  }

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current) }, [])

  const goTo = (i) => {
    if (flipping || i === frontIdx) return
    doFlip()
    startTimer()
  }

  const pageTrans = instant
    ? 'none'
    : `transform ${FLIP_MS}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`

  return (
    <section
      className="photo-section relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ perspective: '2400px', perspectiveOrigin: '50% 50%' }}
    >
      {/* Image derrière (suivante) */}
      <div className="absolute inset-0">
        <img src={solutions[backIdx].image} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Page qui se retourne depuis le bord gauche */}
      <div style={{
        position: 'absolute', inset: 0,
        transformStyle: 'preserve-3d',
        transformOrigin: 'left center',
        transform: `rotateY(${angle}deg)`,
        transition: pageTrans,
      }}>
        {/* Face avant */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          overflow: 'hidden',
        }}>
          <img src={solutions[frontIdx].image} alt="" className="w-full h-full object-cover" />
            <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: 60,
            background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.4))',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Face arrière */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden',
          overflow: 'hidden',
          transform: 'rotateY(180deg)',
        }}>
          <img src={solutions[backIdx].image} alt="" className="w-full h-full object-cover" />
          </div>
      </div>


      {/* Label + dots */}
      <div className="absolute bottom-28 left-0 right-0 text-center z-20 pointer-events-none">
        <span className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
          {solutionLabels?.[frontIdx] || solutions[frontIdx]?.titre}
        </span>
        <div className="mt-3 flex justify-center gap-2">
          {solutions.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`transition-all duration-500 rounded-full pointer-events-auto ${
                i === frontIdx ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/35 hover:bg-white/60'
              }`} />
          ))}
        </div>
      </div>

      {/* Titre */}
      <div className="relative z-20 text-center px-4 w-full max-w-3xl mx-auto mt-20">
        <div className="backdrop-blur-md bg-dark-DEFAULT/65 border border-white/10 shadow-2xl inline-block w-full px-6 py-8 md:px-10 md:py-10">
          {tagline && <p className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-3">{tagline}</p>}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight">{title}</h1>
          <div className="w-20 h-px bg-gold mx-auto mb-5" />
          {subtitle && <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/60 z-20">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gold/40 animate-bounce" />
      </div>
    </section>
  )
}
