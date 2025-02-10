const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Más personal y diferenciado */}
      <section className="relative container mx-auto px-4 py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-fixed opacity-5" />
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Imagen Personal */}
          <div className="relative order-2 md:order-1">
            <div className="aspect-[4/5] bg-zinc-800 rounded-2xl overflow-hidden relative">
              {/* Aquí iría tu foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-lime-300/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-lime-300/10 rounded-full blur-2xl" />
          </div>

          {/* Contenido */}
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-lime-300 rounded-full animate-pulse" />
              <p className="text-lime-300 font-medium">Disponible para Proyectos y Mentoría</p>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Hola, soy Noe Osorio
            </h1>
            <p className="text-xl text-zinc-400 leading-relaxed mb-8">
              Ingeniero de Software visionario apasionado por crear soluciones tecnológicas 
              innovadoras que generan impacto global. Dedicado a la educación como servicio, 
              explorando constantemente nuevas metodologías para optimizar los procesos de 
              enseñanza y aprendizaje.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full">
                <span className="w-2 h-2 bg-lime-300 rounded-full" />
                <span className="text-zinc-300">Senior Software Engineer</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full">
                <span className="w-2 h-2 bg-lime-300 rounded-full" />
                <span className="text-zinc-300">Educador Tecnológico</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-zinc-800/50 rounded-full">
                <span className="w-2 h-2 bg-lime-300 rounded-full" />
                <span className="text-zinc-300">Creador de Contenido</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="bg-zinc-900/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Expertise Técnico
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                area: "Frontend Development",
                skills: ["TypeScript", "React", "React Native", "Flutter", "Next.js", "TailwindCSS"]
              },
              {
                area: "Backend & Cloud",
                skills: ["Node.js", "Python", "AWS Lambda", "Firebase", "PostgreSQL", "MongoDB"]
              },
              {
                area: "DevOps & Tools",
                skills: ["AWS", "Git", "Jest", "Cypress", "Webpack", "CI/CD"]
              }
            ].map((expertise, index) => (
              <div key={index} className="group p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/50 transition-all duration-300">
                <h3 className="text-2xl font-semibold text-white mb-6">{expertise.area}</h3>
                <div className="flex flex-wrap gap-3">
                  {expertise.skills.map((skill, skillIndex) => (
                    <span key={skillIndex} className="px-4 py-2 bg-zinc-900/50 text-zinc-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="container mx-auto px-4 py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
          Experiencia Destacada
        </h2>
        <div className="max-w-4xl mx-auto space-y-12">
          {[
            {
              role: "Senior Consultant – Software Engineer",
              company: "Wellmark (Apex Systems)",
              period: "2024 - Presente",
              achievements: [
                "Migración y modernización de servicios AWS",
                "Desarrollo de APIs robustas con TypeScript",
                "Implementación de sistemas de seguridad WAFv2"
              ]
            },
            {
              role: "Software Engineer",
              company: "Osmind | San Francisco",
              period: "2022 - 2023",
              achievements: [
                "Sistema de programación in-house con 98% de uptime",
                "Sistemas HIPAA-compliant de facturación",
                "Reducción de 85% en tasas críticas"
              ]
            },
            {
              role: "Software Engineer",
              company: "Clip | Ciudad de México",
              period: "2021 - 2022",
              achievements: [
                "Automatización de servicios logísticos",
                "Reducción del 60% en tiempos de procesamiento",
                "Arquitectura de microservicios escalable"
              ]
            }
          ].map((exp, index) => (
            <div key={index} className="group relative bg-zinc-900/30 p-8 rounded-xl hover:bg-zinc-800/50 transition-all duration-300">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">{exp.role}</h3>
                  <p className="text-lime-300">{exp.company}</p>
                </div>
                <p className="text-zinc-400 font-mono">{exp.period}</p>
              </div>
              <ul className="space-y-2">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-zinc-300 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-lime-300 rounded-full" />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Education as Service Section */}
      <section className="bg-zinc-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
              <div className="w-2 h-2 bg-lime-300 rounded-full" />
              <p className="text-lime-300 font-medium">Education as a Service</p>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transformando la Educación en Tecnología
            </h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              Creo firmemente que la educación es el catalizador más poderoso para 
              el cambio social y el crecimiento profesional. Mi misión es democratizar 
              el conocimiento tecnológico y formar la próxima generación de 
              desarrolladores de clase mundial.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Mentoría Personalizada",
                description: "Guía individual adaptada a tus objetivos específicos, ayudándote a acelerar tu crecimiento profesional en tecnología."
              },
              {
                title: "Contenido Educativo",
                description: "Creación de recursos de aprendizaje accesibles y de alta calidad, desde tutoriales hasta cursos completos de desarrollo."
              },
              {
                title: "Workshops y Charlas",
                description: "Sesiones interactivas sobre tecnologías emergentes y mejores prácticas en desarrollo de software."
              }
            ].map((service, index) => (
              <div key={index} className="group p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/50 transition-all duration-300">
                <h3 className="text-2xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-zinc-400">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
              <h3 className="text-2xl font-semibold text-white mb-6">Impacto en Números</h3>
              <ul className="space-y-4">
                <li className="text-zinc-300 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2" />
                  <span>+100,000 views en contenido educativo de programación en TikTok</span>
                </li>
                <li className="text-zinc-300 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2" />
                  <span>+200 estudiantes en sesiones en vivo sobre algoritmos y desarrollo</span>
                </li>
                <li className="text-zinc-300 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2" />
                  <span>+50 mentorías personalizadas exitosas</span>
                </li>
              </ul>
            </div>
            <div className="p-8 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
              <h3 className="text-2xl font-semibold text-white mb-6">Innovación en Educación</h3>
              <ul className="space-y-4">
                <li className="text-zinc-300 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2" />
                  <span>Integración de IA en metodologías de enseñanza personalizadas</span>
                </li>
                <li className="text-zinc-300 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2" />
                  <span>Desarrollo de currículos adaptados a las necesidades de la industria actual</span>
                </li>
                <li className="text-zinc-300 flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-lime-300 rounded-full mt-2" />
                  <span>Enfoque práctico basado en proyectos reales y casos de estudio</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-br from-lime-300/10 to-transparent rounded-xl">
            <blockquote className="text-xl text-zinc-300 italic text-center">
              "La educación no solo debe ser accesible, sino transformadora. 
              Mi objetivo es crear un puente entre el talento emergente y las 
              oportunidades en la industria tecnológica, formando no solo mejores 
              programadores, sino mejores profesionales."
            </blockquote>
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