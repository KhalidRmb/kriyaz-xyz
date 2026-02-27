interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'kriyaz.xyz',
    description:
      'This site. A minimalist personal blog built with Next.js, Tailwind CSS, and MDX. Deployed on Vercel.',
    href: 'https://kriyaz.xyz',
  },
  // Add your projects here
]

export default projectsData
