import { SEO } from "../components/SEO";
import { useAnalytics } from '../hooks/useAnalytics';
import HomeTopBar from '../home/HomeTopBar';
import IdeaGalaxy from '../home/sections/IdeaGalaxy';
import ProjectWallet from '../home/sections/ProjectWallet';
import WorkPassport from '../home/sections/WorkPassport';
import LearningSlot from '../home/sections/LearningSlot';
import TipsAndFooter from '../home/sections/TipsAndFooter';

const Home = () => {
  useAnalytics();

  return (
    <main style={{ position: 'relative', background: '#0E0D0B', color: '#F4EEE4' }}>
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

      <HomeTopBar />
      <IdeaGalaxy />
      <ProjectWallet />
      <WorkPassport />
      <LearningSlot />
      <TipsAndFooter />
    </main>
  );
};

export default Home;
