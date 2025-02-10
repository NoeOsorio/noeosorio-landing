import { HiUsers, HiLightningBolt, HiAcademicCap, HiCode } from 'react-icons/hi'

const metrics = [
  {
    number: "100k+",
    label: "Views en Contenido",
    description: "Alcance en contenido educativo",
    icon: HiUsers,
    delay: "0"
  },
  {
    number: "200+",
    label: "Estudiantes",
    description: "En workshops y mentorías",
    icon: HiAcademicCap,
    delay: "100"
  },
  {
    number: "50+",
    label: "Proyectos",
    description: "Entregados exitosamente",
    icon: HiCode,
    delay: "200"
  },
  {
    number: "400%",
    label: "Mejora",
    description: "En productividad de equipos",
    icon: HiLightningBolt,
    delay: "300"
  }
]

const ImpactNumbers = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full" />
            <p className="text-lime-300 font-medium">Impacto</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Resultados que Hablan
          </h2>
          <p className="text-xl text-zinc-400">
            Métricas que demuestran el impacto real en proyectos y personas.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className="group relative bg-zinc-800/30 rounded-xl p-8 hover:bg-lime-300/5 transition-all"
              style={{ animationDelay: `${metric.delay}ms` }}
            >
              {/* Background Accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime-300/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {/* Icon */}
              <div className="relative">
                <div className="inline-flex p-3 rounded-lg bg-lime-300/10 text-lime-300 mb-6 group-hover:bg-lime-300/20 transition-colors">
                  <metric.icon className="w-6 h-6" />
                </div>
              </div>

              {/* Numbers */}
              <div className="relative space-y-2">
                <p className="text-4xl font-bold text-white">
                  {metric.number}
                </p>
                <p className="text-lg font-medium text-lime-300">
                  {metric.label}
                </p>
                <p className="text-sm text-zinc-400">
                  {metric.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImpactNumbers 