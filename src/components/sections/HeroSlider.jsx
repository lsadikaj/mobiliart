import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import MobiliartLogo from '../ui/MobiliartLogo'

const slides = [
  'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90',
  'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=90',
  'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=90',
  'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=90',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1920&q=90',
]

const ENTER_MS = 2200   // dézoom pour révéler l'image
const EXIT_MS  = 2800   // zoom jusqu'au flou total
const PAUSE_MS = 1000   // pause image nette avant de rezoomer

export default function HeroSlider() {
  const { t } = useTranslation()
  const [index, setIndex]   = useState(0)
  const [phase, setPhase]   = useState('entering') // 'entering' | 'pausing' | 'exiting'
  const [imgKey, setImgKey] = useState(0)           // force re-render pour relancer animation CSS
  const timers = useRef([])

  const clearTimers = () => timers.current.forEach(clearTimeout)

  const runCycle = (i) => {
    clearTimers()
    timers.current = []

    setIndex(i)
    setImgKey(k => k + 1)
    setPhase('entering')

    // Après le dézoom : pause image nette
    timers.current.push(setTimeout(() => {
      setPhase('pausing')

      // Après la pause : zoom jusqu'au flou
      timers.current.push(setTimeout(() => {
        setPhase('exiting')

        // Au pic du zoom flou : on passe à l'image suivante (coupe invisible)
        timers.current.push(setTimeout(() => {
          runCycle((i + 1) % slides.length)
        }, EXIT_MS))

      }, PAUSE_MS))
    }, ENTER_MS))
  }

  useEffect(() => {
    runCycle(0)
    return clearTimers
  }, [])

  const handleDot = (i) => {
    if (i === index) return
    runCycle(i)
  }

  const animClass =
    phase === 'entering' ? 'img-enter' :
    phase === 'exiting'  ? 'img-exit'  : ''

  return (
    <section className="photo-section relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Image de fond */}
      <div className="absolute inset-0">
        <img
          key={imgKey}
          src={slides[index]}
          alt=""
          className={`w-full h-full object-cover ${animClass}`}
          style={{ transformOrigin: 'center center' }}
        />
      </div>

      {/* Rectangle flouté — toujours devant */}
      <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto mt-20">
        <div className="backdrop-blur-md bg-dark-DEFAULT/65 border border-white/10 shadow-2xl inline-block w-full px-6 py-8 md:px-10 md:py-10">
          <div className="mb-6">
            <Badge>{t('hero.showroom_badge')}</Badge>
          </div>
          <p className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-3">
            {t('hero.tagline')}
          </p>
          <div className="mb-5 flex justify-center">
            <MobiliartLogo size="xl" light={false} />
          </div>
          <div className="w-20 h-px bg-gold mx-auto mb-5" />
          <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            {t('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="gold" onClick={() => document.getElementById('univers')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('hero.cta_discover')}
            </Button>
            <Button variant="white" href="/contact">
              {t('hero.cta_devis')}
            </Button>
          </div>
        </div>
      </div>

      {/* Pastilles + Scroll groupés en colonne centrée */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
        <div className="flex gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className={`transition-all duration-500 rounded-full ${
                i === index
                  ? 'w-8 h-2 bg-gold'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
        <div className="flex flex-col items-center gap-2 text-gold/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gold/40 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
