const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-fixed opacity-5" />
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full" />
            <p className="text-lime-300 font-medium">Soluciones Premium</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Servicios de Consultoría 
            <span className="text-lime-300"> Estratégica</span>
          </h1>
          <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
            Transformación digital end-to-end para empresas que buscan innovar y 
            escalar sus operaciones a través de soluciones tecnológicas de alto impacto.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="container mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-12">
          {[
            {
              title: "Desarrollo de Productos Digitales",
              description: "Creación de soluciones web y móviles escalables",
              features: [
                "Aplicaciones Web Empresariales",
                "Apps Móviles Nativas y Cross-platform",
                "Arquitectura Cloud-native",
                "Integración con APIs y Servicios",
                "Testing y Quality Assurance",
                "Mantenimiento y Soporte"
              ],
              highlight: "Desde $15,000 USD"
            },
            {
              title: "Consultoría Tecnológica",
              description: "Asesoría estratégica para transformación digital",
              features: [
                "Auditoría de Arquitectura",
                "Optimización de Procesos",
                "Estrategia de Migración Cloud",
                "Seguridad y Compliance",
                "Selección de Stack Tecnológico",
                "Roadmap de Implementación"
              ],
              highlight: "Desde $5,000 USD"
            }
          ].map((service, index) => (
            <div key={index} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-br from-lime-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl -z-10"></div>
              <div className="p-8 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-lime-300/50 transition-all duration-300">
                <h2 className="text-3xl font-bold text-white mb-4">{service.title}</h2>
                <p className="text-zinc-400 mb-8">{service.description}</p>
                <ul className="space-y-4 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-zinc-300">
                      <span className="w-1.5 h-1.5 bg-lime-300 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-lime-300 font-mono">{service.highlight}</span>
                  <button className="px-6 py-3 bg-lime-300 text-zinc-900 rounded-lg font-medium hover:bg-lime-400 transition-colors">
                    Consultar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-lime-300/10 rounded-full mb-6">
            <div className="w-2 h-2 bg-lime-300 rounded-full" />
            <p className="text-lime-300 font-medium">¿Por Qué Elegirnos?</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Resultados Tangibles para Tu Negocio
          </h2>
          <p className="text-xl text-zinc-400">
            No solo construimos software, creamos ventajas competitivas que 
            impulsan el crecimiento de tu empresa.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Retorno de Inversión Claro",
              description: "Nuestras soluciones están diseñadas para generar resultados medibles: reducción de costos operativos de hasta 40%, incremento en eficiencia del 60% y mejora en satisfacción del cliente.",
              icon: "📈"
            },
            {
              title: "Ventaja Competitiva",
              description: "Te ayudamos a destacar en tu mercado con tecnología que te permite ser más ágil, eficiente y escalable que tu competencia. Nuestros clientes típicamente superan a su competencia en velocidad de innovación.",
              icon: "🏆"
            },
            {
              title: "Experiencia Comprobada",
              description: "Hemos ayudado a empresas a multiplicar sus ingresos mediante la automatización de procesos y la creación de nuevos canales digitales de venta.",
              icon: "✨"
            },
            {
              title: "Enfoque en Resultados",
              description: "Cada decisión técnica está alineada con tus objetivos de negocio. No vendemos tecnología, entregamos soluciones que generan valor real para tu empresa.",
              icon: "🎯"
            },
            {
              title: "Soporte Continuo",
              description: "No desaparecemos después del lanzamiento. Nos convertimos en tu socio tecnológico a largo plazo, asegurando que tu inversión siga generando valor.",
              icon: "🤝"
            },
            {
              title: "Metodología Probada",
              description: "Nuestro proceso ha sido refinado con más de 50 proyectos exitosos, garantizando entregas a tiempo y dentro del presupuesto, sin sorpresas desagradables.",
              icon: "⚡"
            }
          ].map((benefit, index) => (
            <div key={index} className="group p-8 bg-zinc-900/50 rounded-xl border border-zinc-800 hover:border-lime-300/50 transition-all duration-300">
              <div className="text-4xl mb-6">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {benefit.title}
              </h3>
              <p className="text-zinc-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="bg-zinc-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Casos de Éxito
            </h2>
            <p className="text-xl text-zinc-400">
              Resultados reales de empresas que confiaron en nosotros
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                company: "Empresa de Logística",
                result: "60% de reducción en tiempos de entrega",
                description: "Implementamos un sistema de gestión que automatizó la asignación de rutas y seguimiento en tiempo real, permitiendo entregar más paquetes en menos tiempo."
              },
              {
                company: "Clínica de Salud Mental",
                result: "85% de mejora en atención al paciente",
                description: "Desarrollamos una plataforma que redujo los tiempos de espera y mejoró el seguimiento de tratamientos, resultando en mejores resultados clínicos."
              }
            ].map((story, index) => (
              <div key={index} className="p-8 bg-zinc-800/50 rounded-xl">
                <div className="text-lime-300 font-medium mb-4">{story.company}</div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {story.result}
                </h3>
                <p className="text-zinc-400">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-zinc-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Proceso de Trabajo
            </h2>
            <p className="text-xl text-zinc-400">
              Metodología probada para entregar resultados excepcionales
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Descubrimiento",
                description: "Análisis profundo de necesidades y objetivos de negocio"
              },
              {
                step: "02",
                title: "Estrategia",
                description: "Diseño de solución y planificación detallada"
              },
              {
                step: "03",
                title: "Desarrollo",
                description: "Implementación ágil con entregas incrementales"
              },
              {
                step: "04",
                title: "Optimización",
                description: "Mejora continua basada en métricas y feedback"
              }
            ].map((phase, index) => (
              <div key={index} className="relative group">
                <div className="p-6 bg-zinc-800/50 rounded-xl border border-zinc-700/50 hover:border-lime-300/50 transition-all duration-300">
                  <span className="text-4xl font-bold text-lime-300/50 mb-4 block">
                    {phase.step}
                  </span>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {phase.title}
                  </h3>
                  <p className="text-zinc-400">
                    {phase.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-lime-300/30" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "¿Cuál es el tiempo promedio de desarrollo?",
                answer: "Los proyectos típicamente toman entre 3-6 meses, dependiendo de la complejidad y alcance. Cada proyecto recibe un timeline detallado durante la fase de planificación."
              },
              {
                question: "¿Cómo se manejan los pagos?",
                answer: "Trabajamos con un modelo de pagos por hitos, dividiendo el proyecto en fases claras con entregables específicos. Cada fase requiere un porcentaje del presupuesto total."
              },
              {
                question: "¿Qué incluye el soporte post-lanzamiento?",
                answer: "Ofrecemos 3 meses de soporte técnico incluido, cubriendo bugs, optimizaciones y ajustes menores. También disponemos de planes de mantenimiento extendido."
              }
            ].map((faq, index) => (
              <div key={index} className="p-6 bg-zinc-900/50 rounded-xl">
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-zinc-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-900/50 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Comencemos Tu Proyecto
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Agenda una llamada de descubrimiento gratuita para discutir tus 
              necesidades y explorar cómo puedo ayudarte.
            </p>
            <button className="group px-8 py-4 bg-lime-300 text-zinc-900 rounded-lg font-medium relative overflow-hidden transition-all duration-300">
              <span className="relative z-10">Agendar Consulta Estratégica</span>
              <div className="absolute inset-0 bg-lime-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Services 