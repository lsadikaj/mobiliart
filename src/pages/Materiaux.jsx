import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import DrumSlider from '../components/sections/DrumSlider'
import SectionTitle from '../components/ui/SectionTitle'
import GoldDivider from '../components/ui/GoldDivider'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { materiauxGammes } from '../data/services'
import useCardReveal from '../hooks/useCardReveal'

export default function Materiaux() {
  const { t } = useTranslation()
  const gammeLabels = t('materiaux.gammes', { returnObjects: true })
  const etapes = t('materiaux.etapes', { returnObjects: true })
  const gammesRef = useRef(null)
  const etapesRef = useRef(null)
  useCardReveal(gammesRef)
  useCardReveal(etapesRef)

  return (
    <>
      <DrumSlider
        solutions={materiauxGammes}
        solutionLabels={gammeLabels}
        title={t('materiaux.hero_title')}
        tagline={t('materiaux.hero_tagline')}
        subtitle={t('materiaux.hero_subtitle')}
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t('materiaux.gammes_subtitle')}>
            {t('materiaux.gammes_title')}
          </SectionTitle>

          <div ref={gammesRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {materiauxGammes.map((g, i) => {
              const inner = (
                <div className="group relative overflow-hidden bg-dark-surface border border-dark-border hover:border-gold/50 transition-all duration-500 cursor-pointer">
                  <div className="overflow-hidden h-56">
                    <img src={g.image} alt={gammeLabels[i] || g.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-6 flex items-center justify-between">
                    <h3 className="font-serif text-xl text-white group-hover:text-gold transition-colors">{gammeLabels[i] || g.titre}</h3>
                    {g.lien && <ChevronRight size={18} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity" />}
                  </div>
                  {g.lien && <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold group-hover:w-full transition-all duration-500" />}
                </div>
              )
              return g.lien
                ? <Link key={g.id} to={g.lien} className="reveal-card block">{inner}</Link>
                : <div key={g.id} className="reveal-card">{inner}</div>
            })}
          </div>

          <GoldDivider className="mb-20" />

          <SectionTitle subtitle={t('materiaux.process_subtitle')}>
            {t('materiaux.process_title')}
          </SectionTitle>

          <div ref={etapesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {etapes.map((e, i) => (
              <div key={i} className="reveal-card bg-dark-surface border border-dark-border p-6 relative">
                <div className="font-serif text-4xl font-bold text-gold/20 mb-4">{String(i + 1).padStart(2, '0')}</div>
                <p className="text-gray-300 text-sm leading-relaxed">{e}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider />

      <section className="bg-dark-surface py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-lg mb-8 font-serif">{t('materiaux.cta_text')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold text-dark-DEFAULT px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors"
          >
            {t('materiaux.cta_btn')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
