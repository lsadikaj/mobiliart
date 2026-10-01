import { useEffect, useRef } from 'react'
import { MapPin, Clock, Phone, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../ui/SectionTitle'

export default function ShowroomSection() {
  const { t } = useTranslation()
  const horaires   = t('showroom.hours', { returnObjects: true })
  const sectionRef = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.querySelectorAll('.slide-from-left, .slide-from-right')
            .forEach(el => el.classList.add('slide-visible'))
          obs.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="bg-dark-DEFAULT py-24 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle={t('showroom.subtitle')}>
          {t('showroom.title')}
        </SectionTitle>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Carte — arrive depuis la gauche */}
          <div className="slide-from-left relative overflow-hidden aspect-video rounded-sm">
            <iframe
              title="Mobiliart Showroom"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2729.0!2d6.935!3d46.830!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQ5JzQ4LjAiTiA2wrA1NicwNi4wIkU!5e1!3m2!1sfr!2sch!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full"
            />
            <div className="absolute inset-0 border border-gold/20 pointer-events-none" />
          </div>

          {/* Bloc info — arrive depuis la droite */}
          <div className="slide-from-right">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-px h-12 bg-gold" />
              <div>
                <h3 className="font-serif text-2xl text-white font-bold">{t('showroom.name')}</h3>
                <p className="text-gold text-xs tracking-widest uppercase mt-1">{t('showroom.location')}</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4 text-gray-300">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">{t('showroom.address_label')}</p>
                  <p className="text-gray-400 text-sm">Route de Grandcour 63C<br />1530 Payerne, Suisse</p>
                </div>
              </div>

              <div className="flex items-start gap-4 text-gray-300">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-white font-medium mb-2">{t('showroom.hours_label')}</p>
                  <div className="space-y-1">
                    {horaires.map((h, i) => (
                      <div key={i} className="flex justify-between gap-8 text-sm">
                        <span className="text-gray-400">{h.jour}</span>
                        <span className={h.closed ? 'text-gray-600' : 'text-white'}>{h.heure}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-gray-300">
                <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                  <Phone size={18} className="text-gold" />
                </div>
                <div>
                  <p className="text-white font-medium mb-1">{t('showroom.phone_label')}</p>
                  <a href="tel:+41792924498" className="text-gray-400 text-sm hover:text-gold transition-colors">+41 79 292 44 98</a>
                </div>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gold text-dark-DEFAULT px-6 py-3 text-xs tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors"
            >
              {t('showroom.contact_btn')}
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
