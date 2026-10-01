import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const [showAmbiance, setShowAmbiance] = useState(false)

  return (
    <div className="group relative bg-dark-surface border border-dark-border hover:border-gold/50 transition-all duration-500">

      {/* Image zone */}
      <div
        className="relative overflow-hidden cursor-pointer"
        style={{ aspectRatio: '4/3' }}
        onClick={() => setShowAmbiance(v => !v)}
      >
        {/* Ambiance */}
        <img
          src={product.imageAmbiance}
          alt={`${product.nom} en situation`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
            ${showAmbiance ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}
        />
        {/* Produit */}
        <img
          src={product.imageProduit}
          alt={`Référence ${product.ref}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out
            ${showAmbiance ? 'opacity-0' : 'opacity-100 md:group-hover:opacity-0'}`}
        />

        {/* Badge référence */}
        <div className={`absolute top-3 left-3 bg-dark-DEFAULT/80 backdrop-blur-sm px-2 py-1 transition-opacity duration-300
          ${showAmbiance ? 'opacity-0' : 'opacity-100 md:group-hover:opacity-0'}`}>
          <span className="text-gold text-[10px] tracking-[0.2em] uppercase font-mono">
            {product.ref}
          </span>
        </div>

        {/* Overlay CTA — desktop hover */}
        <div className="absolute inset-0 bg-dark-DEFAULT/40 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-end justify-center pb-6">
          <Link
            to="/contact"
            onClick={e => e.stopPropagation()}
            className="text-[10px] tracking-[0.25em] uppercase font-semibold bg-gold text-dark-DEFAULT px-5 py-2.5 hover:bg-gold-light transition-colors"
          >
            Demander un devis
          </Link>
        </div>

        {/* Indicateur mobile (deux points) */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 md:hidden">
          <div className={`h-1.5 transition-all duration-300 ${!showAmbiance ? 'w-4 bg-gold' : 'w-1.5 bg-white/40'}`} />
          <div className={`h-1.5 transition-all duration-300 ${showAmbiance ? 'w-4 bg-gold' : 'w-1.5 bg-white/40'}`} />
        </div>
      </div>

      {/* Info */}
      <div className="px-5 py-4 border-t border-dark-border">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-white font-serif text-base leading-tight mb-1">{product.nom}</p>
            <p className="text-gray-500 text-[11px] tracking-widest uppercase">{product.serie}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-gray-400 text-[11px] leading-tight">{product.format}</p>
            <p className="text-gray-600 text-[10px] mt-0.5">{product.finition}</p>
          </div>
        </div>
        {/* CTA mobile */}
        <Link
          to="/contact"
          className="mt-4 w-full text-center block text-[10px] tracking-[0.25em] uppercase font-semibold border border-gold/40 text-gold px-4 py-2.5 hover:bg-gold hover:text-dark-DEFAULT transition-all md:hidden"
        >
          Demander un devis
        </Link>
      </div>
    </div>
  )
}
