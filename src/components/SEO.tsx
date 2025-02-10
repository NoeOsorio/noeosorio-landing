import { useDocumentMeta } from '../hooks/useDocumentMeta';

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
  keywords?: string;
  type?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  twitterHandle?: string;
}

export const SEO = ({ 
  title,
  description,
  image,
  url,
  keywords = "",
  type = "website",
  publishedTime,
  modifiedTime,
  author = "Noé Osorio",
  twitterHandle = "@noeosorio.dev"
}: SEOProps) => {
  useDocumentMeta({
    title,
    description,
    image,
    url,
    keywords,
    meta: [
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Noé Osorio' },
      { property: 'og:locale', content: 'es_MX' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:creator', content: twitterHandle },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },

      // Artículo específicos
      ...(publishedTime ? [{ property: 'article:published_time', content: publishedTime }] : []),
      ...(modifiedTime ? [{ property: 'article:modified_time', content: modifiedTime }] : []),
      ...(author ? [{ property: 'article:author', content: author }] : []),

      // Estructurado
      {
        type: 'script',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': type === 'article' ? 'Article' : 'WebSite',
          headline: title,
          description,
          image,
          author: {
            '@type': 'Person',
            name: author,
            url: 'https://noeosorio.com'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Noé Osorio',
            logo: {
              '@type': 'ImageObject',
              url: 'https://noeosorio.com/logo.png'
            }
          },
          url,
          ...(publishedTime && { datePublished: publishedTime }),
          ...(modifiedTime && { dateModified: modifiedTime })
        })
      }
    ]
  });

  return null;
}; 