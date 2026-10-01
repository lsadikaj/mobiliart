import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import GoldDivider from '../components/ui/GoldDivider'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { exclusivites } from '../data/services'
import useCardReveal from '../hooks/useCardReveal'

export default function Exclusivites() {
  const { t } = useTranslation()
  const items = t('exclusivites.items', { returnObjects: true })
  const gridRef = useRef(null)
  useCardReveal(gridRef)

  return (
    <>
      <Hero
        title={t('exclusivites.hero_title')}
        tagline={t('exclusivites.hero_tagline')}
        subtitle={t('exclusivites.hero_subtitle')}
        image="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=90"
        fullHeight
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t('exclusivites.range_subtitle')}>
            {t('exclusivites.range_title')}
          </SectionTitle>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {exclusivites.map((e, i) => (
              <div key={e.id} className="reveal-card group relative overflow-hidden rounded-sm bg-dark-surface border border-gold/20 hover:border-gold/60 transition-all duration-500">
                <div className="overflow-hidden h-72">
                  <img src={e.image} alt={items[i]?.titre || e.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-DEFAULT/70 to-transparent" />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-gold transition-colors">{items[i]?.titre || e.titre}</h3>
                  <p className="text-gray-400 text-sm">{items[i]?.description || e.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      <section className="bg-dark-surface py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-lg mb-8 font-serif">{t('exclusivites.cta_text')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold text-dark-DEFAULT px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors"
          >
            {t('exclusivites.cta_btn')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
