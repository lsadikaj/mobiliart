import { useState, useRef, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Download, Maximize2, Minimize2, Loader2, AlertCircle, ExternalLink } from 'lucide-react'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

export default function CatalogViewer({ pdfUrl }) {
  const [numPages, setNumPages] = useState(null)
  const [spread, setSpread] = useState(0)
  const [direction, setDirection] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [containerWidth, setContainerWidth] = useState(900)
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [fullscreen])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'Escape' && fullscreen) setFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const isMobile = containerWidth < 680
  const totalSpreads = numPages ? Math.ceil(numPages / 2) : 0
  const leftPage = spread * 2 + 1
  const rightPage = leftPage + 1
  const pageWidth = isMobile
    ? containerWidth - 32
    : Math.floor((containerWidth - 56) / 2)

  const canPrev = spread > 0
  const canNext = spread < totalSpreads - 1

  const goNext = () => { if (canNext) { setDirection(1); setSpread(s => s + 1) } }
  const goPrev = () => { if (canPrev) { setDirection(-1); setSpread(s => s - 1) } }

  const variants = {
    enter: (d) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] } },
    exit: (d) => ({ x: d > 0 ? -80 : 80, opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } }),
  }

  const pageLabel = numPages
    ? rightPage <= numPages
      ? `${leftPage} – ${rightPage} / ${numPages}`
      : `${leftPage} / ${numPages}`
    : '—'

  return (
    <div className={`flex flex-col bg-[#111] border border-dark-border ${
      fullscreen ? 'fixed inset-0 z-[100]' : ''
    }`}>

      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-dark-border flex-shrink-0">
        <span className="text-[11px] tracking-[0.2em] text-gray-500 uppercase font-mono">{pageLabel}</span>
        <div className="flex items-center gap-2">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[11px] tracking-widest uppercase text-gray-400 hover:text-gold transition-colors px-3 py-1.5 border border-dark-border hover:border-gold/40"
          >
            <Download size={11} />
            <span>Télécharger</span>
          </a>
          <button
            onClick={() => setFullscreen(f => !f)}
            className="p-1.5 text-gray-400 hover:text-gold transition-colors border border-dark-border hover:border-gold/40"
            title={fullscreen ? 'Réduire' : 'Plein écran'}
          >
            {fullscreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Pages */}
      <div
        ref={containerRef}
        className="flex-1 flex items-center justify-center overflow-hidden relative"
        style={{ minHeight: fullscreen ? 'calc(100vh - 112px)' : 620, padding: '24px 16px' }}
      >
        {loading && !error && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#111] z-10">
            <Loader2 size={28} className="text-gold animate-spin" />
            <p className="text-[11px] tracking-[0.25em] text-gray-500 uppercase">Chargement du catalogue…</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center gap-4 text-center">
            <AlertCircle size={32} className="text-gray-600" />
            <p className="text-sm text-gray-400">Le catalogue ne peut pas être chargé directement.</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors border border-gold/30 hover:border-gold px-4 py-2"
            >
              <ExternalLink size={13} />
              Ouvrir dans un nouvel onglet
            </a>
          </div>
        )}

        {!error && (
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => { setNumPages(numPages); setLoading(false) }}
            onLoadError={() => { setError(true); setLoading(false) }}
            loading={null}
          >
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={spread}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex items-start justify-center"
                style={{ gap: isMobile ? 0 : 4 }}
              >
                {leftPage <= (numPages ?? 0) && (
                  <div className="shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
                    <Page
                      pageNumber={leftPage}
                      width={pageWidth}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                )}
                {!isMobile && rightPage <= (numPages ?? 0) && (
                  <div className="shadow-[0_8px_40px_rgba(0,0,0,0.8)]">
                    <Page
                      pageNumber={rightPage}
                      width={pageWidth}
                      renderAnnotationLayer={false}
                      renderTextLayer={false}
                    />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </Document>
        )}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-dark-border flex-shrink-0">
        <button
          onClick={goPrev}
          disabled={!canPrev}
          className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-gray-400 hover:text-gold disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={15} />
          <span className="hidden sm:inline">Précédent</span>
        </button>

        {/* Dot navigation — max 30 spreads before switching to numeric */}
        {totalSpreads > 0 && totalSpreads <= 30 ? (
          <div className="flex items-center gap-1 flex-wrap justify-center max-w-xs">
            {Array.from({ length: totalSpreads }).map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > spread ? 1 : -1); setSpread(i) }}
                className={`transition-all ${
                  i === spread
                    ? 'w-4 h-1.5 bg-gold'
                    : 'w-1.5 h-1.5 bg-dark-border hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        ) : totalSpreads > 30 ? (
          <span className="text-[11px] text-gray-500 font-mono">
            {spread + 1} / {totalSpreads}
          </span>
        ) : null}

        <button
          onClick={goNext}
          disabled={!canNext}
          className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-gray-400 hover:text-gold disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  )
}
