import HeroSection from '../sections/home/HeroSection'
import FeaturedProjects from '../sections/home/FeaturedProjects'
import EducationPreview from '../sections/home/EducationPreview'
import Industries from '../sections/home/Industries'
import CTASection from '../sections/home/CTASection'
import { SEO } from '../components/SEO'
import { ServicesShowcase } from '../components/home/ServicesShowcase'
// Importaremos las demás secciones cuando las creemos

const Home = () => {
  return (
    <>
      <SEO 
        title="Noé Osorio | Desarrollo de Software Premium & Soluciones Empresariales"
        description="Especialistas en desarrollo de aplicaciones web, móviles y automatización empresarial. Transformamos tu visión en soluciones digitales escalables y rentables."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com"
        keywords="desarrollo web, aplicaciones móviles, automatización empresarial, desarrollo de software, MVP startup, landing pages, aplicaciones empresariales, desarrollo full-stack"
      />
      <HeroSection />
      <ServicesShowcase />
      <EducationPreview />
      <Industries />
      <FeaturedProjects />
      <CTASection />
    </>
  )
}

export default Home 