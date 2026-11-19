import { useEffect } from 'react'

export const useDocumentMeta = (props: {
  title?: string
  description?: string
  image?: string
  url?: string
  keywords?: string
  meta?: unknown[]
}) => {
  useEffect(() => {
    document.title = props.title || 'Noé Osorio | Senior Software Engineer & Cloud Architect'
    
    const meta = {
      description: props.description,
      keywords: props.keywords,
      'og:title': props.title,
      'og:description': props.description,
      'og:image': props.image,
      'og:url': props.url,
      'twitter:title': props.title,
      'twitter:description': props.description,
      'twitter:image': props.image,
    }

    Object.entries(meta).forEach(([name, content]) => {
      if (content) {
        document.querySelector(`meta[name="${name}"]`)?.setAttribute('content', content)
        document.querySelector(`meta[property="${name}"]`)?.setAttribute('content', content)
      }
    })
  }, [props])
}
