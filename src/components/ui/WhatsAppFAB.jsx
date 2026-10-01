import { MessageCircle } from 'lucide-react'

export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/41792924498"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous contacter sur WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group"
    >
      <MessageCircle size={24} />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm font-medium pr-0 group-hover:pr-1">
        WhatsApp
      </span>
    </a>
  )
}
