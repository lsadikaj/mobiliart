import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const FACES  = 5
const ANGLE  = 360 / FACES          // 72°
const TAN36  = Math.tan(Math.PI / FACES)  // tan(36°) ≈ 0.7265

export default function PentagonSlider({ solutions, solutionLabels, title, tagline, subtitle }) {
  const { t } = useTranslation()
  const sceneRef  = useRef(null)
  const timerRef  = useRef(null)
  const [dims, setDims]     = useState({ w: 0, h: 0 })
  const [step, setStep]     = useState(0)   // toujours croissant → rotation toujours dans le même sens
  const [spinning, setSpinning] = useState(false)

  const current = step % FACES

  // Mesure la scène pour calculer l'apothème
  useEffect(() => {
    const measure = () => {
      if (sceneRef.current) {
        setDims({
          w: sceneRef.current.offsetWidth,
          h: sceneRef.current.offsetHeight,
        })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setStep(s => s + 1)
    }, 4200)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  const apothem = dims.w > 0 ? dims.w / (2 * TAN36) : 0

  const goTo = (targetFace) => {
    if (spinning) return
    // Nombre de pas en avant pour atteindre la face cible (toujours positif)
    const stepsForward = (targetFace - current + FACES) % FACES || FACES
    setStep(s => s + stepsForward)
    startTimer()
    setSpinning(true)
    setTimeout(() => setSpinning(false), 1400)
  }

  // Toujours négatif et croissant → rotation dans le même sens indéfiniment
  const prismRotation = step * -ANGLE

  return (
    <section
      ref={sceneRef}
      className="photo-section relative min-h-screen overflow-hidden flex items-center justify-center"
      style={{ perspective: '1100px', perspectiveOrigin: '50% 50%' }}
    >
      {/* ── Prisme pentagonal ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          transform: `translateZ(-${apothem}px) rotateY(${prismRotation}deg)`,
          transition: 'transform 1.4s cubic-bezier(0.77, 0, 0.175, 1)',
        }}
      >
        {solutions.map((sol, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              inset: 0,
              transform: `rotateY(${i * ANGLE}deg) translateZ(${apothem}px)`,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <img
              src={sol.image}
              alt={solutionLabels?.[i] || sol.titre}
              className="w-full h-full object-cover"
            />
            {/* Overlay sombre */}
          </div>
        ))}
      </div>

      {/* ── Label de la face active ── */}
      <div className="absolute bottom-28 left-0 right-0 text-center z-10 pointer-events-none">
        <span className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
          {solutionLabels?.[current] || solutions[current]?.titre}
        </span>
        {/* Barre de progression */}
        <div className="mt-3 flex justify-center gap-2">
          {solutions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-500 rounded-full pointer-events-auto ${
                i === current
                  ? 'w-8 h-2 bg-gold'
                  : 'w-2 h-2 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Bloc flouté titre ── */}
      <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto mt-20">
        <div className="backdrop-blur-md bg-dark-DEFAULT/65 border border-white/10 shadow-2xl inline-block w-full px-6 py-8 md:px-10 md:py-10">
          {tagline && (
            <p className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-3">
              {tagline}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight">
            {title}
          </h1>
          <div className="w-20 h-px bg-gold mx-auto mb-5" />
          {subtitle && (
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/60 z-10">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gold/40 animate-bounce" />
      </div>
    </section>
  )
}
