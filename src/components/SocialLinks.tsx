import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'

const SocialLinks = ({ className = '' }: { className?: string }) => {
  const socialLinks = [
    {
      href: "https://github.com/NoeOsorio",
      icon: FaGithub,
      label: "Visitar perfil de GitHub de Noé Osorio"
    },
    {
      href: "https://linkedin.com/in/noeosorioh",
      icon: FaLinkedin,
      label: "Conectar con Noé Osorio en LinkedIn"
    },
    {
      href: "https://twitter.com/noeosorio",
      icon: FaTwitter,
      label: "Seguir a Noé Osorio en Twitter"
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
          className="text-zinc-400 hover:text-lime-300 transition-colors"
        >
          <span className="sr-only">{label}</span>
          <Icon className="w-6 h-6" />
        </a>
      ))}
    </div>
  )
}

export default SocialLinks 