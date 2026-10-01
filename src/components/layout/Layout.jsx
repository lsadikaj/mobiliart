import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppFAB from '../ui/WhatsAppFAB'
import ScrollToTop from '../ui/ScrollToTop'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-dark-DEFAULT flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFAB />
    </div>
  )
}
