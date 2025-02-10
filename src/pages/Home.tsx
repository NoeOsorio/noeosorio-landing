import HeroSection from '../sections/HeroSection'
import FeaturedServices from '../sections/FeaturedServices'
import ImpactNumbers from '../sections/ImpactNumbers'
import FeaturedProjects from '../sections/FeaturedProjects'
import EducationPreview from '../sections/EducationPreview'
import Industries from '../sections/Industries'
import CTASection from '../sections/CTASection'
// Importaremos las demás secciones cuando las creemos

const Home = () => {
  return (
    <div className="min-h-screen relative">
      <div className="absolute inset-0 bg-zinc-900" /> {/* Background base */}
      <div className="relative">
        <HeroSection />
        <FeaturedServices />
        <ImpactNumbers />
        <FeaturedProjects />
        <EducationPreview />
        <Industries />
        <CTASection />
      </div>
    </div>
  )
}

export default Home 