import { FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import { SEO } from '../components/SEO'
import { siteLinks } from '../data/siteLinks'

const buttons = [
  { name: 'YouTube', href: siteLinks.youtube, icon: FaYoutube, external: true },
  { name: 'TikTok', href: siteLinks.tiktok, icon: FaTiktok, external: true },
  { name: 'Instagram', href: siteLinks.instagram, icon: FaInstagram, external: true },
  { name: 'LinkedIn', href: siteLinks.linkedin, icon: FaLinkedin, external: true },
  { name: 'GitHub', href: siteLinks.github, icon: FaGithub, external: true },
  { name: 'Email', href: `mailto:${siteLinks.email}`, icon: MdEmail, external: false },
]

const Social = () => {
  return (
    <>
      <SEO
        title="Social | Noé Osorio"
        description="Noé Osorio, Product Engineer in New York. Find me on YouTube, TikTok, Instagram, LinkedIn and GitHub."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com/social"
      />
      <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md text-center">
          <img
            src="/profile-photo.png"
            alt="Noé Osorio"
            className="w-32 h-32 rounded-full object-cover mx-auto mb-6 border border-zinc-700/50"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Noé Osorio</h1>
          <p className="text-lime-300 mb-10">Product Engineer in New York</p>
          <ul className="space-y-4">
            {buttons.map(({ name, href, icon: Icon, external }) => (
              <li key={name}>
                <a
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-zinc-800/50 text-white rounded-xl border border-zinc-700/50 hover:border-lime-300/30 hover:text-lime-300 transition-all"
                >
                  <Icon className="text-2xl" aria-hidden="true" />
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default Social
