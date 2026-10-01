import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/layout/Layout'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Amenagement from './pages/Amenagement'
import Materiaux from './pages/Materiaux'
import Construction from './pages/Construction'
import Realisations from './pages/Realisations'
import Exclusivites from './pages/Exclusivites'
import EspacePro from './pages/EspacePro'
import Apporteur from './pages/Apporteur'
import APropos from './pages/APropos'
import Contact from './pages/Contact'
import Carrelages from './pages/Carrelages'
import SalleDeBain from './pages/SalleDeBain'

export default function App() {
  return (
    <ThemeProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/amenagement" element={<Amenagement />} />
          <Route path="/materiaux" element={<Materiaux />} />
          <Route path="/construction" element={<Construction />} />
          <Route path="/realisations" element={<Realisations />} />
          <Route path="/exclusivites" element={<Exclusivites />} />
          <Route path="/espace-pro" element={<EspacePro />} />
          <Route path="/apporteur" element={<Apporteur />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/materiaux/carrelages" element={<Carrelages />} />
          <Route path="/amenagement/salle-de-bain" element={<SalleDeBain />} />
        </Routes>
      </Layout>
    </BrowserRouter>
    </ThemeProvider>
  )
}
