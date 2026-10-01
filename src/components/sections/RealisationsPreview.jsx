import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../ui/SectionTitle'
import { realisations } from '../../data/realisations'

export default function RealisationsPreview() {
  const { t } = useTranslation()
  const featured = realisations.slice(0, 3)
  const gridRef = useRef(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.realisation-card')
    if (!cards?.length) return

    cards.forEach((card) => card.classList.add('card-hidden'))

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

    if (gridRef.current) obs.observe(gridRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="bg-dark-DEFAULT py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle={t('realisations_preview.subtitle')}>
          {t('realisations_preview.title')}
        </SectionTitle>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {featured.map((r) => (
            <div key={r.id} className="realisation-card group bg-dark-surface border border-dark-border hover:border-gold/40 transition-colors duration-500">
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={r.image}
                  alt={r.titre}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <span className="absolute top-4 left-4 bg-gold text-dark-DEFAULT text-[10px] font-semibold tracking-widest uppercase px-3 py-1">
                  {r.categorie}
                </span>
              </div>
              <div className="px-5 py-4 border-t border-dark-border">
                <h3 className="font-serif text-base text-white mb-1 group-hover:text-gold transition-colors">{r.titre}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{r.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/realisations"
            className="inline-flex items-center gap-3 border border-gold text-gold px-8 py-4 text-xs tracking-widest uppercase font-medium hover:bg-gold hover:text-dark-DEFAULT transition-all duration-300"
          >
            {t('realisations_preview.see_all')}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
