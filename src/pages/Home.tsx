import { motion } from "framer-motion";
import HeroSection from "../sections/home/HeroSection";
import FeaturedProjects from "../sections/home/FeaturedProjects";
import EducationPreview from "../sections/home/EducationPreview";
import Industries from "../sections/home/Industries";
import CTASection from "../sections/home/CTASection";
import { SEO } from "../components/SEO";
import { ServicesShowcase } from "../components/home/ServicesShowcase";
import { trackEvent } from '../hooks/useAnalytics';
// Importaremos las demás secciones cuando las creemos

// Configuraciones de animación reutilizables
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.2 },
};

const Home = () => {
  const handleHeroClick = (action: string) => {
    trackEvent('hero_interaction', {
      action,
      source: 'home_page'
    });
  };

  const handleProjectView = (projectId: string) => {
    trackEvent('featured_project_view', {
      project_id: projectId,
      source: 'home_page'
    });
  };

  const handleEducationClick = (courseId: string) => {
    trackEvent('education_click', {
      course_id: courseId,
      source: 'home_page'
    });
  };

  const handleIndustryClick = (industry: string) => {
    trackEvent('industry_click', {
      industry,
      source: 'home_page'
    });
  };

  const handleCTAClick = (location: string) => {
    trackEvent('home_cta_click', {
      location,
      source: 'home_page'
    });
  };

  return (
    <motion.div initial="initial" animate="animate" className="relative">
      <SEO
        title="Noé Osorio | Desarrollo de Software Premium & Soluciones Empresariales"
        description="Especialista en desarrollo de aplicaciones web, móviles y automatización empresarial. +5 años transformando ideas en soluciones digitales escalables."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com"
        keywords="desarrollo web, aplicaciones móviles, automatización empresarial, desarrollo de software, MVP startup, React, Node.js, AWS"
        type="website"
        author="Noé Osorio"
        twitterHandle="@noeosorio.dev"
      />

      <HeroSection 
        onGetStartedClick={() => handleHeroClick('get_started')}
        onLearnMoreClick={() => handleHeroClick('learn_more')}
      />

      <motion.div {...stagger} className="relative z-10">
        <ServicesShowcase />
      </motion.div>

      <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
        <EducationPreview 
          onCourseClick={handleEducationClick}
        />
      </motion.div>

      <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
        <Industries 
          onIndustryClick={handleIndustryClick}
        />
      </motion.div>

      <motion.div {...fadeInUp} transition={{ delay: 0.4 }}>
        <FeaturedProjects 
          onProjectClick={handleProjectView}
        />
      </motion.div>

      <motion.div {...fadeInUp} transition={{ delay: 0.5 }}>
        <CTASection 
          onCTAClick={() => handleCTAClick('bottom')}
        />
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
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Home;
