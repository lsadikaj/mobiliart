import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import { MapPin, Phone, Mail, Globe, Clock, MessageCircle } from 'lucide-react'

export default function Contact() {
  const { t } = useTranslation()
  const projectTypes = t('contact.project_types', { returnObjects: true })
  const horaires = t('contact.hours', { returnObjects: true })

  const [form, setForm] = useState({
    nom: '', prenom: '', telephone: '', email: '',
    projectType: '', date: '', message: '',
    acceptTerms: false, alerteOffres: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const phone = '41792924498'
    const message = encodeURIComponent(
      `Nouvelle demande - Mobiliart\n\n` +
      `Nom: ${form.nom} ${form.prenom}\n` +
      `Email: ${form.email}\n` +
      `Téléphone: ${form.telephone}\n` +
      `Type de projet: ${form.projectType}\n` +
      `Date souhaitée: ${form.date}\n` +
      `Message: ${form.message}`
    )
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank')
  }

  return (
    <>
      <Hero
        title={t('contact.hero_title')}
        tagline={t('contact.hero_tagline')}
        subtitle={t('contact.hero_subtitle')}
        image="https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1920&q=90"
        fullHeight
        overlayOpacity={65}
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            <div>
              <SectionTitle center={false} subtitle={t('contact.coords_subtitle')}>
                {t('contact.coords_title')}
              </SectionTitle>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">{t('contact.address_label')}</p>
                    <p className="text-gray-400 text-sm">MOBILIART / De Paiva Luca<br />Route de Grandcour 63C<br />1530 Payerne, Suisse</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">{t('contact.phone_label')}</p>
                    <a href="tel:+41792924498" className="text-gray-400 text-sm hover:text-gold transition-colors">+41 79 292 44 98</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">{t('contact.email_label')}</p>
                    <a href="mailto:info@mobiliart.ch" className="text-gray-400 text-sm hover:text-gold transition-colors">info@mobiliart.ch</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Globe size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-1">{t('contact.website_label')}</p>
                    <a href="https://www.mobiliart.ch" className="text-gray-400 text-sm hover:text-gold transition-colors">www.mobiliart.ch</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <Clock size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white font-medium mb-3">{t('contact.hours_label')}</p>
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
              </div>

              <a
                href="https://wa.me/41792924498"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white px-6 py-4 text-sm font-medium transition-colors"
              >
                <MessageCircle size={20} />
                {t('contact.whatsapp_btn')}
              </a>

              {/* Carte satellite */}
              <div className="relative overflow-hidden aspect-video mt-10 border border-gold/20">
                <iframe
                  title="Mobiliart — Route de Grandcour 63C, Payerne"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2729.0!2d6.935!3d46.830!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDQ5JzQ4LjAiTiA2wrA1NicwNi4wIkU!5e1!3m2!1sfr!2sch!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>

            <div>
              <SectionTitle center={false} subtitle={t('contact.form_subtitle')}>
                {t('contact.form_title')}
              </SectionTitle>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { name: 'nom', label: t('contact.field_nom'), required: true },
                    { name: 'prenom', label: t('contact.field_prenom'), required: true },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">{f.label}</label>
                      <input
                        type="text"
                        name={f.name}
                        value={form[f.name]}
                        onChange={handleChange}
                        required={f.required}
                        className="w-full bg-dark-surface border border-dark-border focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors"
                      />
                    </div>
                  ))}
                </div>

                {[
                  { name: 'telephone', label: t('contact.field_telephone'), type: 'tel' },
                  { name: 'email', label: t('contact.field_email'), type: 'email', required: true },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      name={f.name}
                      value={form[f.name]}
                      onChange={handleChange}
                      required={f.required}
                      className="w-full bg-dark-surface border border-dark-border focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">{t('contact.field_project_type')}</label>
                  <select
                    name="projectType"
                    value={form.projectType}
                    onChange={handleChange}
                    className="w-full bg-dark-surface border border-dark-border focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors"
                  >
                    <option value="">{t('contact.field_select')}</option>
                    {projectTypes.map((type) => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">{t('contact.field_date')}</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="w-full bg-dark-surface border border-dark-border focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">{t('contact.field_message')}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full bg-dark-surface border border-dark-border focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors resize-none"
                  />
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'acceptTerms', label: t('contact.checkbox_terms'), required: true },
                    { name: 'alerteOffres', label: t('contact.checkbox_offers') },
                  ].map((c) => (
                    <label key={c.name} className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name={c.name}
                        checked={form[c.name]}
                        onChange={handleChange}
                        required={c.required}
                        className="mt-0.5 w-4 h-4 accent-gold"
                      />
                      <span className="text-gray-400 text-xs leading-relaxed group-hover:text-gray-300 transition-colors">{c.label}</span>
                    </label>
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-dark-DEFAULT py-4 text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors flex items-center justify-center gap-3"
                >
                  <MessageCircle size={16} />
                  {t('contact.submit_btn')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
