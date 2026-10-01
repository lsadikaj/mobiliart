import { Link } from 'react-router-dom'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function PartnerCTA() {
  const { t } = useTranslation()
  const items = t('partner_cta.items', { returnObjects: true })

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gold-dark via-gold to-gold-dark opacity-10" />
      <div className="absolute inset-0 bg-dark-DEFAULT/80" />
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        <span className="inline-block text-gold text-xs tracking-[0.4em] uppercase font-medium mb-4">
          {t('partner_cta.badge')}
        </span>

        <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
          {t('partner_cta.title')}
          <br />
          <span className="text-gradient-gold">{t('partner_cta.title2')}</span>
        </h2>

        <div className="w-16 h-px bg-gold mx-auto mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white">
              <CheckCircle size={18} className="text-gold flex-shrink-0" />
              <span className="text-sm font-medium">{item}</span>
            </div>
          ))}
        </div>

        <div className="inline-block bg-gold text-dark-DEFAULT px-8 py-4 mb-10 font-serif text-2xl font-bold">
          10 – 20%
          <span className="block text-sm font-sans font-normal tracking-widest uppercase mt-1">
            {t('partner_cta.commission_sub')}
          </span>
        </div>

        <div>
          <Link
            to="/apporteur"
            className="inline-flex items-center gap-3 border border-gold text-gold px-8 py-4 text-sm tracking-widest uppercase font-medium hover:bg-gold hover:text-dark-DEFAULT transition-all duration-300"
          >
            {t('partner_cta.cta')}
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
