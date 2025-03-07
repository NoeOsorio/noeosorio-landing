import { IconType } from 'react-icons'
import { FaReact, FaNodeJs, FaDatabase, FaAws, FaPython } from 'react-icons/fa'
import { SiFlutter, SiFirebase, SiExpo, SiTailwindcss, SiVercel, SiTypescript, SiRedux, SiGraphql, SiSwagger, SiServerless, SiMongodb, SiGooglecloud, SiCloudflare } from 'react-icons/si'

export type ProjectCategory = 'web' | 'mobile' | 'api' | 'desktop' | 'cli'
export type TechnologyCategory = 'frontend' | 'backend' | 'mobile' | 'cloud' | 'database'

export const technologyColors: Record<TechnologyCategory, string> = {
  frontend: 'text-sky-400 bg-sky-400/10',
  backend: 'text-emerald-400 bg-emerald-400/10',
  mobile: 'text-purple-400 bg-purple-400/10',
  cloud: 'text-amber-400 bg-amber-400/10',
  database: 'text-rose-400 bg-rose-400/10'
}

export const technologyIcons: Record<string, IconType> = {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaAws,
  FaPython,
  SiFlutter,
  SiFirebase,
  SiExpo,
  SiTailwindcss,
  SiVercel,
  SiTypescript,
  SiRedux,
  SiGraphql,
  SiSwagger,
  SiServerless,
  SiMongodb,
  SiGooglecloud,
  SiCloudflare
}

export interface Technology {
  name: string
  icon: keyof typeof technologyIcons
  category: TechnologyCategory
}

export interface KeyPoint {
  title: string
  content: string
}

export interface Timeline {
  title: string
  description: string
  date: string
}

export interface ProjectLinks {
  website?: string
  github?: string
  playStore?: string
  appStore?: string
}

export interface ProjectResources {
  logo: string
  screenshots?: string[]
}

export interface Project {
  id: string
  title: string
  description: string
  role: string
  company: string
  companyLink: string
  technologies: Technology[]
  images: string[]
  backgroundColor: string
  keyPoints: KeyPoint[]
  timeline: Timeline[]
  category: ProjectCategory
  priority: number
  featured: boolean
  links: ProjectLinks
  resources: ProjectResources
  confidential?: boolean
}

export interface Experience {
  role: string
  company: string
  location: string
  period: string
  description: string
  achievements: string[]
  tags: string[]
} 