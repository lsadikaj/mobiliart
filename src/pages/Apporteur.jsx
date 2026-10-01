import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import GoldDivider from '../components/ui/GoldDivider'
import { CheckCircle2 } from 'lucide-react'

export default function Apporteur() {
  const { t } = useTranslation()
  const checkpoints = t('apporteur.checkpoints', { returnObjects: true })
  const etapes = t('apporteur.etapes', { returnObjects: true })
  const timeline = t('apporteur.timeline', { returnObjects: true })
  const cibles = t('apporteur.cibles', { returnObjects: true })

  const [form, setForm] = useState({ nom: '', telephone: '', email: '', adresse: '', message: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const phone = '41792924498'
    const msg = encodeURIComponent(
      `Inscription Programme Apporteur d'Affaires - Mobiliart\n\nNom/Société: ${form.nom}\nTéléphone: ${form.telephone}\nEmail: ${form.email}\nAdresse: ${form.adresse}\nMessage: ${form.message}`
    )
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  return (
    <>
      <Hero
        title={t('apporteur.hero_title')}
        tagline={t('apporteur.hero_tagline')}
        subtitle={t('apporteur.hero_subtitle')}
        image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=90"
        fullHeight
        overlayOpacity={65}
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">

          <div className="max-w-3xl mx-auto text-center mb-20">
            <SectionTitle subtitle={t('apporteur.opportunity_subtitle')}>
              {t('apporteur.opportunity_title')}
            </SectionTitle>

            <div className="space-y-4 text-left max-w-md mx-auto mb-10">
              {checkpoints.map((c, i) => (
                <div key={i} className="flex items-center gap-4">
                  <CheckCircle2 size={20} className="text-gold flex-shrink-0" />
                  <span className="text-white text-sm">{c}</span>
                </div>
              ))}
            </div>

            <div className="bg-gold text-dark-DEFAULT inline-block px-12 py-6">
              <div className="font-serif text-4xl font-bold">10 – 20%</div>
              <div className="text-xs tracking-[0.3em] uppercase font-medium mt-1">{t('apporteur.commission_label')}</div>
            </div>
          </div>

          <GoldDivider className="mb-20" />

          <SectionTitle subtitle={t('apporteur.how_subtitle')}>
            {t('apporteur.how_title')}
          </SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {etapes.map((e, i) => (
              <div key={i} className="bg-dark-surface border border-dark-border p-8 hover:border-gold/40 transition-all duration-300">
                <div className="font-serif text-4xl font-bold text-gold/20 mb-4">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-serif text-lg text-white mb-3">{e.titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>

          <GoldDivider className="mb-20" />

          <SectionTitle subtitle={t('apporteur.timeline_subtitle')}>
            {t('apporteur.timeline_title')}
          </SectionTitle>

          <div className="relative mb-20 overflow-x-auto">
            <div className="flex items-center justify-between min-w-max mx-auto px-4 gap-0">
              {timeline.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                      i === timeline.length - 1
                        ? 'bg-gold border-gold text-dark-DEFAULT'
                        : 'border-gold/50 text-gold bg-dark-surface'
                    }`}>
                      {i + 1}
                    </div>
                    <p className={`mt-3 text-xs text-center max-w-[100px] ${i === timeline.length - 1 ? 'text-gold font-semibold' : 'text-gray-400'}`}>
                      {step}
                    </p>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-16 md:w-24 h-px bg-gold/30 mx-2 mt-[-20px]" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-20">
            <h3 className="font-serif text-2xl text-white mb-6">{t('apporteur.targets_title')}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {cibles.map((c) => (
                <span key={c} className="border border-gold/40 text-gold text-xs tracking-widest uppercase px-5 py-2">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <GoldDivider className="mb-16" />

          <div className="max-w-2xl mx-auto">
            <SectionTitle subtitle={t('apporteur.form_subtitle')}>
              {t('apporteur.form_title')}
            </SectionTitle>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'nom', label: t('apporteur.field_nom'), type: 'text', required: true },
                { name: 'telephone', label: t('apporteur.field_telephone'), type: 'tel', required: true },
                { name: 'email', label: t('apporteur.field_email'), type: 'email', required: true },
                { name: 'adresse', label: t('apporteur.field_adresse'), type: 'text' },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={form[f.name]}
                    onChange={handleChange}
                    required={f.required}
                    className="w-full bg-dark-surface border border-dark-border focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">{t('apporteur.field_message')}</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-dark-surface border border-dark-border focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-dark-DEFAULT py-4 text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors"
              >
                {t('apporteur.submit_btn')}
              </button>
            </form>

            <p className="text-gray-600 text-xs mt-6 leading-relaxed text-center">
              {t('apporteur.legal_text')}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
