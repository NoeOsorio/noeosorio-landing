import { HiMail } from 'react-icons/hi'
import { SEO } from '../components/SEO'
import { siteLinks } from '../data/siteLinks'

const caresAbout = [
  { title: 'AI you can trust', text: 'Agents with permission levels, human approval and spending limits.' },
  { title: 'AI that makes you think', text: 'Tools that question you and help you learn, instead of doing the thinking for you.' },
  { title: 'Teams and people', text: 'How teams hire, collaborate and grow. The subject of my master\'s.' },
  { title: 'Learning in public', text: 'I share what I build and what I learn, on video and in workshops.' },
]

const tags = ['Product engineering', 'AI agents', 'Web and mobile', 'Infrastructure', 'Organizational psychology']

const stack = [
  { group: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { group: 'Backend', items: ['Node.js', 'Python', 'FastAPI', 'Go', 'PostgreSQL'] },
  { group: 'Mobile and desktop', items: ['Swift', 'Flutter', 'React Native', 'Tauri with Rust'] },
  { group: 'Cloud and infrastructure', items: ['AWS', 'Firebase', 'Docker', 'Kubernetes', 'Helm'] },
]

const experience = [
  {
    company: 'Porter', place: 'New York', role: 'Product Engineer', years: '2026 to today',
    text: 'Product engineering for a platform that runs apps on your own cloud.',
    tags: [],
  },
  {
    company: 'Apex Systems', place: 'Iowa', role: 'Software Engineer', years: '2024 to 2026',
    text: 'Microservices with AWS Lambda and API Gateway in Node.js.',
    tags: ['AWS Lambda', 'API Gateway', 'Node.js'],
  },
  {
    company: 'Osmind', place: 'San Francisco', role: 'Software Engineer', years: '2022 to 2023',
    text: 'Led the web app for mental health providers in React and TypeScript, launched self-scheduling in React Native, and worked on insurance billing under HIPAA.',
    tags: ['React', 'TypeScript', 'React Native'],
  },
  {
    company: 'Clip', place: 'Mexico City', role: 'Software Engineer', years: '2021 to 2022',
    text: 'Microservices for the Amazon Seller API, a TypeScript microservice template with Clean Architecture, and CI/CD with Jenkins and CloudFormation.',
    tags: ['TypeScript', 'Jenkins', 'CloudFormation'],
  },
  {
    company: 'Finloop', place: 'Puebla', role: 'Full Stack Engineer', years: '2020 to 2021',
    text: 'Admin apps in React and Redux, and serverless functions with automated deploys.',
    tags: ['React', 'Redux'],
  },
  {
    company: 'Smartkode', place: 'Puebla', role: 'Tech Lead', years: '2018 to 2020',
    text: 'Led the web team for an insurance company and the mobile team in Flutter.',
    tags: ['Flutter'],
  },
]

const teaching = [
  {
    name: 'Qué Dirían',
    text: 'A debate podcast with my friend Edgar Mora. Two seasons, from 2020 to 2021, giving serious thought to fun questions.',
  },
  {
    name: 'Sakura Kode Academy',
    text: 'My coding school in Puebla. In 2024 it ran live workshops on programming basics and on Git and GitHub.',
  },
  {
    name: 'YouTube',
    text: 'Videos and livestreams on building software, finding your first job and moving to New York.',
  },
]

const pill = 'px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm'

const About = () => {
  return (
    <>
      <SEO
        title="About | Noé Osorio"
        description="Mexican engineer in New York. Product Engineer at Porter, building tools with AI and making videos about what I learn."
        image="https://noeosorio.com/og-image.png"
        url="https://noeosorio.com/about"
      />
      <div className="min-h-screen">
        {/* Hero */}
        <section className="container mx-auto px-4 pt-16 pb-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative max-w-md mx-auto lg:mx-0 w-full">
              <img
                src="/profile-photo.png"
                alt="Noé Osorio"
                className="w-full aspect-square object-cover rounded-2xl border border-zinc-700/50"
              />
              <p className="absolute bottom-4 left-4 px-4 py-2 bg-zinc-900 text-lime-300 text-sm font-medium rounded-full border border-zinc-700/50">
                Living in New York
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Noé Osorio</h1>
                <p className="text-xl text-lime-300 mb-6">Product Engineer at Porter</p>
                <p className="text-xl text-zinc-400 leading-relaxed">
                  I'm a Mexican engineer in New York. By day I build product at Porter. The rest of the time I build my own tools with AI, study a master's in organizational psychology, and make videos about what I learn.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-white mb-4">What I care about</h2>
                <ul className="space-y-4">
                  {caresAbout.map((item) => (
                    <li key={item.title}>
                      <p className="text-white font-medium">{item.title}</p>
                      <p className="text-zinc-400">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <ul className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <li key={tag} className={pill}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Tech stack */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stack.map((group) => (
              <div key={group.group} className="p-6 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
                <h3 className="text-lg font-semibold text-white mb-4">{group.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className={pill}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <p className="inline-block px-4 py-2 bg-lime-300/10 rounded-full text-lime-300 font-medium mb-6">Experience</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white">
                Where I've <span className="text-lime-300">worked</span>
              </h2>
            </div>
            <ul className="space-y-6">
              {experience.map((job) => (
                <li key={job.company} className="p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-3">
                    <h3 className="text-2xl font-semibold text-white">{job.company}, {job.place}</h3>
                    <p className="text-zinc-400">{job.years}</p>
                  </div>
                  <p className="text-lime-300 mb-3">{job.role}</p>
                  <p className="text-zinc-400 leading-relaxed">{job.text}</p>
                  {job.tags.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-4">
                      {job.tags.map((tag) => (
                        <li key={tag} className={pill}>{tag}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Teaching */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="inline-block px-4 py-2 bg-lime-300/10 rounded-full text-lime-300 font-medium mb-6">Teaching</p>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Learning out loud <span className="text-lime-300">since 2020</span>
              </h2>
              <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
                I like explaining what I learn. These are the places where I have done it.
              </p>
            </div>
            <ul className="grid md:grid-cols-3 gap-6 mb-12">
              {teaching.map((item) => (
                <li key={item.name} className="p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
                  <h3 className="text-xl font-semibold text-white mb-3">{item.name}</h3>
                  <p className="text-zinc-400 leading-relaxed">{item.text}</p>
                </li>
              ))}
            </ul>
            <blockquote className="text-2xl text-center text-zinc-300 italic">
              "Don't create for the algorithm. Create to leave a mark."
            </blockquote>
          </div>
        </section>

        {/* Closing call */}
        <section className="container mx-auto px-4 pb-32">
          <div className="max-w-3xl mx-auto text-center p-12 bg-gradient-to-br from-lime-300/10 to-transparent rounded-xl border border-zinc-700/50">
            <h2 className="text-4xl font-bold text-white mb-4">
              Want to <span className="text-lime-300">talk</span>?
            </h2>
            <p className="text-xl text-zinc-400 mb-8">I read every email.</p>
            <a
              href={`mailto:${siteLinks.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-lime-300 to-emerald-300 text-zinc-900 rounded-lg font-medium hover:from-lime-400 hover:to-emerald-400 transition-all duration-300"
            >
              <HiMail className="w-5 h-5" aria-hidden="true" />
              Email me
            </a>
          </div>
        </section>
      </div>
    </>
  )
}

export default About
