const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Más impactante y moderna */}
      <section className="relative container mx-auto px-4 py-32 md:py-48">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black -z-10" />
        <div className="absolute inset-0 bg-[linear-gradient(40deg,#0000,#lime-300/10,#0000)] -z-10" />
        
        {/* Grid decoration */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-fixed opacity-5 -z-10" />
        
        <div className="max-w-4xl">
          <div className="inline-block px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <p className="text-lime-300 font-medium">Consultoría Premium de Software</p>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Transformando Ideas en 
            <span className="relative">
              <span className="relative z-10 text-lime-300"> Soluciones Digitales</span>
              <span className="absolute inset-0 bg-lime-300/10 blur-2xl -z-0"></span>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed max-w-2xl">
            Desarrollo estratégico de software de alto impacto para empresas que 
            buscan dominar su industria a través de la innovación tecnológica.
          </p>
          <div className="flex gap-6">
            <button className="group px-8 py-4 bg-lime-300 text-zinc-900 rounded-lg font-medium relative overflow-hidden transition-all duration-300">
              <span className="relative z-10">Agendar Consultoría Estratégica</span>
              <div className="absolute inset-0 bg-lime-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
            <button className="px-8 py-4 border border-lime-300 text-lime-300 rounded-lg font-medium hover:bg-lime-300/10 transition-all duration-300">
              Ver Casos de Éxito
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section - Más sofisticada */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-4 gap-12">
          {[
            { number: "10+", label: "Años de Experiencia" },
            { number: "50+", label: "Proyectos Transformadores" },
            { number: "30+", label: "Empresas Potenciadas" },
            { number: "3", label: "Países Impactados" }
          ].map((stat, index) => (
            <div key={index} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10"></div>
              <p className="text-5xl font-bold text-lime-300 mb-3">{stat.number}</p>
              <p className="text-zinc-400 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Preview - Más exclusivo */}
      <section className="relative bg-zinc-900/50 py-32">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Servicios de Elite
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl">
              Soluciones tecnológicas diseñadas meticulosamente para empresas que 
              buscan la excelencia y el liderazgo en su industria.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Web Apps Empresariales",
                description: "Plataformas web robustas y escalables que transforman la operación de tu negocio."
              },
              {
                title: "Mobile Apps Premium",
                description: "Experiencias móviles excepcionales que conectan con tu audiencia de manera única."
              },
              {
                title: "Consultoría Estratégica",
                description: "Asesoramiento experto para maximizar el ROI de tu inversión tecnológica."
              }
            ].map((service, index) => (
              <div key={index} className="group relative p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-lime-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-zinc-400 text-lg leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          Proyectos Destacados
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-lg overflow-hidden">
            <div className="aspect-video bg-zinc-800"></div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-white mb-2">
                Nombre del Proyecto
              </h3>
              <p className="text-zinc-400 mb-4">
                Descripción breve del proyecto y su impacto en el negocio del cliente.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-sm">
                  Node.js
                </span>
              </div>
            </div>
          </div>
          {/* Repeat project card */}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-zinc-900 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Lo Que Dicen Mis Clientes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-800 p-6 rounded-lg">
              <p className="text-zinc-300 mb-6">
                "Noe no solo entregó una solución técnica excepcional, sino que 
                también nos ayudó a entender mejor nuestras necesidades tecnológicas."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-zinc-700 rounded-full mr-4"></div>
                <div>
                  <p className="text-white font-medium">Nombre del Cliente</p>
                  <p className="text-zinc-400">CEO, Empresa</p>
                </div>
              </div>
            </div>
            {/* Repeat testimonial card */}
          </div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Empresas Que Confían en Mí
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="h-20 bg-zinc-900 rounded-lg"></div>
          <div className="h-20 bg-zinc-900 rounded-lg"></div>
          <div className="h-20 bg-zinc-900 rounded-lg"></div>
          <div className="h-20 bg-zinc-900 rounded-lg"></div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para transformar tu negocio?
          </h2>
          <p className="text-xl text-zinc-400 mb-8">
            Agenda una consultoría gratuita y descubre cómo la tecnología 
            puede impulsar tu crecimiento.
          </p>
          <button className="px-8 py-4 bg-lime-300 text-zinc-900 rounded-lg font-medium hover:bg-lime-400 transition-colors">
            Agendar Llamada
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home 