import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import BookSlider from '../components/sections/BookSlider'
import SectionTitle from '../components/ui/SectionTitle'
import GoldDivider from '../components/ui/GoldDivider'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { constructionSolutions } from '../data/services'
import useCardReveal from '../hooks/useCardReveal'

export default function Construction() {
  const { t } = useTranslation()
  const solutionData = t('construction.solutions', { returnObjects: true })
  const gridRef = useRef(null)
  useCardReveal(gridRef)

  return (
    <>
      <BookSlider
        solutions={constructionSolutions}
        solutionLabels={solutionData.map(s => s.titre)}
        title={t('construction.hero_title')}
        tagline={t('construction.hero_tagline')}
        subtitle={t('construction.hero_subtitle')}
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t('construction.solutions_subtitle')}>
            {t('construction.solutions_title')}
          </SectionTitle>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {constructionSolutions.map((s, i) => (
              <div key={s.id} className="reveal-card group relative overflow-hidden rounded-sm bg-dark-surface border border-dark-border hover:border-gold/40 transition-all duration-500">
                <div className="overflow-hidden h-48">
                  <img src={s.image} alt={solutionData[i]?.titre || s.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-white mb-2 group-hover:text-gold transition-colors">{solutionData[i]?.titre || s.titre}</h3>
                  <p className="text-gray-400 text-sm">{solutionData[i]?.desc || s.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      <section className="bg-dark-surface py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-lg mb-8 font-serif">{t('construction.cta_text')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold text-dark-DEFAULT px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors"
          >
            {t('construction.cta_btn')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
