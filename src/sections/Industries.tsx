import { HiOutlineChip, HiOutlineCurrencyDollar, HiOutlineHeart, HiOutlineLightBulb } from 'react-icons/hi'

const industries = [
  {
    icon: HiOutlineHeart,
    name: "Healthcare",
    description: "Soluciones HIPAA-compliant para gestión de expedientes médicos y telemedicina",
    color: "text-rose-300",
    bgColor: "bg-rose-300/10",
    borderColor: "hover:border-rose-300/30",
    projects: "3+"
  },
  {
    icon: HiOutlineCurrencyDollar,
    name: "Fintech",
    description: "Sistemas de pagos y procesamiento de transacciones de alto rendimiento",
    color: "text-lime-300",
    bgColor: "bg-lime-300/10",
    borderColor: "hover:border-lime-300/30",
    projects: "5+"
  },
  {
    icon: HiOutlineChip,
    name: "Enterprise",
    description: "Arquitecturas cloud-native para optimización de procesos empresariales",
    color: "text-blue-300",
    bgColor: "bg-blue-300/10",
    borderColor: "hover:border-blue-300/30",
    projects: "10+"
  },
  {
    icon: HiOutlineLightBulb,
    name: "EdTech",
    description: "Plataformas educativas y sistemas de gestión de aprendizaje",
    color: "text-amber-300",
    bgColor: "bg-amber-300/10",
    borderColor: "hover:border-amber-300/30",
    projects: "4+"
  }
]

const Industries = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full animate-pulse" />
            <p className="text-lime-300 font-medium">Experiencia por Industria</p>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Transformando <span className="text-lime-300">Ideas</span> en 
            <br />
            Soluciones de <span className="text-lime-300">Alto Impacto</span>
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            Creando valor a través de soluciones tecnológicas innovadoras 
            que impulsan el crecimiento en diferentes sectores.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {industries.map((industry, index) => (
            <div 
              key={index}
              className={`group p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 ${industry.borderColor} transition-all hover:bg-zinc-800/70 flex flex-col h-full`}
            >
              <div className="flex items-center gap-4 mb-6">
                {/* Icon */}
                <div className={`p-4 rounded-xl ${industry.bgColor} ${industry.color} shrink-0`}>
                  <industry.icon className="w-8 h-8" />
                </div>
                {/* Title */}
                <h3 className={`text-2xl font-semibold ${industry.color} leading-tight`}>
                  {industry.name}
                </h3>
              </div>

              {/* Description */}
              <p className="text-zinc-400 leading-relaxed flex-grow">
                {industry.description}
              </p>

              {/* Projects Count */}
              <div className="mt-6 flex items-center gap-3">
                <span className={`text-3xl font-bold ${industry.color} leading-none`}>
                  {industry.projects}
                </span>
                <span className="text-zinc-400 font-medium leading-tight">
                  Proyectos<br />
                  Completados
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Industries 