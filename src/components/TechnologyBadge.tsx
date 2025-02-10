import { Technology, technologyColors, technologyIcons } from '../types/portfolio'

const TechnologyBadge = ({ tech }: { tech: Technology }) => {
  const Icon = technologyIcons[tech.icon]
  return (
    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${technologyColors[tech.category]}`}>
      <Icon className="w-4 h-4" />
      {tech.name}
    </span>
  )
}

export default TechnologyBadge 