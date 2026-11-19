import { HiAcademicCap, HiMicrophone, HiVideoCamera } from 'react-icons/hi'
import { siteLinks } from '../../data/siteLinks'

interface EducationPreviewProps {
  onCourseClick?: (courseId: string) => void;
}

const items = [
  {
    icon: HiVideoCamera,
    title: 'Videos',
    description: 'Lessons from building software and moving to New York.',
  },
  {
    icon: HiMicrophone,
    title: 'Qué Dirían',
    description: 'A debate podcast I co-hosted with Edgar Mora, from 2020 to 2021.',
  },
  {
    icon: HiAcademicCap,
    title: 'Sakura Kode Academy',
    description:
      'My coding school in Puebla, with workshops on programming, Git and GitHub, in 2024.',
  },
]

const EducationPreview = ({ onCourseClick }: EducationPreviewProps) => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full">
              <div className="w-2 h-2 bg-lime-300 rounded-full animate-pulse" />
              <p className="text-lime-300 font-medium">Teaching</p>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Learning <span className="text-lime-300">out loud</span> since 2020
            </h2>

            <p className="text-xl text-zinc-400 leading-relaxed">
              I explain what I learn: on video, in workshops and in conversations with other developers.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={siteLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCourseClick?.('youtube')}
                className="inline-flex items-center gap-2 px-6 py-3 bg-lime-300 text-zinc-900 rounded-lg font-medium hover:bg-lime-400 transition-colors"
              >
                Watch on YouTube
              </a>
              <a
                href={siteLinks.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onCourseClick?.('tiktok')}
                className="inline-flex items-center gap-2 px-6 py-3 border border-lime-300 text-lime-300 rounded-lg font-medium hover:bg-lime-300/10 transition-colors"
              >
                Follow on TikTok
              </a>
            </div>
          </div>

          {/* Cards */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-lime-300/20 to-cyan-300/20 rounded-2xl opacity-20 blur-xl" />
            <div className="relative grid gap-8">
              {items.map((item) => (
                <div
                  key={item.title}
                  className="group p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all hover:bg-zinc-800/70"
                >
                  <div className="flex gap-8">
                    <div className="p-4 bg-lime-300/10 rounded-lg h-fit group-hover:bg-lime-300/20 transition-colors">
                      <item.icon className="w-7 h-7 text-lime-300" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-lime-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationPreview
