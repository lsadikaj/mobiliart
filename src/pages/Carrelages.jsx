import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Hero from '../components/sections/Hero'
import GoldDivider from '../components/ui/GoldDivider'
import ProductCard from '../components/ui/ProductCard'
import { carrelages, sousCategories } from '../data/carrelages'

const PAGE_SIZE = 12

export default function Carrelages() {
  const [active, setActive] = useState('grands-formats')
  const [visible, setVisible] = useState(PAGE_SIZE)

  const produitsFiltres = carrelages.filter(p => p.subcategorie === active)
  const produitsAffiches = produitsFiltres.slice(0, visible)
  const categorieActive = sousCategories.find(c => c.id === active)

  const changeCategorie = (id) => { setActive(id); setVisible(PAGE_SIZE) }

  return (
    <>
      <Hero
        title="Carrelages"
        tagline="Matériaux • Collections"
        subtitle="Une sélection de carrelages haut de gamme pour chaque projet — grands formats, imitation bois, mosaïques et pierres naturelles."
        image="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1920&q=90"
        fullHeight
      />

      <section className="bg-dark-DEFAULT py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-3 mb-10">
            <Link
              to="/materiaux"
              className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-gray-500 hover:text-gold transition-colors"
            >
              <ArrowLeft size={13} />
              Matériaux
            </Link>
            <span className="text-dark-border">›</span>
            <span className="text-[11px] tracking-widest uppercase text-gold">Carrelages</span>
          </div>

          {/* Sous-catégories */}
          <div className="flex flex-wrap gap-0 border border-dark-border mb-3 w-fit">
            {sousCategories.map(cat => {
              const count = carrelages.filter(p => p.subcategorie === cat.id).length
              return (
                <button
                  key={cat.id}
                  onClick={() => changeCategorie(cat.id)}
                  className={`relative px-5 py-3 text-[11px] tracking-[0.18em] uppercase transition-all font-medium border-r border-dark-border last:border-r-0 ${
                    active === cat.id
                      ? 'bg-gold text-dark-DEFAULT'
                      : 'text-gray-400 hover:text-gold'
                  }`}
                >
                  {cat.label}
                  {count > 0 && (
                    <span className={`ml-2 text-[9px] ${active === cat.id ? 'text-dark-DEFAULT/60' : 'text-gray-600'}`}>
                      {count}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <p className="text-gray-600 text-[11px] tracking-widest uppercase mb-10">
            {produitsFiltres.length > 0
              ? `${produitsFiltres.length} référence${produitsFiltres.length > 1 ? 's' : ''} disponible${produitsFiltres.length > 1 ? 's' : ''}`
              : 'Collection à venir'
            }
          </p>

          <GoldDivider className="mb-12" />

          {/* Grille produits */}
          {produitsFiltres.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-dark-border">
                {produitsAffiches.map(produit => (
                  <div key={produit.ref} className="bg-dark-DEFAULT">
                    <ProductCard product={produit} />
                  </div>
                ))}
              </div>
              {visible < produitsFiltres.length && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setVisible(v => v + PAGE_SIZE)}
                    className="text-[11px] tracking-[0.25em] uppercase text-gold border border-gold/40 hover:border-gold hover:bg-gold hover:text-dark-DEFAULT px-10 py-3.5 transition-all duration-300"
                  >
                    Voir plus — {produitsFiltres.length - visible} restant{produitsFiltres.length - visible > 1 ? 's' : ''}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24">
              <p className="text-gray-500 text-sm mb-2">{categorieActive?.label}</p>
              <p className="text-gray-600 text-xs tracking-widest uppercase">Collection bientôt disponible</p>
              <div className="w-8 h-px bg-gold/40 mx-auto mt-6" />
            </div>
          )}

          {/* Mention hover */}
          {produitsFiltres.length > 0 && (
            <p className="text-center text-gray-600 text-[11px] tracking-wider mt-10">
              <span className="hidden md:inline">Survolez un produit pour le voir en situation réelle</span>
              <span className="md:hidden">Appuyez sur un produit pour le voir en situation réelle</span>
            </p>
          )}

          <GoldDivider className="mt-16 mb-12" />

          {/* CTA */}
          <div className="text-center">
            <p className="font-serif text-xl text-white mb-2">Un projet en tête ?</p>
            <p className="text-gray-400 text-sm mb-8">Notre équipe vous conseille sur le choix des matériaux adapté à votre espace.</p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gold text-dark-DEFAULT px-8 py-4 text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors"
            >
              Demander un conseil gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
