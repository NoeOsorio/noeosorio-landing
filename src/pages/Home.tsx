import { motion } from "framer-motion";
import HeroSection from "../sections/home/HeroSection";
import FeaturedProjects from "../sections/home/FeaturedProjects";
import EducationPreview from "../sections/home/EducationPreview";
import Industries from "../sections/home/Industries";
import CTASection from "../sections/home/CTASection";
import { SEO } from "../components/SEO";
import { ServicesShowcase } from "../components/home/ServicesShowcase";
import { trackEvent } from '../hooks/useAnalytics';

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

  const handleCTAClick = (location: string) => {
    trackEvent('home_cta_click', {
      location,
      source: 'home_page'
    });
  };

  return (
    <motion.div initial="initial" animate="animate" className="relative">
      <SEO
        title="Noé Osorio | Product Engineer in New York"
        description="I build AI you can trust, and AI that makes you think. Tools made with AI, projects and videos from a Mexican engineer in New York."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com"
        keywords="Noé Osorio, product engineer, AI, software engineer, New York, Essay Studio, Maiden OS"
        type="website"
        author="Noé Osorio"
        twitterHandle="@noeosorio.dev"
      />

      <HeroSection 
        onGetStartedClick={() => handleHeroClick('get_started')}
        onLearnMoreClick={() => handleHeroClick('learn_more')}
      />

      <motion.div className="relative z-10">
        <ServicesShowcase />
      </motion.div>

      <div>
        <EducationPreview 
          onCourseClick={handleEducationClick}
        />
      </div>

      <div>
        <Industries />
      </div>

      <div>
        <FeaturedProjects 
          onProjectClick={handleProjectView}
        />
      </div>

      <div>
        <CTASection 
          onCTAClick={() => handleCTAClick('bottom')}
        />
      </div>

      {/* Ambient light. Static on purpose: a looping blur this large repaints the whole page and flickers while scrolling. */}
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-lime-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-500/20 rounded-full filter blur-[128px] opacity-25" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full filter blur-[128px] opacity-25" />
      </div>
    </motion.div>
  );
};

export default Home;
