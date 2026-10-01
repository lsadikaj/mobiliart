export default function SectionTitle({ children, subtitle, center = true, light = false }) {
  return (
    <div className={`mb-12 ${center ? 'text-center' : ''}`}>
      <h2 className={`font-serif text-3xl md:text-4xl font-bold mb-4 ${light ? 'text-dark-DEFAULT' : 'text-white'}`}>
        {children}
      </h2>
      <div className={`w-16 h-px bg-gold ${center ? 'mx-auto' : ''} mb-4`} />
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl ${center ? 'mx-auto' : ''} ${light ? 'text-dark-DEFAULT/70' : 'text-gray-400'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
