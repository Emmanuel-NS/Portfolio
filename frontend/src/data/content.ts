export type HeroHighlight = {
  label: string
  value: string
}

export type EducationEntry = {
  institution: string
  credential: string
  period: string
  description: string
}

export type ExperienceEntry = {
  role: string
  organization: string
  period: string
  summary: string
}

export type Project = {
  title: string
  description: string
  tech: string[]
  link: string
  impact: string
}

export type HeroSpotlight = {
  title: string
  stat: string
  descriptor: string
}

export type SkillGroup = {
  title: string
  items: string[]
}

export type Achievement = {
  title: string
  context: string
  detail: string
}

export type ConsultingProject = {
  client: string
  focus: string
  description: string
  status: 'In Progress' | 'Delivered'
}

export type ContactInfo = {
  name: string
  tagline: string
  summary: string
  email: string
  whatsapp: { number: string; href: string; availability: string }
  socials: { label: 'GitHub' | 'LinkedIn' | 'X'; href: string }[]
}

const slash = '/'
const doubleSlash = slash + slash
const buildUrl = (scheme: 'http' | 'https', path: string) => `${scheme}:${doubleSlash}${path}`

export const heroContent = {
  name: 'Emmanuel NSABAGASANI',
  title: 'Software Engineer · Cybersecurity Analyst · IT Educator · Digital Solutions Consultant',
  summary:
    'Rwandan builder who fuses secure engineering, cyber defense, ICT education, and board-level digital consulting to launch resilient products and advisory playbooks.',
  primaryCta: { label: 'Explore projects', href: '#projects' },
  secondaryCta: { label: 'Email me', href: 'mailto:e.nsabagasa@alustudent.com' },
}

export const heroHighlights: HeroHighlight[] = [
  { label: 'Current Program', value: 'ALU BSc 2024' },
  { label: 'Advisory', value: 'Digital Solutions Consultant' },
  { label: 'Product Builds', value: 'Cineranda · Sigasira' },
]

export const heroSpotlights: HeroSpotlight[] = [
  {
    title: 'Forward Edge Elite',
    stat: 'Top 6 cohort',
    descriptor: 'Awarded the elite cybersecurity certificate for 2024.',
  },
  {
    title: 'ICT Teaching Impact',
    stat: 'National #1 results',
    descriptor: 'Led GS Byumba courses to best exam performance in school history.',
  },
  {
    title: 'Consulting Delivery',
    stat: 'Farmers system win',
    descriptor: 'Afrifarmers Market adopted the digital solution proposal I led.',
  },
]

export const education: EducationEntry[] = [
  {
    institution: 'African Leadership University (ALU)',
    credential: 'Bachelor of Science in Software Engineering',
    period: '2024 - Present',
    description: 'Specialized in software development and cybersecurity.',
  },
  {
    institution: 'Forward Edge Consulting Ltd.',
    credential: 'Cybersecurity Certification',
    period: '2024',
    description: 'Advanced training in cybersecurity operations.',
  },
  {
    institution: 'ES Sancta Maria Karambo',
    credential: 'A2 Diploma in Mathematics, Computer Science, and Economics',
    period: '2019 - 2023',
    description: 'High school diploma with a focus on technology and economics.',
  },
  {
    institution: 'ES Sancta Maria Karambo',
    credential: 'O-Level Certificate',
    period: '2016 - 2019',
    description: 'General secondary education with strong STEM foundations.',
  },
  {
    institution: 'Academy De La Salle Byumba',
    credential: 'Primary Education',
    period: '2010 - 2016',
    description: 'Primary studies emphasizing foundational STEM skills.',
  },
]

export const experience: ExperienceEntry[] = [
  {
    role: 'Technology Consultant',
    organization: 'Afrifarmers Market',
    period: '2025',
    summary: 'Led a consultancy squad delivering the Farmers Management System proposal adopted by leadership.',
  },
  {
    role: 'Product Engineer',
    organization: 'Cineranda (Stealth)',
    period: '2025',
    summary: 'Building the streaming platform architecture for Rwanda’s upcoming movie hub.',
  },
  {
    role: 'Digital Solutions Engineer',
    organization: 'Sigasira Amagara Ltd.',
    period: '2025',
    summary: 'Crafting a commerce-forward web experience to showcase healthy natural meals.',
  },
  {
    role: 'Security Analyst Intern',
    organization: 'Forward Edge Consulting Ltd.',
    period: 'Sep 2024 - Feb 2025',
    summary: 'Completed a 6-month engagement delivering vulnerability assessments and secure software solutions.',
  },
  {
    role: 'IT & Computer Science Teacher',
    organization: 'GS Byumba Inyange',
    period: '2024',
    summary: 'Teaching computer science and ICT concepts to high school students.',
  },
  {
    role: 'Founder',
    organization: 'CODE Club',
    period: '2024 - Present',
    summary: 'Leading an initiative to enhance ICT education and digital literacy.',
  },
  {
    role: 'Cybersecurity Bootcamp Team Leader',
    organization: 'Forward Edge Cybersecurity Bootcamp',
    period: '2024',
    summary: 'Led cybersecurity group projects, focusing on security operations and risk management.',
  },
]

export const projects: Project[] = [
  {
    title: 'Cineranda Streaming Platform',
    description: 'High-performance video experience for Rwanda’s cinematic catalog with focus on launch-readiness.',
    tech: ['React', 'Node.js', 'Tailwind CSS'],
    link: buildUrl('https', 'user-frontend-8rgn.vercel.app/'),
    impact: 'Owning the engineering foundations ahead of public release.',
  },
  {
    title: 'Sigasira Amagara Digital Marketplace',
    description: 'Commerce site that highlights healthy natural meals and modernizes customer touchpoints.',
    tech: ['Next.js', 'TypeScript', 'Stripe'],
    link: buildUrl('https', 'sigasira-amagara.vercel.app/'),
    impact: 'Driving online visibility for the health-food brand.',
  },
  {
    title: 'Afrifarmers Farmers Management System',
    description: 'Consulting blueprint covering farmer onboarding, inventory, and insights for Afrifarmers Market.',
    tech: ['Product Strategy', 'Systems Design', 'Figma', 'Notion'],
    link: buildUrl('https', '5ujzp2sbrroou.ok.kimi.link/'),
    impact: 'Client praised the clarity of the proposed digital solution.',
  },
  {
    title: 'Movie Streaming Website',
    description: 'A fully responsive movie streaming UI built with vanilla HTML, CSS, and JavaScript.',
    tech: ['HTML5', 'CSS3', 'JavaScript'],
    link: buildUrl('https', 'emmanuel-ns.github.io/web_design/'),
    impact: 'Delivered a cinematic experience with clean navigation.',
  },
  {
    title: 'Health Tracker System',
    description: 'Menu-driven health tracker with user authentication and MySQL integration.',
    tech: ['Python', 'MySQL'],
    link: buildUrl('https', 'github.com/Emmanuel-NS/Community-Health_Tracker-System'),
    impact: 'Improved community health reporting workflows.',
  },
  {
    title: 'Emm3 URL Scanner',
    description: 'Web app leveraging the VirusTotal API to scan URLs for potential threats.',
    tech: ['JavaScript', 'Node.js', 'VirusTotal API', 'NGINX'],
    link: buildUrl('http', 'www.emm3.tech/'),
    impact: 'Gives instant visibility into malicious links.',
  },
  {
    title: 'FARUMASI E-Pharmacy Solution',
    description: 'Digital platform improving rural access to medicine through an online pharmacy.',
    tech: ['React', 'Node.js', 'SQL', 'Tailwind CSS'],
    link: buildUrl('https', 'farumasi.vercel.app/home'),
    impact: 'Streamlines pharmacy operations for remote communities.',
  },
  {
    title: 'MoMo Dashboard',
    description: 'Functional mobile money transaction dashboard built with modern web technologies.',
    tech: ['Node.js', 'React', 'Tailwind CSS'],
    link: buildUrl('https', 'github.com/Emmanuel-NS/MoMo-Dashboard'),
    impact: 'Surfaces real-time transaction insights for operators.',
  },
  {
    title: 'Smart Farm Marketplace',
    description:
      'Full-stack marketplace where farmers publish produce, receive agronomist guidance, and surface weather insights while buyers browse, filter, and reach out directly.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    link: buildUrl('https', 'smart-farm-market.vercel.app/'),
    impact: 'Connects farmers, experts, and buyers with real-time advice, discovery, and communication loops.',
  },
]

export const skillGroups: SkillGroup[] = [
  {
    title: 'Secure Engineering',
    items: ['Cybersecurity', 'Threat Intelligence', 'Penetration Testing', 'Secure Coding Practices', 'Risk Management'],
  },
  {
    title: 'Build & Ship',
    items: ['Software Development', 'Full-Stack Development', 'Project Management', 'GitHub & Version Control'],
  },
  {
    title: 'Stacks & Tools',
    items: ['Python', 'JavaScript', 'React', 'Node.js', 'Django', 'SQL & NoSQL Databases', 'Linux'],
  },
]

export const contactInfo: ContactInfo = {
  name: 'Emmanuel NSABAGASANI',
  tagline: 'Software Engineer | Cybersecurity Analyst | IT Educator | Digital Solutions Consultant',
  summary:
    'Open to building resilient software, advising on cybersecurity programs, mentoring ICT teams, and consulting on end-to-end digital transformation.',
  email: 'e.nsabagasa@alustudent.com',
  whatsapp: {
    number: '+250790160172',
    href: buildUrl('https', 'wa.me/250790160172?text=Hi%20Emmanuel%2C%20I%20found%20your%20portfolio%20and%20would%20love%20to%20connect.'),
    availability: 'Fastest real-time response via WhatsApp—update this number if needed.',
  },
  socials: [
    { label: 'GitHub', href: buildUrl('https', 'github.com/Emmanuel-NS') },
    { label: 'LinkedIn', href: buildUrl('https', 'linkedin.com/in/emmanuel-nsabagasani') },
    { label: 'X', href: buildUrl('https', 'x.com/ENsabagasa56660') },
  ],
}

export const achievements: Achievement[] = [
  {
    title: 'Forward Edge Elite Certificate',
    context: 'Cybersecurity Bootcamp 2024',
    detail: 'Named among the top 6 elite students across the entire cohort.',
  },
  {
    title: 'ICT & CS Excellence',
    context: 'GS Byumba Inyange',
    detail: 'Course achieved best national exam results in school history under my instruction.',
  },
  {
    title: 'Afrifarmers Digital Solution',
    context: 'Consultancy Team Lead',
    detail: 'Delivered the Farmers Management System concept the client celebrated.',
  },
]

export const consultingProjects: ConsultingProject[] = [
  {
    client: 'Afrifarmers Market',
    focus: 'Farmers Management System',
    description: 'Consulted on a digital product to manage farmer data, inventory, and reporting.',
    status: 'Delivered',
  },
  {
    client: 'Cineranda',
    focus: 'Rwanda Movie Streaming Platform',
    description: 'Currently building product foundations pre-launch.',
    status: 'In Progress',
  },
  {
    client: 'Sigasira Amagara Ltd.',
    focus: 'Digital Marketplace & Brand Site',
    description: 'Creating the online home to showcase healthy natural meals and commerce funnels.',
    status: 'In Progress',
  },
]
