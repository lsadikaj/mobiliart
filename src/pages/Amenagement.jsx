import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import PentagonSlider from '../components/sections/PentagonSlider'
import SectionTitle from '../components/ui/SectionTitle'
import GoldDivider from '../components/ui/GoldDivider'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { amenagementSolutions } from '../data/services'
import useCardReveal from '../hooks/useCardReveal'

export default function Amenagement() {
  const { t } = useTranslation()
  const solutionLabels = t('amenagement.solutions', { returnObjects: true })
  const gridRef = useRef(null)
  useCardReveal(gridRef)

  return (
    <>
      <PentagonSlider
        solutions={amenagementSolutions}
        solutionLabels={solutionLabels}
        title={t('amenagement.hero_title')}
        tagline={t('amenagement.hero_tagline')}
        subtitle={t('amenagement.hero_subtitle')}
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t('amenagement.solutions_subtitle')}>
            {t('amenagement.solutions_title')}
          </SectionTitle>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {amenagementSolutions.map((s, i) => {
              const Inner = (
                <>
                  <div className="overflow-hidden h-56">
                    <img src={s.image} alt={solutionLabels[i] || s.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{solutionLabels[i] || s.titre}</h3>
                    {s.lien && (
                      <ExternalLink size={15} className="text-gray-600 group-hover:text-gold transition-colors flex-shrink-0 ml-3" />
                    )}
                  </div>
                </>
              )
              return s.lien ? (
                <Link
                  key={s.id}
                  to={s.lien}
                  className="reveal-card group relative overflow-hidden rounded-sm bg-dark-surface border border-dark-border hover:border-gold/40 transition-all duration-500"
                >
                  {Inner}
                </Link>
              ) : (
                <div key={s.id} className="reveal-card group relative overflow-hidden rounded-sm bg-dark-surface border border-dark-border hover:border-gold/40 transition-all duration-500">
                  {Inner}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <GoldDivider />

      <section className="bg-dark-surface py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-lg mb-8 font-serif">{t('amenagement.cta_text')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold text-dark-DEFAULT px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors"
          >
            {t('amenagement.cta_btn')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
