import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

export default function Hero({
  title,
  tagline,
  subtitle,
  image = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&q=90',
  showBadge = false,
  ctaPrimary,
  ctaSecondary,
  fullHeight = true,
  overlayOpacity = 40,
  compact = false,
}) {
  const { t } = useTranslation()

  return (
    <section
      className={`photo-section relative flex items-center justify-center overflow-hidden ${fullHeight ? 'min-h-screen' : 'min-h-[60vh]'}`}
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 w-full mx-auto mt-20 ${compact ? 'max-w-xl' : 'max-w-3xl'}`}>
        <div className={`backdrop-blur-md bg-dark-DEFAULT/65 border border-white/10 shadow-2xl inline-block w-full ${compact ? 'px-6 py-6 md:px-8 md:py-8' : 'px-6 py-8 md:px-10 md:py-10'}`}>
          {showBadge && (
            <div className="mb-6">
              <Badge>{t('hero.showroom_badge')}</Badge>
            </div>
          )}

          {tagline && (
            <p className="text-gold text-xs md:text-sm tracking-[0.4em] uppercase font-medium mb-3">
              {tagline}
            </p>
          )}

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-5 leading-tight">
            {title}
          </h1>

          <div className="w-20 h-px bg-gold mx-auto mb-5" />

          {subtitle && (
            <p className="text-white/90 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              {subtitle}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {ctaPrimary && (
                <Button variant="gold" href={ctaPrimary.href} onClick={ctaPrimary.onClick}>
                  {ctaPrimary.label}
                </Button>
              )}
              {ctaSecondary && (
                <Button variant="white" href={ctaSecondary.href} onClick={ctaSecondary.onClick}>
                  {ctaSecondary.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      {fullHeight && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/60">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gold/40 animate-bounce" />
        </div>
      )}
    </section>
  )
}
