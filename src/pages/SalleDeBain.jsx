import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { Document, Page, pdfjs } from 'react-pdf'
import Hero from '../components/sections/Hero'
import GoldDivider from '../components/ui/GoldDivider'
import SectionTitle from '../components/ui/SectionTitle'
import { cataloguesSalleDeBain, categoriesCatalogues } from '../data/catalogues'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

// Thumbnail card — shows actual PDF cover
function CatalogCard({ catalog, isSelected, onClick }) {
  const [ready, setReady] = useState(false)

  return (
    <button
      onClick={onClick}
      className={`group text-left w-full border transition-all duration-300 bg-dark-surface overflow-hidden ${
        isSelected ? 'border-gold shadow-[0_0_0_1px_#C9A84C]' : 'border-dark-border hover:border-gold/50'
      }`}
    >
      <div className="relative overflow-hidden bg-[#111]">
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center z-10 bg-[#111]">
            <div className="w-5 h-5 border border-gold/30 border-t-gold rounded-full animate-spin" />
          </div>
        )}
        <Document file={catalog.pdf} loading={null} onLoadError={() => setReady(true)}>
          <Page
            pageNumber={1}
            width={220}
            renderAnnotationLayer={false}
            renderTextLayer={false}
            onRenderSuccess={() => setReady(true)}
          />
        </Document>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
          <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {isSelected ? 'En lecture' : 'Ouvrir'}
          </span>
        </div>
        {isSelected && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
        )}
      </div>
      <div className="p-3 border-t border-dark-border">
        <p className={`font-serif text-xs leading-snug transition-colors line-clamp-2 ${isSelected ? 'text-gold' : 'text-white group-hover:text-gold'}`}>
          {catalog.label}
        </p>
        <p className="text-gray-600 text-[10px] tracking-wider uppercase mt-0.5">{catalog.marque}</p>
      </div>
    </button>
  )
}

export default function SalleDeBain() {
  const [activeCategorie, setActiveCategorie] = useState('tous')
  const [selectedCatalog, setSelectedCatalog] = useState(null)
  const viewerRef       = useRef(null)
  const bookInstanceRef = useRef(null)
  const wheelListenerRef = useRef(null)
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const location = useLocation()

  // Override dFlip controls bar background to match site theme
  const applyThemeBg = () => {
    if (!viewerRef.current) return
    const bg = isLight ? '#f0f0ec' : '#1e1e1e'
    viewerRef.current.querySelectorAll('.df-ui-wrapper, .df-ui-controls').forEach(el => {
      el.style.setProperty('background-color', bg, 'important')
    })
  }

  const cataloguesFiltres = activeCategorie === 'tous'
    ? cataloguesSalleDeBain
    : cataloguesSalleDeBain.filter(c => c.categorie === activeCategorie)

  const openCatalog = (catalog) => {
    setSelectedCatalog(catalog)

    setTimeout(() => {
      viewerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

      setTimeout(() => {
        if (!window.$ || !window.DFLIP || !viewerRef.current) return

        // Remove previous wheel listener
        if (wheelListenerRef.current) {
          viewerRef.current.removeEventListener('wheel', wheelListenerRef.current, true)
          wheelListenerRef.current = null
        }

        window.$(viewerRef.current).empty()
        bookInstanceRef.current = null

        bookInstanceRef.current = window.$(viewerRef.current).flipBook(catalog.pdf, {
          source:           catalog.pdf,
          direction:        1,
          pageSize:         0,
          controlsPosition: 'hide',
          duration:         800,
          transparent:      true,   // removes dFlip's default #fff background
        })

        // Block dFlip's scroll-to-zoom in capture phase.
        // Regular scroll (ctrlKey=false) → stop propagation so dFlip never sees it
        //   → browser default (page scroll) still fires since we don't preventDefault.
        // Pinch / ctrl+wheel (ctrlKey=true) → let dFlip handle zoom.
        const stopScrollZoom = (e) => {
          if (!e.ctrlKey) e.stopPropagation()
        }
        wheelListenerRef.current = stopScrollZoom
        viewerRef.current.addEventListener('wheel', stopScrollZoom, { capture: true, passive: true })

        setTimeout(applyThemeBg, 300)
      }, 400)
    }, 80)
  }

  useEffect(() => {
    if (selectedCatalog) applyThemeBg()
  }, [theme]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-open catalog from URL param (?open=<catalogId>)
  useEffect(() => {
    const id = new URLSearchParams(location.search).get('open')
    if (!id) return
    const catalog = cataloguesSalleDeBain.find(c => c.id === id)
    if (!catalog) return
    // Wait for page + dFlip to be ready
    const t = setTimeout(() => openCatalog(catalog), 600)
    return () => clearTimeout(t)
  }, [location.search]) // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        if (wheelListenerRef.current) {
          viewerRef.current.removeEventListener('wheel', wheelListenerRef.current, true)
        }
        if (window.$) window.$(viewerRef.current).empty()
      }
    }
  }, [])

  return (
    <>
      <Hero
        title="Salle de bain"
        tagline="Aménagement • Collections"
        subtitle="Découvrez nos catalogues de meubles, sanitaires et robinetterie pour créer votre salle de bain idéale."
        image="/images/salle-de-bain-luxe-noir.jpg"
        fullHeight
      />

      <section className="bg-dark-DEFAULT py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-12">
            <Link to="/amenagement" className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-gray-500 hover:text-gold transition-colors">
              <ArrowLeft size={13} />
              Aménagement
            </Link>
            <span className="text-dark-border">›</span>
            <span className="text-[11px] tracking-widest uppercase text-gold">Salle de bain</span>
          </div>

          <SectionTitle subtitle="Cliquez sur une couverture pour feuilleter le catalogue directement dans la page">
            Nos Catalogues
          </SectionTitle>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-0 border border-dark-border mb-8 w-fit">
            {categoriesCatalogues.map(cat => {
              const count = cat.id === 'tous'
                ? cataloguesSalleDeBain.length
                : cataloguesSalleDeBain.filter(c => c.categorie === cat.id).length
              if (count === 0 && cat.id !== 'tous') return null
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategorie(cat.id)}
                  className={`px-5 py-3 text-[11px] tracking-[0.18em] uppercase transition-all font-medium border-r border-dark-border last:border-r-0 ${
                    activeCategorie === cat.id ? 'bg-gold text-dark-DEFAULT' : 'text-gray-400 hover:text-gold'
                  }`}
                >
                  {cat.label}
                  <span className={`ml-2 text-[9px] ${activeCategorie === cat.id ? 'text-dark-DEFAULT/60' : 'text-gray-600'}`}>
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Catalog grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mb-14">
            {cataloguesFiltres.map(cat => (
              <CatalogCard
                key={cat.id}
                catalog={cat}
                isSelected={selectedCatalog?.id === cat.id}
                onClick={() => openCatalog(cat)}
              />
            ))}
          </div>

          {/* ── Inline dFlip container ── */}
          {selectedCatalog && (
            <>
              <GoldDivider className="mb-10" />
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-white">{selectedCatalog.label}</h3>
                  <p className="text-gray-500 text-[11px] tracking-widest uppercase mt-1">{selectedCatalog.marque}</p>
                </div>
                <button
                  onClick={() => { setSelectedCatalog(null); if (viewerRef.current && window.$) window.$(viewerRef.current).empty() }}
                  className="text-[11px] tracking-widest uppercase text-gray-500 hover:text-gold transition-colors border border-dark-border hover:border-gold/40 px-4 py-2"
                >
                  Fermer
                </button>
              </div>
            </>
          )}

          {/* dFlip renders inside this div — always in DOM so ref is stable */}
          <div
            ref={viewerRef}
            className={`w-full scroll-mt-24 transition-all duration-300 ${selectedCatalog ? 'block' : 'hidden'}`}
            style={{ height: 680, minHeight: 500 }}
          />

          <GoldDivider className="mt-16 mb-12" />

          <div className="text-center">
            <p className="font-serif text-xl text-white mb-2">Un projet de salle de bain ?</p>
            <p className="text-gray-400 text-sm mb-8">Notre équipe vous guide dans le choix des meubles et équipements adaptés.</p>
            <Link to="/contact" className="inline-flex items-center gap-3 bg-gold text-dark-DEFAULT px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors">
              Demander un conseil gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
