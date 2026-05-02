export interface Experience {
  role: string
  company: string
  location: string
  period: string
  bullets: string[]
  tech: string[]
}

export const EXPERIENCES: Experience[] = [
  {
    role: 'Lead Software Engineer',
    company: 'DCoding Labs',
    location: 'Chicago, IL',
    period: 'Feb 2024 – Present',
    bullets: [
      'Spearhead full-stack development using React.js, TypeScript, Tailwind CSS, Node.js and Express.js.',
      'Lead agile transformation efforts — sprint planning, code reviews, and process improvements.',
      'Architect and implement responsive, user-centric interfaces across multiple devices.',
      'Optimise backend APIs and PostgreSQL database performance for scalable solutions.',
    ],
    tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'React.js', 'Google BigQuery', 'Redux', 'TailwindCSS'],
  },
  {
    role: 'Lead Frontend Engineer',
    company: 'Gjirafa Inc.',
    location: 'Prishtina, Kosovo',
    period: 'Oct 2021 – Feb 2024',
    bullets: [
      'Directed a team to modernise UI/UX across Gjirafa50, GjirafaMall, FleaMarket, and CMP.',
      'Implemented custom drag-and-drop image uploaders and responsive admin panels.',
      'Collaborated with cross-functional teams and external partners to enhance platform reliability.',
    ],
    tech: ['React.js', 'TypeScript', 'Express.js', 'Redux', 'Context API'],
  },
  {
    role: 'Frontend Engineer',
    company: 'NDB Inc.',
    location: 'San Francisco, CA',
    period: 'Jun 2020 – Oct 2021',
    bullets: [
      'Mentored a team developing cutting-edge websites with modern frameworks and technologies.',
      'Implemented efficient form validation and optimised performance for enterprise projects.',
    ],
    tech: ['Node.js', 'React', 'MongoDB', 'Socket.io', 'Express', 'Gatsby.js'],
  },
  {
    role: 'Frontend Engineer',
    company: 'Kutia',
    location: 'Prishtina, Kosovo',
    period: 'Jan 2018 – Jan 2020',
    bullets: [
      'Developed responsive web templates and dynamic layouts using SCSS and custom animations.',
      'Contributed to an internal styling system that streamlined the design process.',
    ],
    tech: ['JavaScript', 'HTML/CSS', 'React.js', 'SCSS', 'jQuery', 'Bootstrap'],
  },
]

export const SKILLS = [
  { name: 'Frontend Dev', desc: 'React.js · Angular · TailwindCSS' },
  { name: 'State Management', desc: 'Redux · Context API · CI/CD' },
  { name: 'Backend Dev', desc: 'Node.js · Express · NestJS' },
  { name: 'AI / ML', desc: 'OpenAI · DeepSeek · Supabase' },
  { name: 'Databases', desc: 'MongoDB · Firebase · PostgreSQL' },
  { name: 'API Design', desc: 'REST · GraphQL · WebSockets' },
  { name: 'Problem Solving', desc: 'Algorithms · Data Structures' },
  { name: 'Continuous Learning', desc: 'Always exploring new tech' },
]
