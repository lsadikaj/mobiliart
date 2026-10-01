import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Home, Layers, Building2, Sparkles, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../ui/SectionTitle'
import { services } from '../../data/services'

const iconMap = {
  Home: <Home size={28} />,
  Layers: <Layers size={28} />,
  Building2: <Building2 size={28} />,
  Sparkles: <Sparkles size={28} />,
}

export default function UniversGrid() {
  const { t } = useTranslation()
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.univers-card')
    if (!cards?.length) return

    // Start hidden
    cards.forEach((card) => card.classList.add('card-hidden'))

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger each card with a staggered delay based on its index
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.remove('card-hidden')
                card.classList.add('card-visible')
              }, i * 180)
            })
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15 }
    )

    // Observe the grid container — fires once when the grid enters the viewport
    if (gridRef.current) obs.observe(gridRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-dark-DEFAULT py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle={t('univers.subtitle')}>
          {t('univers.title')}
        </SectionTitle>

        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const serviceT = t(`univers.services.${service.id}`, { returnObjects: true })
            return (
              <Link
                key={service.id}
                to={service.lien}
                className="univers-card group relative overflow-hidden bg-dark-surface border border-dark-border hover:border-gold/50 transition-all duration-500 rounded-sm"
              >
                <div className="overflow-hidden h-48">
                  <img
                    src={service.image}
                    alt={serviceT?.titre || service.titre}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                  />
                </div>
                <div className="p-6">
                  <div className="text-gold mb-4">{iconMap[service.icon]}</div>
                  <h3 className="font-serif text-lg text-white mb-2 group-hover:text-gold transition-colors">
                    {serviceT?.titre || service.titre}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{serviceT?.description || service.description}</p>
                  <div className="flex items-center text-gold text-xs font-medium tracking-widest uppercase gap-2">
                    {t('univers.discover')}
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
