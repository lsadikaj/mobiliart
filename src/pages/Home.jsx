import HeroSlider from '../components/sections/HeroSlider'
import UniversGrid from '../components/sections/UniversGrid'
import Promises from '../components/sections/Promises'
import StatsSection from '../components/sections/StatsSection'
import RealisationsPreview from '../components/sections/RealisationsPreview'
import PartnerCTA from '../components/sections/PartnerCTA'
import ShowroomSection from '../components/sections/ShowroomSection'

export default function Home() {
  return (
    <>
      <HeroSlider />

      <div id="univers">
        <UniversGrid />
      </div>

      <Promises />

      <StatsSection />

      <RealisationsPreview />

      <PartnerCTA />

      <ShowroomSection />
    </>
  )
}
