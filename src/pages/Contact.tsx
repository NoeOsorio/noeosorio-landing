import { FaGithub, FaInstagram, FaLinkedin, FaTiktok, FaYoutube } from 'react-icons/fa'
import { HiMail } from 'react-icons/hi'
import { CopyEmail } from '../components/CopyEmail'
import { SEO } from '../components/SEO'
import { siteLinks } from '../data/siteLinks'

const links = [
  { name: 'YouTube', href: siteLinks.youtube, icon: FaYoutube },
  { name: 'TikTok', href: siteLinks.tiktok, icon: FaTiktok },
  { name: 'Instagram', href: siteLinks.instagram, icon: FaInstagram },
  { name: 'LinkedIn', href: siteLinks.linkedin, icon: FaLinkedin },
  { name: 'GitHub', href: siteLinks.github, icon: FaGithub },
]

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact | Noé Osorio"
        description="Ideas, questions about my projects, or just saying hi. I read every email."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com/contact"
      />
      <div className="min-h-screen container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="inline-block px-4 py-2 bg-lime-300/10 rounded-full text-lime-300 font-medium mb-6">Contact</p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Say <span className="text-lime-300">hi</span>
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Ideas, questions about my projects, or just saying hi. I read every email.
            </p>
          </div>

          <div className="p-5 min-[420px]:p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all mb-12">
            <div className="p-4 bg-lime-300/10 text-lime-300 rounded-xl w-fit mb-6">
              <HiMail className="w-6 h-6" aria-hidden="true" />
            </div>
            <h2 className="text-xl min-[420px]:text-2xl font-semibold text-white mb-6 min-w-0">
              <a href={`mailto:${siteLinks.email}`} className="hover:text-lime-300 transition-colors [overflow-wrap:anywhere]">
                {siteLinks.email}
              </a>
            </h2>
            <CopyEmail />
          </div>

          <ul className="flex flex-wrap justify-center gap-4">
            {links.map(({ name, href, icon: Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-zinc-800/50 text-zinc-300 rounded-lg border border-zinc-700/50 hover:border-lime-300/30 hover:text-lime-300 transition-all"
                >
                  <Icon className="w-5 h-5" aria-hidden="true" />
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

export default Contact
