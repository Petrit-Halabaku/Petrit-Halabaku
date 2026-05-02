export interface Project {
  id: number
  title: string
  date: Date
  desc: string
  image: string
  tech: string[]
  category: 'Full Stack' | 'Mobile'
  live: string
}

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Gjirafa Mall Homepage',
    date: new Date('2022-07-01'),
    desc: "Led modernisation of Kosovo's flagship e-commerce homepage — React architecture, design system, and performance optimisation.",
    image: '/uploads/project-images/gjirafamall.png',
    tech: ['React', 'TypeScript', 'TailwindCSS', '.Net'],
    category: 'Full Stack' as const,
    live: 'https://gjirafamall.com/',
  },
  {
    id: 2,
    title: 'Health Data App',
    date: new Date('2024-10-05'),
    desc: 'Full-stack health analytics dashboard pulling from CDC open data with interactive charts and demographic drill-downs.',
    image: '/uploads/project-images/data-hub.png',
    tech: ['React', 'Node.js', 'TypeScript', 'TailwindCSS'],
    category: 'Full Stack' as const,
    live: 'https://healthdataapp.netlify.app/',
  },
  {
    id: 3,
    title: 'Earthquake Tracking App',
    date: new Date('2025-05-01'),
    desc: 'Mobile-first real-time earthquake tracker with Leaflet maps, marker clustering, and USGS live feed.',
    image: '/uploads/project-images/earthquake.png',
    tech: ['Angular', 'TypeScript', 'TailwindCSS'],
    category: 'Mobile' as const,
    live: 'https://earthquakeapp.netlify.app/',
  },
  {
    id: 4,
    title: 'Gjirafa50 Product Page',
    date: new Date('2021-07-01'),
    desc: 'High-fidelity product detail page — instalment calculator, media gallery, and logistics integrations.',
    image: '/uploads/project-images/gjirafa50.png',
    tech: ['React', 'TypeScript', '.Net', 'TailwindCSS'],
    category: 'Full Stack' as const,
    live: 'https://gjirafa50.com/',
  },
  {
    id: 5,
    title: 'NDB Technology Website',
    date: new Date('2021-03-01'),
    desc: 'Marketing site for a nuclear-battery startup. Gatsby + React for fast static delivery with enterprise performance.',
    image: '/uploads/project-images/ndb.png',
    tech: ['React', 'Gatsby', 'MongoDB', 'Node.js', 'TypeScript'],
    category: 'Full Stack' as const,
    live: 'https://ndb.technology/',
  },
  {
    id: 6,
    title: 'GjirafaMall Gift Card',
    date: new Date('2023-05-01'),
    desc: 'Mobile-first gift card flow: custom image upload, bulk email delivery, and full payment integration.',
    image: '/uploads/project-images/giftcard.png',
    tech: ['React', 'TypeScript', '.Net', 'TailwindCSS'],
    category: 'Mobile' as const,
    live: 'https://gjirafamall.com/gift-card',
  },
].sort((a, b) => b.date.getTime() - a.date.getTime())

export const CATEGORIES = ['All', 'Full Stack', 'Mobile'] as const

export const fmt = (d: Date) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(d)
