import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import GoldDivider from '../components/ui/GoldDivider'
import { Link } from 'react-router-dom'
import { ArrowRight, X } from 'lucide-react'
import { realisations, categoriesRealisations } from '../data/realisations'
import useCardReveal from '../hooks/useCardReveal'

const catKeyMap = {
  'Tout': 'cat_tout',
  'Aménagement intérieur': 'cat_amenagement',
  'Cuisines': 'cat_cuisines',
  'Salle de bain': 'cat_salle_de_bain',
  'Extérieur': 'cat_exterieur',
  'Construction': 'cat_construction',
}

export default function Realisations() {
  const { t } = useTranslation()
  const [activeFilter, setActiveFilter] = useState('Tout')
  const [lightboxImg, setLightboxImg] = useState(null)
  const gridRef = useRef(null)

  // Re-anime les cartes à chaque changement de filtre
  useCardReveal(gridRef, [activeFilter])

  const filtered = activeFilter === 'Tout'
    ? realisations
    : realisations.filter((r) => r.categorie === activeFilter)

  return (
    <>
      <Hero
        title={t('realisations.hero_title')}
        tagline={t('realisations.hero_tagline')}
        subtitle={t('realisations.hero_subtitle')}
        image="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1920&q=90"
        overlayOpacity={60}
        fullHeight
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle>{t('realisations.gallery_title')}</SectionTitle>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categoriesRealisations.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-gold text-dark-DEFAULT'
                    : 'border border-dark-border text-gray-400 hover:border-gold/40 hover:text-gold'
                }`}
              >
                {t(`realisations.${catKeyMap[cat]}`, { defaultValue: cat })}
              </button>
            ))}
          </div>

          <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((r) => (
              <div
                key={r.id}
                className="reveal-card group relative overflow-hidden rounded-sm aspect-square cursor-pointer"
                onClick={() => setLightboxImg(r)}
              >
                <img src={r.image} alt={r.titre} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-DEFAULT/90 via-dark-DEFAULT/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-gold text-xs tracking-widest uppercase">{r.categorie}</span>
                  <h3 className="font-serif text-sm text-white mt-1">{r.titre}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-dark-DEFAULT/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button className="absolute top-6 right-6 text-white hover:text-gold transition-colors" onClick={() => setLightboxImg(null)}>
            <X size={32} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg.image} alt={lightboxImg.titre} className="w-full max-h-[70vh] object-contain" />
            <div className="mt-6 text-center">
              <span className="text-gold text-xs tracking-widest uppercase">{lightboxImg.categorie}</span>
              <h3 className="font-serif text-2xl text-white mt-2">{lightboxImg.titre}</h3>
              <p className="text-gray-400 mt-2">{lightboxImg.description}</p>
            </div>
          </div>
        </div>
      )}

      <GoldDivider />

      <section className="bg-dark-surface py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-gray-300 text-lg mb-8 font-serif">{t('realisations.cta_text')}</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-gold text-dark-DEFAULT px-8 py-4 text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors"
          >
            {t('realisations.cta_btn')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
