import { useTranslation } from 'react-i18next'
import GoldDivider from '../ui/GoldDivider'
import Counter from '../ui/Counter'

// "50+" → { number: 50, suffix: "+" }
// "100%" → { number: 100, suffix: "%" }
// "Payerne" / "10–20%" → null (affichage texte brut)
function parseValue(v) {
  const match = String(v).match(/^(\d+)(.*)$/)
  return match ? { number: parseInt(match[1], 10), suffix: match[2] } : null
}

export default function StatsSection() {
  const { t } = useTranslation()
  const stats = t('stats.items', { returnObjects: true })

  return (
    <section className="bg-dark-surface py-20 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const parsed = parseValue(s.value)
          return (
            <div key={i} className="text-center group">
              <div className="font-serif text-3xl md:text-4xl font-bold text-gold mb-1 group-hover:text-gold-light transition-colors">
                {parsed
                  ? <Counter target={parsed.number} suffix={parsed.suffix} />
                  : s.value
                }
              </div>
              <div className="text-white text-sm font-medium mb-1">{s.label}</div>
              <div className="text-gray-500 text-xs">{s.sub}</div>
            </div>
          )
        })}
      </div>
      <GoldDivider className="mt-20" />
    </section>
  )
}
