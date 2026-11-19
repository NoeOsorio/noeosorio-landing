// href is optional: projects without a page yet render as plain text.
export const footerLinks = {
  site: [
    { title: 'Projects', href: '/portfolio' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' }
  ],
  projects: [
    { title: 'Maiden OS' },
    { title: 'Essay Studio', href: '/essay' },
    { title: 'Whiteboard' },
    { title: 'Telar' }
  ]
} as {
  site: { title: string; href: string }[]
  projects: { title: string; href?: string }[]
};
