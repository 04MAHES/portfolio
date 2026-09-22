export const RESUME_FILE = 'Umamaheswar_Raju_Sagiraju_Resume.pdf';

export const profile = {
  name: 'Umamaheswar Raju Sagiraju',
  title: 'Software Engineer',
  tagline:
    'Software Engineer building scalable backend systems, RESTful APIs, and cloud-native microservices in Java and Python, with hands-on experience in Agentic AI and RAG applications.',
  summary:
    'Software Engineer with experience designing and building scalable backend systems, RESTful APIs, and cloud-native microservices in Java and Python. Strong foundation in system design, database optimization, containerized deployments, and CI/CD automation. Hands-on experience building Agentic AI and RAG-based applications using LangChain and LangGraph, bridging traditional backend engineering with modern AI system development. Comfortable working across the full SDLC, from architecture and debugging to production deployment on Docker and Kubernetes.',
  email: 'sumamaheswarraju@gmail.com',
  phone: '+91-8778856020',
  location: 'Bangalore, Karnataka',
  links: {
    linkedin: 'https://linkedin.com/in/sumamaheswarraju',
    github: 'https://github.com/04MAHES',
  },
};

export const skillGroups: { title: string; items: string[] }[] = [
  { title: 'Languages', items: ['Java', 'Python', 'SQL', 'JavaScript'] },
  {
    title: 'Backend & APIs',
    items: [
      'Spring Boot',
      'Spring MVC',
      'FastAPI',
      'Django',
      'RESTful APIs',
      'Microservices Architecture',
      'Node.js',
    ],
  },
  { title: 'Frontend', items: ['React', 'React Native', 'JavaScript'] },
  { title: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB'] },
  {
    title: 'Cloud & Distributed Systems',
    items: ['AWS', 'Docker', 'Kubernetes', 'Kafka', 'Git', 'GitHub'],
  },
  {
    title: 'AI & Agentic Systems',
    items: ['LangChain', 'LangGraph', 'RAG Pipelines', 'Prompt Engineering'],
  },
];

export type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  location: string;
  engagements: {
    name: string;
    context?: string;
    bullets: string[];
    tech: string[];
  }[];
};

export const experience: ExperienceItem[] = [
  {
    company: 'Tecklytics',
    role: 'Software Engineer',
    period: 'Jul 2024 – Present',
    location: 'Bangalore, Karnataka',
    engagements: [
      {
        name: 'Distributed Backend Services & Data Platform',
        context: 'Client: Singapore',
        bullets: [
          'Designed scalable Java/Spring Boot microservices and RESTful APIs, reducing integration downtime by 30% across internal and external enterprise systems.',
          'Optimized Spring Data JPA/Hibernate database interactions, cutting query latency by 40% across high-traffic services.',
          'Strengthened Jenkins/Maven CI/CD pipelines, streamlining build, test, and deployment automation and cutting failed deployments by 40%.',
          'Resolved recurring production defects through hands-on debugging and troubleshooting, collaborating closely with QA.',
        ],
        tech: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'Postgres', 'MSSQL'],
      },
      {
        name: 'System Modernization & Version Migration',
        context: 'Singapore Health Services',
        bullets: [
          'Tested and validated workflows during a platform version migration, identifying and debugging issues introduced by the upgrade across a large-scale production environment.',
          'Diagnosed and resolved defects surfaced during a zero-downtime cutover, working alongside the migration team to verify redundant environments and database clones before go-live.',
        ],
        tech: [],
      },
      {
        name: 'AI-Powered Code Analysis Platform (IAAP)',
        bullets: [
          'Architected a reusable analysis engine evaluating complex workflow graphs via LLM-based pattern recognition, cutting manual review effort by 50% across 100+ workflows.',
          'Engineered fault-tolerant ingestion with retry logic, schema validation, and recovery handling for malformed upstream outputs, sustaining 99%+ successful processing across thousands of runs.',
          'Built the React frontend, including state management and virtualized rendering for nested activity trees on 1,000+ node datasets.',
          'Deployed IAAP on AWS, integrating with the existing PostgreSQL and containerized workflow.',
          'Designed the platform as a configurable framework rather than a one-off tool, enabling new analysis rules and workflow types to be onboarded without engine changes.',
        ],
        tech: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'LLM APIs', 'AWS'],
      },
    ],
  },
];

export type Project = {
  name: string;
  subtitle?: string;
  bullets: string[];
  tech: string[];
  repo?: string;
  repoLabel?: string;
};

export const projects: Project[] = [
  {
    name: 'Simple Social',
    subtitle: 'Multimedia Storage Platform',
    bullets: [
      'Implemented JWT-based authentication and session management with FastAPI-Users, covering registration, login, and protected route access.',
      'Integrated ImageKit for cloud-native media storage and on-the-fly transformation, including dynamic text overlays and blurred background padding for uploaded images and videos.',
      'Designed async database models with SQLAlchemy and aiosqlite to manage users and posts, and enforced owner-based access control on post decisions.',
    ],
    tech: [
      'Python',
      'FastAPI',
      'Streamlit',
      'SQLAlchemy',
      'aiosqlite',
      'FastAPI-Users',
      'JWT',
      'ImageKit.io',
    ],
    repo: 'https://github.com/04MAHES/multimedia-storage-sharing-app',
    repoLabel: 'multimedia-storage-sharing-app',
  },
  {
    name: 'Job Application Management System',
    subtitle: 'Backend',
    bullets: [
      'Engineered an enterprise-grade backend system for job and company management following industry-standard RESTful microservices design principles.',
      'Modeled complex relational databases and optimized data-layer mapping utilizing JPA entity relationships and Hibernate.',
    ],
    tech: ['Java 11', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'Maven'],
  },
];

export const education = [
  {
    degree: 'B.Tech, Information Science and Engineering',
    school: 'Sai Vidya Institute of Technology',
    location: 'Bangalore, Karnataka',
    period: '2019 – 2023',
  },
];

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
