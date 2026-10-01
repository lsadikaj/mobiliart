import { useState, useEffect, useRef } from 'react'

const FOLD_MS   = 650
const UNFOLD_MS = 750
const PAUSE_MS  = 4500

export default function BookSliderSplit({ solutions, solutionLabels, title, tagline, subtitle }) {
  const n = solutions.length

  const [frontIdx,    setFrontIdx]    = useState(0)
  const [nextIdx,     setNextIdx]     = useState(1 % n)
  const [angle,       setAngle]       = useState(0)
  const [phase,       setPhase]       = useState('idle')
  const [leftOpacity, setLeftOpacity] = useState(1)
  const [trans,       setTrans]       = useState(true)

  const timerRef = useRef(null)
  const flipRef  = useRef(null)

  const doFlip = () => {
    if (phase !== 'idle') return

    // Phase 1 : la moitié droite se replie vers la tranche (0° → -90°)
    setPhase('folding')
    setAngle(-90)
    setLeftOpacity(0)   // gauche commence à se fondre vers la prochaine image

    setTimeout(() => {
      // À 90° (vue de tranche) : swap invisible
      setTrans(false)
      setFrontIdx(nextIdx)
      setNextIdx(i => (i + 1) % n)
      setAngle(90)  // côté opposé de la tranche

      requestAnimationFrame(() => requestAnimationFrame(() => {
        // Phase 2 : dépli (90° → 0°) — révèle la partie droite de la nouvelle image
        setTrans(true)
        setPhase('unfolding')
        setAngle(0)

        setTimeout(() => {
          setLeftOpacity(1)
          setPhase('idle')
        }, UNFOLD_MS)
      }))
    }, FOLD_MS)
  }

  flipRef.current = doFlip

  const startTimer = () => {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => flipRef.current?.(), PAUSE_MS + FOLD_MS + UNFOLD_MS)
  }

  useEffect(() => { startTimer(); return () => clearInterval(timerRef.current) }, [])

  const goTo = (i) => {
    if (phase !== 'idle' || i === frontIdx) return
    setNextIdx(i)
    requestAnimationFrame(() => flipRef.current?.())
    startTimer()
  }

  const rightTrans = trans
    ? `transform ${phase === 'folding' ? FOLD_MS : UNFOLD_MS}ms cubic-bezier(0.645, 0.045, 0.355, 1.000)`
    : 'none'

  const totalMs = FOLD_MS + UNFOLD_MS

  return (
    <section className="photo-section relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* ── Couche 0 : image suivante plein écran en fond ─────────── */}
      {/* Visible brièvement quand la page est vue de tranche          */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <img src={solutions[nextIdx].image} alt="" className="w-full h-full object-cover" />
      </div>

      {/* ── Couche 2 : ÉLÉMENT ROTATIF plein écran ───────────────── */}
      {/* Tourne depuis le centre (50% 50%).                           */}
      {/* Le panneau gauche (z:3) le couvre dans sa moitié gauche.    */}
      <div
        style={{
          position: 'absolute', inset: 0,
          zIndex: 2,
          perspective: '2400px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            transformOrigin: '50% 50%',
            transform: `rotateY(${angle}deg)`,
            transition: rightTrans,
          }}
        >
          <img src={solutions[frontIdx].image} alt="" className="w-full h-full object-cover" />
          {/* Ombre au centre (bord gauche de la moitié droite) */}
          <div style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: '50%', width: 70,
            background: 'linear-gradient(to right, rgba(0,0,0,0.55), transparent)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>

      {/* ── Couche 3 : PANNEAU GAUCHE statique ───────────────────── */}
      {/* z-index 3 > z-index 2 → couvre toujours la moitié gauche   */}
      {/* de l'élément rotatif, quelle que soit son inclinaison 3D.   */}
      <div
        style={{
          position: 'absolute', top: 0, left: 0, bottom: 0,
          width: '50%',
          overflow: 'hidden',
          zIndex: 3,
        }}
      >
        {/* Image courante — part en fondu pendant le flip */}
        <img
          src={solutions[frontIdx].image}
          alt=""
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100vw', height: '100%', objectFit: 'cover',
            opacity: leftOpacity,
            transition: `opacity ${totalMs}ms ease-in-out`,
          }}
        />
        {/* Image suivante — entre en fondu */}
        <img
          src={solutions[nextIdx].image}
          alt=""
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100vw', height: '100%', objectFit: 'cover',
            opacity: 1 - leftOpacity,
            transition: `opacity ${totalMs}ms ease-in-out`,
          }}
        />
        {/* Ombre vers la reliure */}
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 70,
          background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.5))',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Reliure centrale ───────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute', top: 0, bottom: 0,
          left: '50%', width: 1,
          transform: 'translateX(-50%)',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)',
          zIndex: 4,
          pointerEvents: 'none',
        }}
      />

      {/* ── Label + dots ───────────────────────────────────────────── */}
      <div className="absolute bottom-28 left-0 right-0 text-center pointer-events-none" style={{ zIndex: 10 }}>
        <span className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-medium">
          {solutionLabels?.[frontIdx] || solutions[frontIdx]?.titre}
        </span>
        <div className="mt-3 flex justify-center gap-2">
          {solutions.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-500 rounded-full pointer-events-auto ${
                i === frontIdx ? 'w-8 h-2 bg-gold' : 'w-2 h-2 bg-white/35 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── Titre ──────────────────────────────────────────────────── */}
      <div className="relative text-center px-4 w-full max-w-3xl mx-auto mt-20" style={{ zIndex: 10 }}>
        <div className="backdrop-blur-md bg-dark-DEFAULT/65 border border-white/10 shadow-2xl inline-block w-full px-6 py-8 md:px-10 md:py-10">
          {tagline && (
            <p className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-3">{tagline}</p>
          )}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight">{title}</h1>
          <div className="w-20 h-px bg-gold mx-auto mb-5" />
          {subtitle && (
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/60" style={{ zIndex: 10 }}>
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gold/40 animate-bounce" />
      </div>
    </section>
  )
}
