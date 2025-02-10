import { HiCode, HiLightningBolt, HiAcademicCap } from 'react-icons/hi'

const services = [
  {
    title: "Desarrollo Cloud-Native",
    description: "Arquitecturas escalables y seguras en AWS y Google Cloud",
    icon: HiCode,
    features: [
      "Microservicios y Serverless",
      "Optimización de Costos",
      "CI/CD y DevOps",
      "Seguridad y Compliance"
    ],
    gradient: "from-lime-300/5 to-zinc-900/50"
  },
  {
    title: "Consultoría Técnica",
    description: "Optimización de procesos y arquitecturas de software",
    icon: HiLightningBolt,
    features: [
      "Code Review y Best Practices",
      "System Design",
      "Performance Optimization",
      "Tech Stack Selection"
    ],
    gradient: "from-lime-300/5 to-zinc-900/50"
  },
  {
    title: "Educación Tecnológica",
    description: "Workshops y mentoría para equipos de desarrollo",
    icon: HiAcademicCap,
    features: [
      "AI Integration",
      "Modern Development Stack",
      "Team Growth",
      "Technical Leadership"
    ],
    gradient: "from-lime-300/5 to-zinc-900/50"
  }
]

const FeaturedServices = () => {
  return (
    <section className="py-32 bg-zinc-900/50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full" />
            <p className="text-lime-300 font-medium">Servicios</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Soluciones Especializadas
          </h2>
          <p className="text-xl text-zinc-400">
            Combinando experiencia técnica y mejores prácticas para 
            entregar resultados excepcionales.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`group p-8 rounded-xl bg-gradient-to-br ${service.gradient} border border-zinc-800 hover:border-lime-300/30 transition-all hover:bg-lime-300/5`}
            >
              {/* Icon */}
              <div className="inline-flex p-3 rounded-lg bg-lime-300/10 text-lime-300 mb-6 group-hover:bg-lime-300/20 transition-colors">
                <service.icon className="w-6 h-6" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-zinc-400 mb-8">
                {service.description}
              </p>

              {/* Features */}
              <ul className="space-y-3">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <span className="w-1.5 h-1.5 bg-lime-300 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedServices 