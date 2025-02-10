import { Technology, technologyColors, technologyIcons, Experience } from '../types/portfolio'
import { useState } from 'react'

const TechnologyBadge = ({ tech }: { tech: Technology }) => {
  const Icon = technologyIcons[tech.icon]
  return (
    <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${technologyColors[tech.category]}`}>
      <Icon className="w-4 h-4" />
      {tech.name}
    </span>
  )
}

const technologies: Technology[] = [
  // Frontend
  { name: "React", icon: "FaReact", category: "frontend" },
  { name: "Next.js", icon: "SiVercel", category: "frontend" },
  { name: "TypeScript", icon: "SiTypescript", category: "frontend" },
  { name: "Tailwind", icon: "SiTailwindcss", category: "frontend" },
  { name: "Redux", icon: "SiRedux", category: "frontend" },

  // Backend
  { name: "Node.js", icon: "FaNodeJs", category: "backend" },
  { name: "Python", icon: "FaPython", category: "backend" },
  { name: "GraphQL", icon: "SiGraphql", category: "backend" },
  { name: "REST APIs", icon: "SiSwagger", category: "backend" },
  { name: "Serverless", icon: "SiServerless", category: "backend" },

  // Mobile
  { name: "React Native", icon: "FaReact", category: "mobile" },
  { name: "Flutter", icon: "SiFlutter", category: "mobile" },
  { name: "Expo", icon: "SiExpo", category: "mobile" },

  // Database & Cloud
  { name: "MongoDB", icon: "SiMongodb", category: "database" },
  { name: "PostgreSQL", icon: "FaDatabase", category: "database" },
  { name: "Firebase", icon: "SiFirebase", category: "cloud" },
  { name: "AWS", icon: "FaAws", category: "cloud" },
  { name: "Google Cloud", icon: "SiGooglecloud", category: "cloud" },
  { name: "Cloudflare", icon: "SiCloudflare", category: "cloud" },
  { name: "Vercel", icon: "SiVercel", category: "cloud" }
]

const industries = [
  { 
    name: "Educación", 
    color: "text-blue-300 bg-blue-300/10",
    description: "Democratizando el conocimiento tecnológico a través de mentoría y contenido educativo"
  },
  { 
    name: "Salud", 
    color: "text-emerald-300 bg-emerald-300/10",
    description: "Desarrollando soluciones HIPAA-compliant que mejoran la atención médica"
  },
  { 
    name: "Finanzas", 
    color: "text-amber-300 bg-amber-300/10",
    description: "Construyendo sistemas seguros y escalables para procesamiento de pagos"
  },
  { 
    name: "Business", 
    color: "text-purple-300 bg-purple-300/10",
    description: "Optimizando operaciones empresariales mediante automatización inteligente"
  }
]

const recentExperience = [
  {
    role: "Senior Consultant – Software Engineer",
    company: "Wellmark (Apex Systems)",
    location: "Des Moines, Iowa (Remoto)",
    period: "2024 - Presente",
    description: "Liderando iniciativas de modernización cloud y desarrollo de APIs empresariales.",
    achievements: [
      "Migración y modernización de servicios AWS con 99.9% de disponibilidad",
      "Desarrollo de APIs robustas con TypeScript y Node.js para procesamiento de claims",
      "Implementación de sistemas de seguridad WAFv2 y monitoreo avanzado",
      "Optimización de costos cloud reduciendo gastos operativos en un 30%"
    ],
    tags: ["AWS", "TypeScript", "Node.js", "Microservicios"]
  },
  {
    role: "Software Engineer",
    company: "Osmind",
    location: "San Francisco, CA (Remoto)",
    period: "2022 - 2023",
    description: "Desarrollo de soluciones healthcare-tech enfocadas en salud mental.",
    achievements: [
      "Sistema de programación in-house con 98% de uptime y +10k citas mensuales",
      "Implementación de sistemas HIPAA-compliant para facturación y manejo de datos sensibles",
      "Reducción de 85% en tasas de error en procesamiento de pagos",
      "Arquitectura de microservicios para escalabilidad y mantenibilidad"
    ],
    tags: ["React", "Node.js", "AWS", "HIPAA"]
  },
  {
    role: "Software Engineer",
    company: "Clip",
    location: "Ciudad de México",
    period: "2021 - 2022",
    description: "Desarrollo de soluciones de logística y pagos para e-commerce.",
    achievements: [
      "Automatización de servicios logísticos procesando +50k órdenes diarias",
      "Reducción del 60% en tiempos de procesamiento de pagos",
      "Integración con Amazon Seller API para sincronización en tiempo real",
      "Implementación de CI/CD reduciendo tiempo de deploy en un 70%"
    ],
    tags: ["React", "Node.js", "AWS", "Microservicios"]
  }
]

const pastExperience = [
  {
    role: "Front-End Team Lead",
    company: "Full Stack",
    location: "Puebla, MX",
    period: "Ago 2021 – Jun 2022",
    description: "Liderazgo de equipos frontend y mentoría de desarrolladores junior.",
    achievements: [
      "Mentoría a más de 10 desarrolladores junior, ayudándoles a conseguir roles en las principales empresas tech de México",
      "Dirección de equipos frontend y UX/UI para sistemas en industrias de cuidado de adultos mayores y medicina veterinaria",
      "Implementación de metodologías ágiles y mejores prácticas de desarrollo",
      "Balance entre soluciones innovadoras y diseño centrado en el usuario"
    ],
    tags: ["React", "UX/UI", "Team Leadership", "Mentoring"]
  },
  {
    role: "Frontend Engineer",
    company: "Finloop",
    location: "Puebla, MX",
    period: "Ago 2020 – Nov 2021",
    description: "Desarrollo frontend y optimización de rendimiento para aplicaciones financieras.",
    achievements: [
      "Mejora del rendimiento frontend integrando MongoDB con React, aumentando 4x la capacidad de tráfico",
      "Automatización de pipelines de deployment para aplicaciones React en AWS S3",
      "Reducción de tiempos de deployment a minutos",
      "Implementación de mejores prácticas de desarrollo y testing"
    ],
    tags: ["React", "MongoDB", "AWS", "CI/CD"]
  },
  {
    role: "Tech Lead",
    company: "SmartKode",
    location: "Puebla, MX",
    period: "Oct 2018 – Abr 2020",
    description: "Liderazgo técnico en proyectos de transformación digital.",
    achievements: [
      "Migración exitosa de aplicación crítica de Ionic a Flutter",
      "Obtención de tres contratos adicionales debido a la calidad del trabajo",
      "Digitalización de flujos de trabajo manuales para correduría de seguros",
      "Implementación de funciones avanzadas de reportes para insights accionables"
    ],
    tags: ["Flutter", "Ionic", "Digital Transformation", "Leadership"]
  }
]

const ExperienceCard = ({ experience }: { experience: Experience }) => {
  return (
    <div 
      className="group relative bg-zinc-900/30 p-8 rounded-xl hover:bg-zinc-800/50 transition-all duration-300"
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-lime-300/20 rounded-l-xl group-hover:bg-lime-300/40 transition-colors" />
      
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-white mb-1">{experience.role}</h3>
            <div className="flex items-center gap-2 text-zinc-400">
              <span className="text-lime-300">{experience.company}</span>
              <span>•</span>
              <span>{experience.location}</span>
            </div>
          </div>
          <p className="text-zinc-400 font-mono bg-zinc-800/50 px-3 py-1 rounded-full text-sm">
            {experience.period}
          </p>
        </div>

        {/* Description */}
        <p className="text-zinc-300">{experience.description}</p>

        {/* Achievements */}
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-white">Logros Principales</h4>
          <ul className="space-y-2">
            {experience.achievements.map((achievement: string, i: number) => (
              <li key={i} className="text-zinc-300 flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-4">
          {experience.tags.map((tag: string, i: number) => (
            <span 
              key={i} 
              className="px-3 py-1 bg-zinc-800/50 text-zinc-300 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const ExperienceSection = () => {
  const [showAllExperience, setShowAllExperience] = useState(false)

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full" />
            <p className="text-lime-300 font-medium">Trayectoria Profesional</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Experiencia Destacada
          </h2>
        </div>

        <div className="space-y-12">
          {recentExperience.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} />
          ))}

          {showAllExperience && (
            <>
              <div className="relative py-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-zinc-800"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-zinc-900 px-4 text-sm text-zinc-400">
                    Experiencia Anterior
                  </span>
                </div>
              </div>

              {pastExperience.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
            </>
          )}

          <div className="text-center pt-8">
            <button
              onClick={() => setShowAllExperience(!showAllExperience)}
              className="px-6 py-3 bg-zinc-800/50 hover:bg-zinc-800 text-zinc-300 rounded-lg transition-colors"
            >
              {showAllExperience ? 'Mostrar Menos' : 'Ver Más Experiencia'}
              <svg
                className={`inline-block ml-2 w-4 h-4 transform transition-transform ${
                  showAllExperience ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section Mejorado */}
      <section className="relative container mx-auto px-4 py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-fixed opacity-5" />
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Imagen Personal */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] bg-zinc-800 rounded-2xl overflow-hidden relative">
              {/* Tu foto profesional */}
            </div>
            <div className="absolute -bottom-8 left-8 right-8 bg-zinc-800/90 backdrop-blur-sm p-4 rounded-xl border border-zinc-700/50">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <p className="text-zinc-300 text-sm">
                  Disponible para roles de Tech Lead y Senior Software Engineer
                </p>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="order-1 md:order-2 space-y-8">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Noe Osorio
              </h1>
              <p className="text-xl text-lime-300 font-medium">
                Senior Software Engineer & Tech Educator
              </p>
            </div>

            <p className="text-xl text-zinc-400 leading-relaxed">
              +5 años transformando ideas en soluciones tecnológicas escalables. 
              Especializado en arquitecturas cloud-native y desarrollo full-stack, 
              con un fuerte compromiso en mentorear a la próxima generación de 
              desarrolladores.
            </p>

            {/* Industrias con descripciones */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-white">Áreas de Impacto</h2>
              <div className="grid gap-4">
                {industries.map((industry, i) => (
                  <div 
                    key={i} 
                    className={`p-4 rounded-xl border border-zinc-800 hover:border-lime-300/50 transition-colors ${industry.color.replace('text', 'bg').replace('/10', '/5')}`}
                  >
                    <h3 className={`font-medium mb-2 ${industry.color.replace('bg', 'text')}`}>
                      {industry.name}
                    </h3>
                    <p className="text-zinc-400 text-sm">
                      {industry.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords para SEO y reclutadores */}
            <div className="flex flex-wrap gap-2 pt-4">
              {[
                "Software Architecture",
                "Team Leadership",
                "Cloud Solutions",
                "Tech Mentorship",
                "Agile Development",
                "System Design"
              ].map((keyword, i) => (
                <span key={i} className="px-3 py-1 bg-zinc-800/50 rounded-full text-sm text-zinc-400">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="bg-zinc-900/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">
            Tech Stack
          </h2>
          
          <div className="grid gap-16">
            {/* Frontend */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Frontend Development</h3>
              <div className="flex flex-wrap gap-2">
                {technologies
                  .filter(tech => tech.category === 'frontend')
                  .map((tech, i) => (
                    <TechnologyBadge key={i} tech={tech} />
                  ))}
              </div>
            </div>

            {/* Backend */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Backend & APIs</h3>
              <div className="flex flex-wrap gap-2">
                {technologies
                  .filter(tech => tech.category === 'backend')
                  .map((tech, i) => (
                    <TechnologyBadge key={i} tech={tech} />
                  ))}
              </div>
            </div>

            {/* Mobile */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Mobile Development</h3>
              <div className="flex flex-wrap gap-2">
                {technologies
                  .filter(tech => tech.category === 'mobile')
                  .map((tech, i) => (
                    <TechnologyBadge key={i} tech={tech} />
                  ))}
              </div>
            </div>

            {/* Cloud & DevOps */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-white">Cloud & Infrastructure</h3>
              <div className="flex flex-wrap gap-2">
                {technologies
                  .filter(tech => tech.category === 'cloud' || tech.category === 'database')
                  .map((tech, i) => (
                    <TechnologyBadge key={i} tech={tech} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <ExperienceSection />

      {/* Education as Service Section */}
      <section className="bg-zinc-900/50 py-32">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-lime-300 rounded-full" />
              <p className="text-lime-300 font-medium">Education & Innovation</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transformando la Educación a través de la Tecnología
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Combinando educación, tecnología e innovación para crear experiencias de 
              aprendizaje significativas y accesibles.
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-5xl mx-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {[
                { number: "100k+", label: "Views en Contenido" },
                { number: "200+", label: "Estudiantes" },
                { number: "50+", label: "Mentorías" },
                { number: "400%", label: "Mejora en Productividad" }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-zinc-800/30 rounded-xl text-center">
                  <p className="text-2xl font-bold text-lime-300 mb-1">{stat.number}</p>
                  <p className="text-sm text-zinc-400">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Experience Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* AI Education */}
              <div className="group relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-lime-300/10 rounded-lg">
                      <svg className="w-6 h-6 text-lime-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">AI in Education Instructor</h3>
                      <p className="text-zinc-400">Instituto Tecnológico Superior de Salina Cruz</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Workshops sobre integración de IA en metodologías educativas",
                      "Implementación de ChatGPT y Copilot en procesos educativos",
                      "Automatización de creación y evaluación de exámenes"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* SaaS Development */}
              <div className="group relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-lime-300/10 rounded-lg">
                      <svg className="w-6 h-6 text-lime-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">SaaS Developer & Educator</h3>
                      <p className="text-zinc-400">Independent</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Desarrollo de soluciones open-source con JavaScript y TypeScript",
                      "Automatización de flujos de contenido con IA",
                      "Herramientas de automatización Python para optimización de contenido"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Academic Advisor */}
              <div className="group relative bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 p-8 rounded-xl border border-zinc-700/50 hover:border-lime-300/30 transition-all">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-lime-300/10 rounded-lg">
                      <svg className="w-6 h-6 text-lime-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Academic Advisor</h3>
                      <p className="text-zinc-400">Instituto Tecnológico Superior de Tepeaca</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {[
                      "Workshop de desarrollo web con React para estudiantes de Ing. en TI",
                      "Participación en cuadro de expertos para mejora curricular",
                      "Evaluación de desempeño académico y docente"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div className="mt-16">
              <h3 className="text-xl font-semibold text-white mb-6">Áreas de Expertise</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "AI en Educación",
                  "Automatización",
                  "Open Source",
                  "Mentoría Tech",
                  "Innovación Educativa",
                  "Content Creation",
                  "Workshop Facilitation",
                  "Educational Technology"
                ].map((tag, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-zinc-800/50 text-zinc-300 rounded-full text-sm hover:bg-zinc-800 hover:text-lime-300 transition-colors cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="mt-16 p-8 bg-gradient-to-br from-lime-300/5 to-transparent rounded-xl border border-lime-300/10">
              <blockquote className="text-xl text-zinc-300 italic text-center">
                "La combinación de tecnología y educación no solo democratiza el conocimiento, 
                sino que crea nuevas formas de aprender y crecer profesionalmente."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para Innovar Juntos?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Ya sea que busques transformar tu negocio con tecnología o mejorar tus 
            habilidades como desarrollador, estoy aquí para ayudarte.
          </p>
          <button className="group px-8 py-4 bg-lime-300 text-zinc-900 rounded-lg font-medium relative overflow-hidden transition-all duration-300">
            <span className="relative z-10">Agendar una Llamada</span>
            <div className="absolute inset-0 bg-lime-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>
      </section>
    </div>
  )
}

export default About 