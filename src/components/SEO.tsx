import { useEffect } from 'react';
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
  // index.html carries the home's canonical; every other page points at itself and puts the home's back on leave.
  useEffect(() => {
    let path = '/';
    try { path = new URL(url).pathname; } catch { /* not absolute: leave as is */ }
    if (path === '/' || path === '') return;
    let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const created = !el;
    if (!el) { el = document.createElement('link'); el.rel = 'canonical'; document.head.appendChild(el); }
    const prev = el.getAttribute('href');
    el.setAttribute('href', url);
    return () => { if (created) el?.remove(); else if (prev !== null) el?.setAttribute('href', prev); };
  }, [url]);

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
      { property: 'og:locale', content: 'en_US' },

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