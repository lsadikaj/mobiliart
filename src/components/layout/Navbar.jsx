import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Globe, Sun, Moon, ChevronRight, ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/ThemeContext'
import MobiliartLogo from '../ui/MobiliartLogo'

// ── Mega-menu data ────────────────────────────────────────────────────────────
const megaMenu = {
  amenagement: [
    { label: 'Tous les aménagements',   href: '/amenagement',             top: true },
    { label: 'Salles de bain',          href: '/amenagement/salle-de-bain',
      sub: [
        { label: 'Toutes les salles de bain',  href: '/amenagement/salle-de-bain', top: true },
        { label: 'Meubles de salle de bain',   href: '/amenagement/salle-de-bain?open=meubles-salle-de-bain' },
        { label: 'Baignoires & hydromassage',  href: '/amenagement/salle-de-bain' },
        { label: 'Parois de douche',           href: '/amenagement/salle-de-bain' },
        { label: 'Sanitaires',                 href: '/amenagement/salle-de-bain' },
        { label: 'Robinetterie',               href: '/amenagement/salle-de-bain' },
      ],
    },
    { label: 'Cuisines sur mesure',     href: '/amenagement' },
    { label: 'Dressings & rangements',  href: '/amenagement' },
    { label: 'Mobilier personnalisé',   href: '/amenagement' },
    { label: 'Revêtements & finitions', href: '/amenagement' },
  ],
  materiaux: [
    { label: 'Tous les matériaux',               href: '/materiaux',            top: true },
    { label: 'Carrelage',                         href: '/materiaux/carrelages' },
    { label: 'Parquet',                           href: '/materiaux' },
    { label: 'Pierre naturelle, marbre & granit', href: '/materiaux' },
    { label: 'Fenêtres & portes',                 href: '/materiaux' },
    { label: 'Stores & protections solaires',     href: '/materiaux' },
  ],
  construction: [
    { label: 'Toutes les constructions',       href: '/construction', top: true },
    { label: 'Structures métalliques',         href: '/construction' },
    { label: 'Pergolas & vérandas',            href: '/construction' },
    { label: 'Garde-corps',                    href: '/construction' },
    { label: 'Portes de garage',               href: '/construction' },
    { label: 'Stores & protections solaires',  href: '/construction' },
    { label: 'Decks extérieurs',               href: '/construction' },
  ],
  exclusivites: [
    { label: 'Toutes les exclusivités',           href: '/exclusivites', top: true },
    { label: 'Boca do Lobo',                      href: '/exclusivites' },
    { label: 'Sculptures en bois naturel',        href: '/exclusivites' },
    { label: 'Sculptures en résine artistiques',  href: '/exclusivites' },
    { label: 'Mobilier haut de gamme',            href: '/exclusivites' },
  ],
}

const navLinks = [
  { key: 'amenagement', href: '/amenagement' },
  { key: 'materiaux',   href: '/materiaux'   },
  { key: 'construction',href: '/construction'},
  { key: 'realisations',href: '/realisations'},
  { key: 'exclusivites',href: '/exclusivites'},
  { key: 'espace_pro',  href: '/espace-pro'  },
  { key: 'apporteur',   href: '/apporteur'   },
  { key: 'a_propos',    href: '/a-propos'    },
]

const langLabels = { fr: 'FR', en: 'EN', de: 'DE', it: 'IT' }

export default function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [langOpen,  setLangOpen]  = useState(false)
  const [openMenu,  setOpenMenu]  = useState(null) // key of open mega-menu
  const [openSub,   setOpenSub]   = useState(null) // label of hovered sub item
  const [mobileExp, setMobileExp] = useState({})   // expanded keys in mobile menu
  const { t, i18n }  = useTranslation()
  const location     = useLocation()
  const { theme, toggleTheme } = useTheme()
  const langRef      = useRef(null)
  const closeTimer   = useRef(null)
  const isLight = theme === 'light'

  useEffect(() => {
    window.addEventListener('scroll', () => {})
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setLangOpen(false)
    setOpenMenu(null)
    setOpenSub(null)
  }, [location])

  useEffect(() => {
    const fn = (e) => { if (langRef.current && !langRef.current.contains(e.target)) setLangOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const langs = ['fr', 'en', 'de', 'it']
  const currentLang = i18n.language?.slice(0, 2) || 'fr'

  const openDropdown  = (key) => { clearTimeout(closeTimer.current); setOpenMenu(key); setOpenSub(null) }
  const scheduleClose = ()    => { closeTimer.current = setTimeout(() => { setOpenMenu(null); setOpenSub(null) }, 180) }
  const cancelClose   = ()    => clearTimeout(closeTimer.current)

  const navBg  = isLight ? '#f0f0ec' : '#1e1e1e'
  const border = 'border-gold/20'

  const itemCls = (active) =>
    `block w-full text-left px-5 py-2.5 text-[11px] tracking-[0.14em] uppercase font-medium transition-colors whitespace-nowrap ${
      active
        ? 'text-gold bg-gold/10'
        : isLight ? 'text-gray-700 hover:text-gold hover:bg-gold/5' : 'text-gray-300 hover:text-gold hover:bg-gold/5'
    }`

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-gold/30 shadow-xl transition-colors duration-300"
      style={{ backgroundColor: navBg }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 min-[1350px]:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-[2px] h-11 bg-gold flex-shrink-0" />
            <div className="flex flex-col gap-[5px]">
              <MobiliartLogo size="md" light={isLight} />
              <div className="flex items-center gap-1">
                {['Concevoir', 'Fournir', 'Réaliser'].map((w, i) => (
                  <span key={w} className="text-gold text-[8px] tracking-[0.22em] uppercase font-light leading-none">
                    {i > 0 && <span className="mr-1 opacity-40">·</span>}{w}
                  </span>
                ))}
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden min-[1360px]:flex items-center gap-0.5 flex-1 justify-center px-4">
            {navLinks.map((link) => {
              const hasMenu = !!megaMenu[link.key]
              const isActive = location.pathname === link.href || location.pathname.startsWith(link.href + '/')

              return (
                <div
                  key={link.key}
                  className="relative"
                  onMouseEnter={() => hasMenu ? openDropdown(link.key) : setOpenMenu(null)}
                  onMouseLeave={scheduleClose}
                >
                  <Link
                    to={link.href}
                    onClick={() => { setOpenMenu(null); isActive && window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                    className={`flex items-center gap-0.5 px-2 py-2 text-[11px] tracking-wider uppercase font-medium whitespace-nowrap transition-colors ${
                      isActive ? 'text-gold' : isLight ? 'text-gray-600 hover:text-gold' : 'text-gray-300 hover:text-gold'
                    }`}
                  >
                    {t(`nav.${link.key}`)}
                    {hasMenu && <ChevronDown size={10} className="opacity-50 mt-0.5" />}
                  </Link>

                  {/* Mega-dropdown */}
                  {hasMenu && openMenu === link.key && (
                    <div
                      className={`absolute top-full left-0 flex shadow-2xl border ${border} z-[60]`}
                      style={{ backgroundColor: navBg }}
                      onMouseEnter={cancelClose}
                      onMouseLeave={scheduleClose}
                    >
                      {/* Level 1 items */}
                      <div className="min-w-[230px] py-2">
                        {megaMenu[link.key].map((item) => (
                          <div
                            key={item.label}
                            className={`relative ${item.top ? 'border-b border-dark-border/60 mb-1' : ''}`}
                            onMouseEnter={() => setOpenSub(item.sub ? item.label : null)}
                          >
                            <Link
                              to={item.href}
                              onClick={() => setOpenMenu(null)}
                              className={`${itemCls(openSub === item.label)} flex items-center justify-between gap-3 ${item.top ? 'font-semibold text-gold/90' : ''}`}
                            >
                              {item.label}
                              {item.sub && <ChevronRight size={12} className="text-gold/60 flex-shrink-0" />}
                            </Link>
                          </div>
                        ))}
                      </div>

                      {/* Level 2 sub-panel — appears beside level 1 */}
                      {openSub && (() => {
                        const parent = megaMenu[link.key].find(i => i.label === openSub)
                        return parent?.sub ? (
                          <div className={`min-w-[220px] py-2 border-l ${border}`}>
                            {parent.sub.map((sub) => (
                              <Link
                                key={sub.label}
                                to={sub.href}
                                onClick={() => setOpenMenu(null)}
                                className={`${itemCls(false)} ${sub.top ? 'border-b border-dark-border/60 mb-1 font-semibold text-gold/90' : ''}`}
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        ) : null
                      })()}
                    </div>
                  )}
                </div>
              )
            })}

            <Link
              to="/contact"
              onClick={() => location.pathname === '/contact' && window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="ml-2 bg-gold text-dark-DEFAULT px-4 py-2 text-[11px] tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors whitespace-nowrap flex-shrink-0"
            >
              {t('nav.devis')}
            </Link>
          </nav>

          {/* Right controls — desktop */}
          <div className="hidden min-[1350px]:flex items-center gap-2 flex-shrink-0">
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 border border-gold/30 text-[10px] tracking-widest uppercase font-medium transition-colors ${
                  isLight ? 'text-gray-600 hover:text-gold hover:border-gold/60' : 'text-gray-400 hover:text-white hover:border-gold/60'
                }`}
                aria-label="Changer de langue"
              >
                <Globe size={13} />
                <span>{langLabels[currentLang] ?? currentLang.toUpperCase()}</span>
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1.5 border border-gold/30 min-w-[72px] shadow-xl z-50" style={{ backgroundColor: navBg }}>
                  {langs.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => { i18n.changeLanguage(lang); setLangOpen(false) }}
                      className={`w-full text-left px-3 py-2 text-[10px] tracking-widest uppercase font-medium transition-colors ${
                        currentLang === lang ? 'text-gold bg-gold/10'
                          : isLight ? 'text-gray-600 hover:text-gold hover:bg-gold/5'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {langLabels[lang]}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={toggleTheme}
              className={`p-1.5 border border-gold/30 transition-colors hover:border-gold/60 ${
                isLight ? 'text-gray-600 hover:text-gold' : 'text-gray-400 hover:text-gold'
              }`}
              aria-label="Changer le thème"
            >
              {isLight ? <Moon size={14} /> : <Sun size={14} />}
            </button>
          </div>

          {/* Mobile right side */}
          <div className="min-[1350px]:hidden flex items-center gap-1">
            <button onClick={toggleTheme} className={`p-2 transition-colors ${isLight ? 'text-gray-700 hover:text-gold' : 'text-white hover:text-gold'}`} aria-label="Changer le thème">
              {isLight ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button className={`p-2 transition-colors ${isLight ? 'text-gray-700 hover:text-gold' : 'text-white hover:text-gold'}`} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`min-[1350px]:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} backdrop-blur-md border-t`}
        style={{ backgroundColor: isLight ? '#f0f0ec' : 'rgba(30,30,30,0.98)', borderColor: isLight ? '#d4d4ce' : '#383838' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1">
          {navLinks.map((link) => {
            const hasMenu = !!megaMenu[link.key]
            const isExpanded = mobileExp[link.key]
            return (
              <div key={link.key}>
                <div className="flex items-center justify-between">
                  <Link
                    to={link.href}
                    className={`flex-1 py-3 px-4 text-sm tracking-widest uppercase border-b transition-colors ${
                      location.pathname === link.href ? 'text-gold' : isLight ? 'text-gray-700 hover:text-gold' : 'text-gray-300 hover:text-gold'
                    }`}
                    style={{ borderColor: isLight ? '#d4d4ce' : '#383838' }}
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                  {hasMenu && (
                    <button
                      onClick={() => setMobileExp(p => ({ ...p, [link.key]: !p[link.key] }))}
                      className="px-3 py-3 text-gold border-b"
                      style={{ borderColor: isLight ? '#d4d4ce' : '#383838' }}
                    >
                      <ChevronDown size={14} className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {/* Mobile sub-items */}
                {hasMenu && isExpanded && (
                  <div className="pl-4 border-l border-gold/20 ml-4 mt-1 mb-2">
                    {megaMenu[link.key].map(item => (
                      <div key={item.label}>
                        <Link
                          to={item.href}
                          className={`block py-2 px-3 text-xs tracking-wider uppercase transition-colors ${item.top ? 'text-gold font-semibold' : isLight ? 'text-gray-600 hover:text-gold' : 'text-gray-400 hover:text-gold'}`}
                        >
                          {item.label}
                        </Link>
                        {item.sub && (
                          <div className="pl-3 border-l border-gold/10 ml-2 mb-1">
                            {item.sub.map(sub => (
                              <Link key={sub.label} to={sub.href} className={`block py-1.5 px-3 text-[11px] tracking-wider uppercase transition-colors ${sub.top ? 'text-gold/80' : isLight ? 'text-gray-500 hover:text-gold' : 'text-gray-500 hover:text-gold'}`}>
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}

          <div className="flex items-center gap-4 mt-4 pt-4">
            <Link to="/contact" className="flex-1 text-center bg-gold text-dark-DEFAULT py-3 text-xs tracking-widest uppercase font-semibold">
              {t('nav.devis')}
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1 pt-3 border-t mt-2" style={{ borderColor: isLight ? '#d4d4ce' : '#383838' }}>
            <Globe size={13} className="text-gold mr-1 flex-shrink-0" />
            {langs.map((lang) => (
              <button
                key={lang}
                onClick={() => { i18n.changeLanguage(lang); setMenuOpen(false) }}
                className={`px-3 py-1.5 text-xs tracking-widest uppercase font-medium transition-colors ${
                  currentLang === lang ? 'text-gold border-b border-gold' : isLight ? 'text-gray-500 hover:text-gold' : 'text-gray-500 hover:text-white'
                }`}
              >
                {langLabels[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
