import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import SectionTitle from '../components/ui/SectionTitle'
import GoldDivider from '../components/ui/GoldDivider'
import { useState } from 'react'
import { Tag, Ruler, Truck, Wrench, Gift, ClipboardList } from 'lucide-react'

const iconList = [<Tag size={28} />, <Ruler size={28} />, <Truck size={28} />, <Wrench size={28} />, <Gift size={28} />, <ClipboardList size={28} />]

export default function EspacePro() {
  const { t } = useTranslation()
  const avantages = t('espacepro.advantages', { returnObjects: true })
  const cibles = t('espacepro.cibles', { returnObjects: true })
  const activites = t('espacepro.activites', { returnObjects: true })

  const [form, setForm] = useState({ nom: '', societe: '', telephone: '', email: '', activite: '' })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const phone = '41792924498'
    const msg = encodeURIComponent(
      `Demande accès Espace Pro\n\nNom: ${form.nom}\nSociété: ${form.societe}\nTéléphone: ${form.telephone}\nEmail: ${form.email}\nActivité: ${form.activite}`
    )
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  return (
    <>
      <Hero
        title={t('espacepro.hero_title')}
        tagline={t('espacepro.hero_tagline')}
        subtitle={t('espacepro.hero_subtitle')}
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=90"
        fullHeight
      />

      <section className="bg-dark-DEFAULT py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle={t('espacepro.advantages_subtitle')}>
            {t('espacepro.advantages_title')}
          </SectionTitle>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {avantages.map((a, i) => (
              <div key={i} className="bg-dark-surface border border-dark-border hover:border-gold/40 p-8 group transition-all duration-300">
                <div className="text-gold mb-4 group-hover:scale-110 transition-transform">{iconList[i]}</div>
                <h3 className="font-serif text-lg text-white mb-2">{a.titre}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mb-20">
            <h3 className="font-serif text-2xl text-white mb-6">{t('espacepro.partners_title')}</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {cibles.map((c) => (
                <span key={c} className="border border-gold/40 text-gold text-xs tracking-widest uppercase px-5 py-2 hover:bg-gold/10 transition-colors">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <GoldDivider className="mb-16" />

          <div className="max-w-2xl mx-auto">
            <SectionTitle subtitle={t('espacepro.form_subtitle')}>
              {t('espacepro.form_title')}
            </SectionTitle>

            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { name: 'nom', label: t('espacepro.field_nom'), type: 'text', required: true },
                { name: 'societe', label: t('espacepro.field_societe'), type: 'text' },
                { name: 'telephone', label: t('espacepro.field_telephone'), type: 'tel' },
                { name: 'email', label: t('espacepro.field_email'), type: 'email', required: true },
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
                <label className="block text-gray-400 text-xs tracking-widest uppercase mb-2">{t('espacepro.field_activite')}</label>
                <select
                  name="activite"
                  value={form.activite}
                  onChange={handleChange}
                  className="w-full bg-dark-surface border border-dark-border focus:border-gold/60 text-white px-4 py-3 text-sm outline-none transition-colors"
                >
                  <option value="">{t('espacepro.field_select')}</option>
                  {activites.map((a) => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gold text-dark-DEFAULT py-4 text-sm tracking-widest uppercase font-semibold hover:bg-gold-light transition-colors mt-4"
              >
                {t('espacepro.submit_btn')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
