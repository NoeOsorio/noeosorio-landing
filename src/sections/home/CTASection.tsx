import { useEffect, useRef, useState } from 'react'
import { HiArrowRight, HiClipboardCopy, HiMail, HiPlay } from 'react-icons/hi'
import { siteLinks } from '../../data/siteLinks'

interface CTASectionProps {
  onCTAClick?: (action: string) => void;
}

const teams = ['Porter', 'Osmind', 'Clip', 'Finloop']

const CTASection = ({ onCTAClick }: CTASectionProps) => {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const copyEmail = async () => {
    onCTAClick?.('copy_email')
    try {
      await navigator.clipboard.writeText(siteLinks.email)
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Want to <span className="text-lime-300">talk</span>?
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed max-w-3xl mx-auto">
              I read every email. Ideas, questions about my projects, or just saying hi.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Email Card */}
            <div className="group p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
              <div className="p-4 bg-lime-300/10 text-lime-300 rounded-xl w-fit mb-6">
                <HiMail className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-8">
                {siteLinks.email}
              </h3>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 transition-colors"
              >
                <HiClipboardCopy className="w-5 h-5" aria-hidden="true" />
                {copied ? 'Copied' : 'Copy email'}
              </button>
              <span className="sr-only" role="status" aria-live="polite">
                {copied ? 'Email copied to clipboard' : ''}
              </span>
            </div>

            {/* Videos Card */}
            <div className="group p-8 bg-gradient-to-br from-lime-300/10 to-transparent rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
              <div className="p-4 bg-lime-300/10 text-lime-300 rounded-xl w-fit mb-6">
                <HiPlay className="w-6 h-6" aria-hidden="true" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Videos</h3>
              <p className="text-zinc-400 mb-8">
                New videos on YouTube and TikTok.
              </p>
              <a
                href={siteLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCTAClick?.('go_to_youtube')}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-lime-300 to-emerald-300
                  text-zinc-900 rounded-lg font-medium relative overflow-hidden
                  hover:from-lime-400 hover:to-emerald-400
                  transition-all duration-300 shadow-lg hover:shadow-lime-300/20"
              >
                <span className="relative z-10">Go to YouTube</span>
                <HiArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform relative z-10" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Teams */}
          <div className="mt-16 text-center">
            <p className="text-zinc-400 mb-6">Teams I've worked with</p>
            <ul className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
              {teams.map((team) => (
                <li key={team} className="text-xl font-semibold text-zinc-300">
                  {team}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
