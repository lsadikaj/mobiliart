import { Link } from 'react-router-dom'

export default function Card({ image, title, description, link, badge }) {
  const content = (
    <div className="group relative overflow-hidden bg-dark-surface border border-dark-border hover:border-gold/40 transition-all duration-500 rounded-sm">
      {image && (
        <div className="overflow-hidden h-56">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </div>
      )}
      <div className="p-6">
        {badge && (
          <span className="inline-block bg-gold text-dark-DEFAULT text-xs font-semibold tracking-widest uppercase px-3 py-1 mb-3">
            {badge}
          </span>
        )}
        <h3 className="font-serif text-xl text-white mb-2 group-hover:text-gold transition-colors">{title}</h3>
        {description && <p className="text-gray-400 text-sm leading-relaxed">{description}</p>}
        {link && (
          <div className="mt-4 flex items-center text-gold text-sm font-medium tracking-wider uppercase gap-2">
            Découvrir
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </div>
        )}
      </div>
    </div>
  )

  return link ? <Link to={link}>{content}</Link> : content
}
