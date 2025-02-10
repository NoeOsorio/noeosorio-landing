import { SEO } from '../components/SEO'

const Contact = () => {
  return (
    <>
      <SEO 
        title="Contact | Noé Osorio - Let's Work Together"
        description="¿Tienes un proyecto en mente? Contáctame para discutir cómo podemos trabajar juntos para hacerlo realidad."
        image="https://noeosorio.com/contact-og.png"
        url="https://noeosorio.com/contact"
      />
      <div className="container mx-auto px-4 py-20">
        <h2 className="text-3xl md:text-5xl font-bold text-white">
          Contacto
        </h2>
      </div>
    </>
  )
}

export default Contact 