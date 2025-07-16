import { motion } from 'framer-motion';
import { HiOutlineExternalLink, HiOutlineCode } from 'react-icons/hi';
import { Project } from '../../types/portfolio';

const b2bProjects: Project[] = [
  {
    id: 'transcriptor',
    title: "Transcriptor AI",
    description: "Plataforma de transcripción automática potenciada por IA. Convierte audio y video a texto con alta precisión.",
    role: "Full Stack Developer",
    company: "SakuraKode",
    companyLink: "https://sakurakode.com",
    technologies: [
      { name: "React", icon: "FaReact", category: "frontend" },
      { name: "Node.js", icon: "FaNodeJs", category: "backend" },
      { name: "AWS", icon: "FaAws", category: "cloud" }
    ],
    images: ["/projects/transcriptor-dashboard.jpg"],
    backgroundColor: "#0EA5E9",
    keyPoints: [
      {
        title: "Transcripción en Tiempo Real",
        content: "Procesamiento de audio en tiempo real con tecnología de streaming y WebSockets."
      },
      {
        title: "Multi-idioma",
        content: "Soporte para más de 30 idiomas con detección automática del idioma hablado."
      },
      {
        title: "Análisis de Sentimientos",
        content: "Identificación automática de emociones y temas clave en las conversaciones."
      }
    ],
    timeline: [
      {
        title: "Lanzamiento",
        description: "MVP con funcionalidades core",
        date: "2024"
      }
    ],
    category: 'web',
    priority: 1,
    featured: true,
    links: {
      website: 'https://transcriptor.sakurakode.com'
    },
    resources: {
      logo: "/projects/transcriptor-logo.png"
    }
  },
  {
    id: 'proposals',
    title: "Proposals",
    description: "Sistema de generación y gestión de propuestas comerciales con IA. Crea documentos profesionales en minutos.",
    role: "Full Stack Developer",
    company: "SakuraKode",
    companyLink: "https://sakurakode.com",
    technologies: [
      { name: "Next.js", icon: "SiNextdotjs", category: "frontend" },
      { name: "GraphQL", icon: "SiGraphql", category: "backend" },
      { name: "MongoDB", icon: "SiMongodb", category: "database" }
    ],
    images: ["/projects/proposals-dashboard.jpg"],
    backgroundColor: "#8B5CF6",
    keyPoints: [
      {
        title: "Templates Inteligentes",
        content: "Biblioteca de templates personalizables que se adaptan a tu marca y sector."
      },
      {
        title: "Automatización con IA",
        content: "Generación automática de contenido relevante basado en el perfil del cliente."
      },
      {
        title: "Analytics Avanzados",
        content: "Seguimiento de métricas de conversión y engagement de propuestas."
      }
    ],
    timeline: [
      {
        title: "Beta",
        description: "Versión beta con primeros usuarios",
        date: "2024"
      }
    ],
    category: 'web',
    priority: 2,
    featured: true,
    links: {
      website: 'https://proposals.sakurakode.com'
    },
    resources: {
      logo: "/projects/proposals-logo.png"
    }
  },
  {
    id: 'ecommerce-dashboard',
    title: "E-commerce Suite",
    description: "Dashboard administrativo completo para e-commerce. Gestión de productos, pedidos, clientes y métricas.",
    role: "Full Stack Developer",
    company: "White Label",
    companyLink: "https://sakurakode.com",
    technologies: [
      { name: "React", icon: "FaReact", category: "frontend" },
      { name: "Node.js", icon: "FaNodeJs", category: "backend" },
      { name: "PostgreSQL", icon: "FaDatabase", category: "database" }
    ],
    images: ["/projects/ecommerce-dashboard.jpg"],
    backgroundColor: "#10B981",
    keyPoints: [
      {
        title: "Multi-tienda",
        content: "Gestión centralizada de múltiples tiendas desde un solo dashboard."
      },
      {
        title: "Analítica en Tiempo Real",
        content: "Métricas y KPIs actualizados en tiempo real para toma de decisiones."
      },
      {
        title: "Automatización de Procesos",
        content: "Flujos automatizados para pedidos, inventario y marketing."
      }
    ],
    timeline: [
      {
        title: "Producción",
        description: "Sistema en producción con clientes activos",
        date: "2024"
      }
    ],
    category: 'web',
    priority: 3,
    featured: true,
    links: {
      website: 'https://demo-ecommerce.sakurakode.com'
    },
    resources: {
      logo: "/projects/ecommerce-logo.png"
    }
  },
  {
    id: 'crm-platform',
    title: "CRM Inteligente",
    description: "Plataforma CRM con automatización de ventas y marketing. Integración con IA para predicción de leads.",
    role: "Full Stack Developer",
    company: "White Label",
    companyLink: "https://sakurakode.com",
    technologies: [
      { name: "Vue.js", icon: "FaVuejs", category: "frontend" },
      { name: "Python", icon: "FaPython", category: "backend" },
      { name: "Firebase", icon: "SiFirebase", category: "cloud" }
    ],
    images: ["/projects/crm-dashboard.jpg"],
    backgroundColor: "#F59E0B",
    keyPoints: [
      {
        title: "Lead Scoring con IA",
        content: "Calificación automática de leads usando modelos de machine learning."
      },
      {
        title: "Automatización de Marketing",
        content: "Campañas automatizadas basadas en comportamiento y segmentación."
      },
      {
        title: "Integración Omnicanal",
        content: "Conexión con múltiples canales de comunicación y redes sociales."
      }
    ],
    timeline: [
      {
        title: "Producción",
        description: "Sistema en uso por múltiples clientes",
        date: "2024"
      }
    ],
    category: 'web',
    priority: 4,
    featured: true,
    links: {
      website: 'https://demo-crm.sakurakode.com'
    },
    resources: {
      logo: "/projects/crm-logo.png"
    }
  }
];

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export const B2BProjects = () => (
  <section className="py-24 relative">
    {/* Decorative elements */}
    <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-[128px] animate-pulse" />
    <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-[128px] animate-pulse" />

    <div className="container mx-auto px-4">
      {/* Section Header */}
      <div className="text-center mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-medium">
            SaaS & White Label
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-6"
        >
          Soluciones Empresariales
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-zinc-400 max-w-2xl mx-auto"
        >
          Plataformas SaaS propias y soluciones white label personalizables
        </motion.p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {b2bProjects.map((project, index) => (
          <motion.div
            key={project.id}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 backdrop-blur-xl rounded-2xl overflow-hidden border border-blue-500/20 hover:border-blue-500/30 transition-all duration-300"
          >
            {/* Preview Image */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent opacity-80" />
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Title and Description */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-zinc-400">
                  {project.description}
                </p>
              </div>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i} 
                    className={`px-3 py-1 rounded-full text-sm ${
                      tech.category === 'frontend' ? 'text-blue-400 bg-blue-400/10' :
                      tech.category === 'backend' ? 'text-indigo-400 bg-indigo-400/10' :
                      tech.category === 'database' ? 'text-purple-400 bg-purple-400/10' :
                      'text-sky-400 bg-sky-400/10'
                    }`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>

              {/* Key Features */}
              <div className="space-y-4 mb-8">
                <h4 className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 uppercase tracking-wider">
                  Características Principales
                </h4>
                <div className="grid gap-3">
                  {project.keyPoints.map((point, i) => (
                    <div 
                      key={i}
                      className="flex items-start gap-3"
                    >
                      <span className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mt-2 shrink-0" />
                      <div>
                        <h5 className="text-sm font-medium text-white mb-1">
                          {point.title}
                        </h5>
                        <p className="text-sm text-zinc-400">
                          {point.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="flex items-center gap-4 pt-4 border-t border-blue-500/20">
                <motion.a
                  href={project.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-lg transition-all"
                >
                  <span>Ver Demo</span>
                  <HiOutlineExternalLink className="w-4 h-4" />
                </motion.a>
                <a
                  href="#"
                  className="text-zinc-400 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-indigo-400 transition-colors inline-flex items-center gap-1"
                >
                  <HiOutlineCode className="w-4 h-4" />
                  <span>Detalles</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
); 