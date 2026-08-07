export interface TechTag {
  label: string
  icon?: string
}

export interface ExpertiseSubSection {
  name: string
  tags: TechTag[]
}

export interface ExpertiseItem {
  name: string
  desc: string
  tags?: TechTag[]
  subsections?: ExpertiseSubSection[]
  wide?: boolean
}

export interface ExperienceItem {
  date: string
  role: string
  org: string
  bullets: string[]
}

export interface ProjectItem {
  name: string
  desc: string
  image?: string
  github?: string
  demo?: string
  tags: TechTag[]
}

const d = (icon: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`

export const expertise: ExpertiseItem[] = [
  {
    name: 'Web Development',
    desc: 'End-to-end web systems — from pixel-perfect frontends to high-throughput APIs and the databases that power them.',
    wide: true,
    subsections: [
      {
        name: 'Frontend',
        tags: [
          { label: 'React',       icon: d('react/react-original.svg') },
          { label: 'Next.js',     icon: d('nextjs/nextjs-original.svg') },
          { label: 'TypeScript',  icon: d('typescript/typescript-original.svg') },
          { label: 'HTML5',       icon: d('html5/html5-original.svg') },
          { label: 'CSS3',        icon: d('css3/css3-original.svg') },
        ],
      },
      {
        name: 'Backend',
        tags: [
          { label: 'Node.js',  icon: d('nodejs/nodejs-original.svg') },
          { label: 'NestJS',  icon: d('nestjs/nestjs-original.svg') },
          { label: 'Django',   icon: d('django/django-plain.svg') },
          { label: 'Express',  icon: d('express/express-original.svg') },
          { label: 'Python',   icon: d('python/python-original.svg') },
          { label: 'REST API' },
        ],
      },
      {
        name: 'Databases',
        tags: [
          { label: 'PostgreSQL', icon: d('postgresql/postgresql-original.svg') },
          { label: 'MongoDB',    icon: d('mongodb/mongodb-original.svg') },
          { label: 'MySQL',      icon: d('mysql/mysql-original.svg') },
          { label: 'Redis',      icon: d('redis/redis-original.svg') },
          { label: 'Prisma',     icon: d('prisma/prisma-original.svg') },
        ],
      },
    ],
  },
  {
    name: 'Mobile App Development',
    desc: 'Cross-platform apps that feel native — smooth UX, offline support, and tight backend integration.',
    tags: [
      { label: 'Flutter',      icon: d('flutter/flutter-original.svg') },
      { label: 'React Native', icon: d('react/react-original.svg') },
      { label: 'Dart',         icon: d('dart/dart-original.svg') },
      { label: 'Firebase',     icon: d('firebase/firebase-original.svg') },
    ],
  },
  {
    name: 'UI Design & Prototyping',
    desc: 'Interfaces that feel native to the platform and serve the user first — designed before a single line of code.',
    tags: [
      { label: 'Figma',        icon: d('figma/figma-original.svg') },
      { label: 'Canva',        icon: d('canva/canva-original.svg') },
      { label: 'CSS3',         icon: d('css3/css3-original.svg') },
    ],
  },
  {
    name: 'Cloud, DevOps & Tools',
    desc: 'Shipping software reliably — containerised deployments, CI pipelines, and cloud infrastructure.',
    tags: [
      { label: 'Docker',  icon: d('docker/docker-original.svg') },
      { label: 'Git',     icon: d('git/git-original.svg') },
      { label: 'Linux',   icon: d('linux/linux-original.svg') },
    ],
  },
]

export const experience: ExperienceItem[] = [
  {
    date: 'December 2024 – December 2025',
    role: 'Researcher',
    org: 'Academia Industry Cooperation · Kathmandu University',
    bullets: [
      'Collaborated with teams to design and deploy scalable backend solutions for university digitalization projects.',
      'Led Kathmandu University Job Fair 2025 (KUJIF 2025) as Technical Lead',
      'Built the systems and maintained infrastructures for multiple university platforms (Venue Booking System, Pharmacy Management)',
      'Contributed to digitalization of Kathmandu University across ongoing projects.',
      'Collaborated with faculty and industry partners to scope, plan, and deliver milestones.',
    ],
  },
  {
    date: 'April 2024 – July 2024',
    role: 'Software Intern',
    org: 'LIS Nepal Pvt. Ltd. · Manbhawan, Lalitpur',
    bullets: [
      'Performed ETL processes with Snowflake as the database and Python scripts',
      'Developed reports using Looker as a Business Intelligence tool',
      'Managed daily planning and tasks with ClickUp as a Project Management tool',
      'Maintained source code using version control tools',
      'Followed Agile methodology in the development process',
    ],
  },
  {
    date: '2022 – Present',
    role: 'Freelance Developer',
    org: 'Independent · Full Stack Development',
    bullets: [
      'Designed, built, and deployed full-stack web and mobile applications for clients across multiple industries.',
      'Managed the full project lifecycle — requirements gathering, architecture, development, and delivery.',
      'Built REST APIs, integrated third-party services, and maintained cloud infrastructure for client products.',
      'Maintained long-term client relationships through iterative delivery and reliable communication.',
    ],
  },
]

export const projects: ProjectItem[] = [
  {
    name: 'RP Creator Group | Brand Website',
    desc: 'A service-based referral platform that connects users with verified professionals across multiple industries such as migration, legal, and real estate.',
    image: "./projects/rpCreatorGroup.webp",
    demo: "https://rpcreatorgroup.com.au",
    tags: [
      { label: 'React',      icon: d('react/react-original.svg') },
      { label: 'Node.js',    icon: d('nodejs/nodejs-original.svg') },
      { label: 'Express',  icon: d('express/express-original.svg') },
      { label: 'Prisma',  icon: d('prisma/prisma-original.svg') },
      { label: 'PostgreSQL', icon: d('postgresql/postgresql-original.svg') },
    ],
  },
  {
    name: '2feat | Affiliate Marketing Website',
    desc: 'A website promoting sneakers and clothing of different brands, showing trending news about brands, easy visualization of whole apparel through sliders',
    image: "./projects/2feat.webp",
    demo: "https://2feat.com",
    tags: [
      { label: 'React',   icon: d('react/react-original.svg') },
      { label: 'NodeJS', icon: d('nodejs/nodejs-original.svg') },
      { label: 'Express',  icon: d('express/express-original.svg') },
      { label: 'MongoDB',    icon: d('mongodb/mongodb-original.svg') },
      { label: 'REST API' },
    ],
  },
  {
    name: 'Aveksha | Digital healthcare application',
    desc: 'A mobile application focusing on digitalizing the process of booking an appointment with healthcare professionals and organizing medical reports.',
    image: "./projects/aveksha.webp",
    github: "https://github.com/Niroula533/Aveksha",
    tags: [
      { label: 'Flutter',  icon: d('flutter/flutter-original.svg') },
      { label: 'Firebase', icon: d('firebase/firebase-original.svg') },
      { label: 'NodeJS', icon: d('nodejs/nodejs-original.svg') },
      { label: 'Express',  icon: d('express/express-original.svg') },
      { label: 'MongoDB',  icon: d('mongodb/mongodb-original.svg') },
    ],
  },
]

export const moreProjects: ProjectItem[] = [
  {
    name: 'Pharma App',
    desc: 'A comprehensive web-based solution for managing medical inventory, tracking stock levels, and monitoring medicine expiry dates.',
    image: "./projects/pharmaApp.webp",
    github:"https://github.com/E-n-N-D/pharma-app",
    tags: [
      { label: 'React',   icon: d('react/react-original.svg') },
      { label: 'NodeJS', icon: d('nodejs/nodejs-original.svg') },
      { label: 'Express',  icon: d('express/express-original.svg') },
      { label: 'MongoDB',    icon: d('mongodb/mongodb-original.svg') },
      { label: 'REST API' },
    ],
  },
  {
    name: 'UTPRO Cleaning Services',
    desc: 'A business website for a cleaning service provider offering residential, commercial, and specialized cleaning solutions with online booking and service inquiries.',
    image: "./projects/utPro.webp",
    demo: "https://utprocleaningservices.com.au",
    tags: [
      { label: 'React',      icon: d('react/react-original.svg') },
      { label: 'Node.js',    icon: d('nodejs/nodejs-original.svg') },
      { label: 'Express',  icon: d('express/express-original.svg') },
      { label: 'Prisma',  icon: d('prisma/prisma-original.svg') },
      { label: 'PostgreSQL', icon: d('postgresql/postgresql-original.svg') },
    ],
  },
  // {
  //   name: 'Insighter',
  //   desc: 'A learning management system for schools with added gamification elements',
  //   github:"https://github.com/E-n-N-D/Insighter",
  //   tags: [
  //     { label: 'Flutter',  icon: d('flutter/flutter-original.svg') },
  //     { label: 'Firebase', icon: d('firebase/firebase-original.svg') },
  //     { label: 'Node.js', icon: d('nodejs/nodejs-original.svg') },
  //     { label: 'Express',  icon: d('express/express-original.svg') },
  //     { label: 'MongoDB',    icon: d('mongodb/mongodb-original.svg') },
  //   ],
  // },
  {
    name: 'Chature AI',
    image: "./projects/chatureAI.webp",
    desc: 'Context-aware question answering system integrated with MOODLE. Built during Bachelor\'s at Kathmandu University.',
    tags: [
      { label: 'Python',     icon: d('python/python-original.svg') },
      { label: 'NLP' },
      { label: 'MOODLE' },
    ],
  },
  {
    name: 'FoodFinder',
    desc: 'A website with Restaurants listed in it with their menus and their speciality where foodies can search and scroll through the menus and plan their next meal',
    image: "./projects/foodFinder.webp",
    github:"https://github.com/ayush7aryal/Food-Finder",
    tags: [
      { label: 'React',   icon: d('react/react-original.svg') },
      { label: 'NodeJS', icon: d('nodejs/nodejs-original.svg') },
      { label: 'Express',  icon: d('express/express-original.svg') },
      { label: 'MongoDB',    icon: d('mongodb/mongodb-original.svg') },
      { label: 'REST API' },
    ],
  },
  {
    name: 'Recipe Masters',
    desc: 'Social platform for sharing recipes and managing them.',
    image: "./projects/recipeMasters.webp",
    demo:"https://www.figma.com/design/nPrQAewzmvGNCudRuHRf4b/Recipe-Masters?node-id=0-1&t=TKHNqn8iBU8sVhn7-1",
    tags: [
      { label: 'Figma',    icon: d('figma/figma-original.svg') },
    ],
  },
]

// ── ACHIEVEMENTS & INVOLVEMENTS ──────────────────────────────────────────────

export interface Achievement {
  title: string
  org: string
  date: string
  desc: string
  type: 'award' | 'involvement' | 'certification' | 'publication'
}

export const achievements: Achievement[] = [
  {
    title: 'Seeds for Future - Top 16',
    org: 'Huawei, Nepal',
    date: '2023',
    desc: 'Secured top 16 position in "Seeds for future 2023" organized by Huawei-Nepal.',
    type: 'award',
  },
  {
    title: '2nd - KUHackfest 2022',
    org: 'KUCC, Kathmandu University',
    date: '2022',
    desc: 'Secured 2nd position in KUHackfest Hackathon organized during IT Meet, Kathmandu University (2022).',
    type: 'award',
  },
  {
    title: 'Member - Kathmandu University Computer Club',
    org: 'Kathmandu University',
    date: '2019 – 2024',
    desc: 'Contributed and participated in club activities as a board member.',
    type: 'involvement',
  },
]
