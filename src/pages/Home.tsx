import { motion } from 'framer-motion'
import HeroSection from '../sections/home/HeroSection'
import FeaturedProjects from '../sections/home/FeaturedProjects'
import EducationPreview from '../sections/home/EducationPreview'
import Industries from '../sections/home/Industries'
import CTASection from '../sections/home/CTASection'
import { SEO } from '../components/SEO'
import { ServicesShowcase } from '../components/home/ServicesShowcase'
// Importaremos las demás secciones cuando las creemos

// Configuraciones de animación reutilizables
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 }
}

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.2 }
}

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      className="relative"
    >
      <SEO 
        title="Noé Osorio | Desarrollo de Software Premium & Soluciones Empresariales"
        description="Especialistas en desarrollo de aplicaciones web, móviles y automatización empresarial. Transformamos tu visión en soluciones digitales escalables y rentables."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com"
        keywords="desarrollo web, aplicaciones móviles, automatización empresarial, desarrollo de software, MVP startup, landing pages, aplicaciones empresariales, desarrollo full-stack"
      />

      <motion.div {...fadeInUp}>
        <HeroSection />
      </motion.div>

      <motion.div 
        {...stagger}
        className="relative z-10"
      >
        <ServicesShowcase />
      </motion.div>

      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <EducationPreview />
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.3 }}
      >
        <Industries />
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.4 }}
      >
        <FeaturedProjects />
      </motion.div>

      <motion.div
        {...fadeInUp}
        transition={{ delay: 0.5 }}
      >
        <CTASection />
      </motion.div>

      {/* Background decorativo animado */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-transparent" />
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px]"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px]"
          animate={{ 
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3] 
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Home 