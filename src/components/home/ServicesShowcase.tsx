import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiArrowRight, HiBookOpen, HiChip, HiPencilAlt, HiTemplate } from 'react-icons/hi';
import { trackEvent } from '../../hooks/useAnalytics';

// Cards without `to` have no page yet, so they render without a link.
const built = [
  {
    id: 'maiden-os',
    icon: HiChip,
    title: 'Maiden OS',
    description:
      'My personal AI operating system. It works from Telegram, my Mac and my iPhone, with permission levels and spending limits.',
    color: 'from-purple-500 to-blue-500',
  },
  {
    id: 'essay-studio',
    icon: HiPencilAlt,
    title: 'Essay Studio',
    description:
      'A writing app where AI agents question your essay instead of writing it for you.',
    color: 'from-lime-500 to-emerald-500',
    to: '/essay',
  },
  {
    id: 'whiteboard',
    icon: HiTemplate,
    title: 'Whiteboard',
    description: 'A whiteboard that listens while you talk and draws your notes live.',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'telar',
    icon: HiBookOpen,
    title: 'Telar',
    description:
      'A story engine for educational visual novels, where characters act on their own.',
    color: 'from-orange-500 to-red-500',
  },
];

const cardClass =
  'group relative p-8 rounded-2xl bg-zinc-800/50 backdrop-blur-xl border border-zinc-700/50 transition-all overflow-hidden';

export const ServicesShowcase = () => {
  const handleClick = (name: string) => {
    trackEvent('built_click', { project: name, source: 'home_built' });
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Things I've{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-300 to-emerald-300">
              built
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-zinc-400"
          >
            Tools I use every day, made with AI and real safeguards.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
          {built.map((item) => {
            const Icon = item.icon;
            const body = (
              <>
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color} mb-6`}>
                  <Icon className="w-6 h-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400">{item.description}</p>
                {item.to && (
                  <div className="mt-6 flex items-center gap-2 text-lime-300 font-medium group-hover:gap-4 transition-all">
                    <span>See project</span>
                    <HiArrowRight className="w-5 h-5" aria-hidden="true" />
                  </div>
                )}
              </>
            );
            return item.to ? (
              <Link
                key={item.id}
                to={item.to}
                className={`${cardClass} hover:border-lime-300/50 block`}
                onClick={() => handleClick(item.title)}
              >
                {body}
              </Link>
            ) : (
              <div key={item.id} className={cardClass}>
                {body}
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-lime-300 hover:text-lime-400 font-medium transition-colors"
            onClick={() => handleClick('all_projects')}
          >
            <span>See all projects</span>
            <HiArrowRight className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
};
