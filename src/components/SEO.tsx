import { useDocumentMeta } from '../hooks/useDocumentMeta'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

export const SEO = (props: SEOProps) => {
  useDocumentMeta(props)
  return null
} 