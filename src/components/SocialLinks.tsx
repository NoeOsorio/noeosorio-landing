import { FaGithub, FaLinkedin, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa'
import { trackEvent } from '../hooks/useAnalytics'
import { siteLinks } from '../data/siteLinks'

interface SocialLinksProps {
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
}

const SocialLinks = ({ className = "", linkClassName = "", iconClassName = "" }: SocialLinksProps) => {
  const socialLinks = [
    {
      href: "https://github.com/NoeOsorio",
      icon: FaGithub,
      label: "Noé Osorio on GitHub"
    },
    {
      href: "https://www.linkedin.com/in/noeosorioh/",
      icon: FaLinkedin,
      label: "Noé Osorio on LinkedIn"
    },
    {
      href: "https://www.instagram.com/noeosorio.dev",
      icon: FaInstagram,
      label: "Noé Osorio on Instagram"
    },
    {
      href: siteLinks.tiktok,
      icon: FaTiktok,
      label: "Noé Osorio on TikTok"
    },
    {
      href: siteLinks.youtube,
      icon: FaYoutube,
      label: "Noé Osorio on YouTube"
    }
  ]

  const handleSocialClick = (platform: string) => {
    trackEvent('social_link_click', {
      platform,
      source: location.pathname
    });
  };

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`${linkClassName} text-zinc-400 hover:text-lime-300 transition-colors`}
          onClick={() => handleSocialClick(label.split(' ').pop() ?? label)}
        >
          <span className="sr-only">{label}</span>
          <Icon className={`${iconClassName} w-6 h-6`} />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks 