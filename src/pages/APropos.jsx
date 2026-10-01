import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import GoldDivider from '../components/ui/GoldDivider'
import { MapPin, Phone, Mail } from 'lucide-react'

export default function APropos() {
  const { t } = useTranslation()
  const valeurs = t('about.values', { returnObjects: true })

  return (
    <>
      <Hero
        title={t('about.hero_title')}
        tagline={t('about.hero_tagline')}
        subtitle={t('about.hero_subtitle')}
        image="https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1920&q=90"
        fullHeight
        overlayOpacity={60}
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <SectionTitle center={false}>{t('about.history_title')}</SectionTitle>
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>{t('about.history_p1')}</p>
                <p>{t('about.history_p2')}</p>
                <p className="text-white font-medium font-serif text-lg">{t('about.history_p3')}</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                alt="Notre équipe Mobiliart"
                className="w-full aspect-[4/3] object-cover rounded-sm"
              />
              <div className="absolute inset-0 border border-gold/20 rounded-sm pointer-events-none" />
            </div>
          </div>

          <GoldDivider className="mb-20" />

          <SectionTitle subtitle={t('about.values_subtitle')}>
            {t('about.values_title')}
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {valeurs.map((v, i) => (
              <div key={i} className="text-center group">
                <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6 group-hover:bg-gold/10 transition-colors">
                  <span className="font-serif text-gold font-bold text-xl">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-serif text-2xl text-gold mb-3">{v.titre}</h3>
                <div className="w-8 h-px bg-gold mx-auto mb-4" />
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{v.desc}</p>
              </div>
            ))}
          </div>

          <GoldDivider className="mb-16" />

          <div className="max-w-2xl mx-auto text-center">
            <SectionTitle>{t('about.find_us')}</SectionTitle>
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <MapPin size={18} className="text-gold" />
                <span>Route de Grandcour 63C, 1530 Payerne, Suisse</span>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Phone size={18} className="text-gold" />
                <a href="tel:+41792924498" className="hover:text-gold transition-colors">+41 79 292 44 98</a>
              </div>
              <div className="flex items-center justify-center gap-3 text-gray-300">
                <Mail size={18} className="text-gold" />
                <a href="mailto:info@mobiliart.ch" className="hover:text-gold transition-colors">info@mobiliart.ch</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
