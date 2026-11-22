import { useEffect } from 'react';
import type { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import { SEO } from "../components/SEO";
import HomeTopBar from '../home/HomeTopBar';
import IdeaGalaxy from '../home/sections/IdeaGalaxy';
import ProjectWallet from '../home/sections/ProjectWallet';
import WorkPassport from '../home/sections/WorkPassport';
import LearningPlayer from '../home/sections/LearningPlayer';
import TipsAndFooter from '../home/sections/TipsAndFooter';
import '../home/home-tokens.css';

const Home = () => {
  useAnalytics();

  // Safari tints its bars with the theme color; the home is darker than the other pages.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');
    const prev = meta?.getAttribute('content');
    meta?.setAttribute('content', '#0E0D0B');
    return () => { if (prev) meta?.setAttribute('content', prev); };
  }, []);
  const navigate = useNavigate();

  // The sections are plain DOM, so their links to other pages of the site would reload the app.
  // Same-site page links go through the router instead; files like /llms.txt still load normally.
  const onClick = (e: MouseEvent<HTMLElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest('a');
    if (!a || !a.hasAttribute('href') || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
    const url = new URL(a.href, window.location.href);
    if (url.origin !== window.location.origin || url.hash || /\.[a-z0-9]+$/i.test(url.pathname)) return;
    e.preventDefault();
    navigate(url.pathname + url.search);
  };

  return (
    <main className="home-root" onClick={onClick}>
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
      <LearningPlayer />
      <TipsAndFooter />
    </main>
  );
};

export default Home;
