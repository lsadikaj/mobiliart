import { useState } from 'react'
import Hero from '../components/sections/Hero'
import CatalogViewer from '../components/ui/CatalogViewer'
import GoldDivider from '../components/ui/GoldDivider'

const catalogues = [
  {
    id: 'mobiliart',
    label: 'Catalogue Mobiliart',
    sub: 'Mobilier & Aménagement intérieur',
    pdfUrl: 'https://www.mobiliart.ch/wp-content/uploads/2023/02/Mobiliart-Catalogue.-1.pdf',
  },
  {
    id: 'ipl',
    label: 'Catalogue IPL Fournitures',
    sub: 'Matériaux, quincaillerie & fournitures',
    pdfUrl: 'https://www.ipl-fournitures.ch/wp-content/uploads/2022/08/IPL_compressed-1.pdf',
  },
]

export default function Catalogue() {
  const [active, setActive] = useState('mobiliart')
  const current = catalogues.find(c => c.id === active)

  return (
    <>
      <Hero
        title="Nos Catalogues"
        tagline="Collections & Fournitures"
        subtitle="Explorez l'intégralité de nos collections de mobilier haut de gamme et de nos fournitures professionnelles"
        image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=90"
        fullHeight
      />

      <section className="bg-dark-DEFAULT py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tab switcher */}
          <div className="flex justify-center mb-3">
            <div className="flex border border-dark-border">
              {catalogues.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`px-6 md:px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase transition-all font-medium ${
                    active === c.id
                      ? 'bg-gold text-dark-DEFAULT'
                      : 'text-gray-400 hover:text-gold'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-center text-gray-500 text-xs tracking-widest uppercase mb-10">
            {current.sub}
          </p>

          <GoldDivider className="mb-10" />

          {/* Viewer — key resets state when catalog changes */}
          <CatalogViewer key={active} pdfUrl={current.pdfUrl} />

          {/* Hint */}
          <p className="text-center text-gray-600 text-[11px] tracking-wider mt-6">
            Utilisez les flèches ← → du clavier ou les boutons pour naviguer entre les pages
          </p>
        </div>
      </section>
    </>
  )
}
