import HeroSection from '../sections/HeroSection'
import FeaturedServices from '../sections/FeaturedServices'
import ImpactNumbers from '../sections/ImpactNumbers'
import FeaturedProjects from '../sections/FeaturedProjects'
import EducationPreview from '../sections/EducationPreview'
import Industries from '../sections/Industries'
import CTASection from '../sections/CTASection'
import { SEO } from '../components/SEO'
// Importaremos las demás secciones cuando las creemos

const Home = () => {
  return (
    <>
      <SEO 
        title="Noé Osorio | Senior Software Engineer & Cloud Architect"
        description="Experto en arquitecturas cloud-native y desarrollo full-stack. Transformando ideas en soluciones digitales innovadoras."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com"
      />
      <HeroSection />
      <FeaturedServices />
      <ImpactNumbers />
      <FeaturedProjects />
      <EducationPreview />
      <Industries />
      <CTASection />
    </>
  )
}

export default Home 