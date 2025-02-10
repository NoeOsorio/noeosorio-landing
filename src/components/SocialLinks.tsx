import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

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
      label: "Visitar perfil de GitHub de Noé Osorio"
    },
    {
      href: "https://www.linkedin.com/in/noeosorioh/",
      icon: FaLinkedin,
      label: "Conectar con Noé Osorio en LinkedIn"
    },
    {
      href: "https://www.instagram.com/noeosorio.dev",
      icon: FaInstagram,
      label: "Seguir a Noé Osorio en Instagram"
    }
  ]

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
        >
          <span className="sr-only">{label}</span>
          <Icon className={`${iconClassName} w-6 h-6`} />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks 