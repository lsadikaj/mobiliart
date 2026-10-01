import { Users, Award, HeartHandshake } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import SectionTitle from '../ui/SectionTitle'
import GoldDivider from '../ui/GoldDivider'

const icons = [<Users size={36} />, <Award size={36} />, <HeartHandshake size={36} />]

export default function Promises() {
  const { t } = useTranslation()
  const promises = t('promises.items', { returnObjects: true })

  return (
    <section className="bg-dark-surface py-24 px-4">
      <GoldDivider className="mb-24 -mt-1" />
      <div className="max-w-7xl mx-auto">
        <SectionTitle subtitle={t('promises.subtitle')}>
          {t('promises.title')}
        </SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {promises.map((p, i) => (
            <div key={i} className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 border border-gold/30 text-gold mb-6 group-hover:bg-gold/10 transition-colors">
                {icons[i]}
              </div>
              <h3 className="font-serif text-xl text-white mb-3">{p.title}</h3>
              <div className="w-8 h-px bg-gold mx-auto mb-4" />
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
      <GoldDivider className="mt-24" />
    </section>
  )
}
