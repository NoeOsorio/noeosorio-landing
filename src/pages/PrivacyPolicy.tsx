import { SEO } from '../components/SEO'
import { siteLinks } from '../data/siteLinks'

const paragraphs = [
  'This site uses an analytics service to learn which pages people visit, how they arrive and from which kind of device. It only runs if you accept it in the banner.',
  'If you reject it, nothing is measured and the site works the same.',
  'The analytics service stores cookies in your browser and receives your approximate location, your device type and the pages you visit. I do not get your name or your email.',
  'I use this only to understand what is useful on the site. I do not sell it or share it with anyone.',
  'You can change your choice at any time from "Cookie settings" at the bottom of every page.',
]

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy | Noé Osorio"
        description="How this site uses analytics, and how to change your choice."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com/privacy-policy"
      />
      <div className="min-h-screen container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy</h1>
          <p className="text-zinc-400 mb-12">Last updated: November 18, 2026</p>
          <div className="space-y-6 text-lg text-zinc-300 leading-relaxed">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <p>
              Questions:{' '}
              <a href={`mailto:${siteLinks.email}`} className="text-lime-300 hover:text-lime-400 underline">
                {siteLinks.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PrivacyPolicy
