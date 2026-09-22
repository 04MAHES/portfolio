export const RESUME_FILE = "umamaheswarraju_resume.pdf";

/* =========================================================
   PROFILE
   ========================================================= */

export const profile = {
  name: "Umamaheswar Raju Sagiraju",

  // title: 'Software Engineer | Backend, AI & Automation',

  title:
    "Software Engineer | Backend & AI Systems | Java · Spring Boot · Python · FastAPI | Microservices | Agentic AI · RAG | LangChain · LangGraph | Docker · Kubernetes",

  tagline:
    "Software Engineer building scalable backend systems, AI-powered applications, and enterprise automation solutions using Java, Python, cloud-native technologies, and modern LLM frameworks.",

  summary:
    "Software Engineer with experience designing and building scalable backend systems, RESTful APIs, and cloud-native microservices using Java and Python. Strong foundation in system design, database optimization, containerized deployments, and CI/CD automation. Hands-on experience building Agentic AI and RAG-based applications using LangChain and LangGraph, along with AI-powered RPA workflow analysis using Google Gemini. Experienced in enterprise automation, RPA platform migration, production debugging, and full SDLC delivery across architecture, development, testing, and deployment.",

  email: "sumamaheswarraju@gmail.com",

  phone: "+91-8778856020",

  location: "Bangalore, Karnataka",

  links: {
    linkedin: "https://linkedin.com/in/sumamaheswarraju",
    github: "https://github.com/04MAHES",
  },
};

/* =========================================================
   PROFESSIONAL FOCUS
   ========================================================= */

export type FocusArea = {
  title: string;
  description: string;
  technologies: string[];
};

export const focusAreas: FocusArea[] = [
  {
    title: "Backend Engineering",

    description:
      "Designing scalable backend services, RESTful APIs, microservices, and data-driven applications with Java, Spring Boot, Python, and FastAPI.",

    technologies: [
      "Java",
      "Python",
      "Spring Boot",
      "Spring MVC",
      "FastAPI",
      "REST APIs",
      "Microservices",
    ],
  },

  {
    title: "AI Engineering",

    description:
      "Building AI-powered applications and intelligent workflow analysis systems using LLMs, Agentic AI concepts, RAG pipelines, LangChain, LangGraph, and Google Gemini.",

    technologies: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Prompt Engineering",
      "Google Gemini",
      "LLM Applications",
    ],
  },

  {
    title: "Automation Engineering",

    description:
      "Developing and modernizing enterprise automation solutions, optimizing RPA workflows, and supporting large-scale automation platform migrations.",

    technologies: [
      "UiPath",
      "Blue Prism",
      "Automa",
      "RPA",
      "Workflow Automation",
    ],
  },

  {
    title: "Cloud & DevOps",

    description:
      "Working with containerized deployments, CI/CD automation, source control, and cloud-native development workflows.",

    technologies: ["Docker", "Kubernetes", "Git", "GitHub", "Jenkins", "Maven"],
  },
];

/* =========================================================
   TECHNICAL SKILLS
   ========================================================= */

export const skillGroups: {
  title: string;
  items: string[];
}[] = [
  {
    title: "Languages",

    items: ["Java", "Python", "SQL", "JavaScript"],
  },

  {
    title: "Backend & APIs",

    items: [
      "Spring Boot",
      "Spring MVC",
      "FastAPI",
      "RESTful APIs",
      "Microservices Architecture",
      "Node.js",
    ],
  },

  {
    title: "AI & Agentic Systems",

    items: [
      "LangChain",
      "LangGraph",
      "RAG Pipelines",
      "Prompt Engineering",
      "Google Gemini",
      "LLM Applications",
    ],
  },

  {
    title: "Databases",

    items: ["PostgreSQL", "MySQL", "MongoDB", "DynamoDB"],
  },

  {
    title: "Cloud & DevOps",

    items: [
      "Docker",
      "Kubernetes",
      "Git",
      "GitHub",
      "Jenkins",
      "Maven",
      "CI/CD",
    ],
  },

  {
    title: "RPA & Automation",

    items: [
      "UiPath",
      "Blue Prism",
      "Automa",
      "RPA Workflow Automation",
      "RPA Platform Migration",
    ],
  },

  {
    title: "Frontend",

    items: ["React", "JavaScript"],
  },
];

/* =========================================================
   EXPERIENCE
   ========================================================= */

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
    company: "Tecklytics",

    role: "Software Engineer",

    period: "Jul 2024 – Present",

    location: "Bangalore, Karnataka",

    engagements: [
      {
        name: "Backend Development & Data Extraction",

        context: "Client: Singapore",

        bullets: [
          "Designed scalable Java/Spring Boot microservices and RESTful APIs, improving system availability and reducing integration downtime for internal and external enterprise systems.",

          "Optimized Spring Data JPA/Hibernate database interactions to improve query performance and reduce latency across high-traffic services.",

          "Strengthened Jenkins/Maven CI/CD pipelines, streamlining build, test, and deployment automation and reducing production release risk.",

          "Resolved recurring production defects through hands-on debugging and troubleshooting while collaborating closely with QA and frontend engineers.",
        ],

        tech: [
          "Java",
          "Spring Boot",
          "Spring Data JPA",
          "Hibernate",
          "REST APIs",
          "PostgreSQL",
          "MSSQL",
          "Jenkins",
          "Maven",
        ],
      },

      {
        name: "System Modernization & Version Migration",

        context: "Singapore Health Services",

        bullets: [
          "Reduced bot-initialization time across a large fleet of virtual machines by refactoring legacy Blue Prism VBOs and resolving technical debt during a large-scale RPA platform migration.",

          "Delivered a zero-downtime cutover for critical production automation workflows by orchestrating a parallel migration strategy with redundant environments and database clones.",

          "Implemented an upgraded authentication and security gateway, improving system observability and operational reliability.",
        ],

        tech: [
          "Blue Prism",
          "RPA",
          "System Migration",
          "Virtual Machines",
          "Database Clones",
          "Authentication",
          "Security Gateway",
        ],
      },

      {
        name: "AI-Powered Code Analysis & RPA Review System",

        context: "AI-powered RPA workflow analysis",

        bullets: [
          "Architected an automated analysis engine to evaluate complex RPA workflows using LLM-based pattern recognition, reducing manual code review effort.",

          "Achieved 100% data-processing integrity by engineering fault-tolerant retry logic and recovery algorithms against malformed automation service outputs.",

          "Accelerated technical troubleshooting and decision-making through a reactive visualization layer for nested activity trees and complexity metrics across large RPA workflow sets.",
        ],

        tech: [
          "React",
          "FastAPI",
          "Python",
          "Google Gemini",
          "LLM APIs",
          "PostgreSQL",
          "RPA",
        ],
      },
    ],
  },
];

/* =========================================================
   PROJECTS
   ========================================================= */

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
    name: "Simple Social",

    subtitle: "Multimedia Storage Platform",

    bullets: [
      "Built a full-stack social media platform for sharing images and videos using an asynchronous FastAPI backend and Streamlit-based interactive frontend.",

      "Implemented JWT-based authentication and session management with FastAPI-Users, covering registration, login, and protected route access.",

      "Integrated ImageKit for cloud-native media storage and on-the-fly transformation, including dynamic text overlays and blurred background padding for uploaded images and videos.",

      "Designed asynchronous database models with SQLAlchemy and aiosqlite to manage users and posts.",

      "Enforced owner-based access control on post operations.",
    ],

    tech: [
      "Python",
      "FastAPI",
      "Streamlit",
      "SQLAlchemy",
      "aiosqlite",
      "FastAPI-Users",
      "JWT",
      "ImageKit.io",
    ],

    repo: "https://github.com/04MAHES/multimedia-storage-sharing-app",

    repoLabel: "View on GitHub",
  },

  {
    name: "Job Application Management System",

    subtitle: "Backend",

    bullets: [
      "Engineered an enterprise-grade backend system for job and company management following industry-standard RESTful microservices design principles.",

      "Modeled complex relational databases and optimized data-layer mapping utilizing JPA entity relationships and Hibernate.",
    ],

    tech: [
      "Java 11",
      "Spring Boot",
      "Spring MVC",
      "Spring Data JPA",
      "Hibernate",
      "REST APIs",
      "Maven",
    ],
  },
];

/* =========================================================
   EDUCATION
   ========================================================= */

export const education = [
  {
    degree: "B.Tech, Information Science and Engineering",

    school: "Sai Vidya Institute of Technology",

    location: "Bangalore, Karnataka",

    period: "2019 – 2023",
  },
];

/* =========================================================
   CERTIFICATIONS
   ========================================================= */

export type Certification = {
  name: string;
  issuer: string;
  /** Public credential / certificate page. Opens in a new tab. */
  url?: string;
  year?: string;
};

export const certifications: Certification[] = [
  {
    name: "UiPath Associate Certification",
    issuer: "UiPath",
    url: "https://drive.google.com/file/d/1Swagi6Vx7DCmu60qLUtzEQ9qtgW9ik1Y/view?usp=sharing",
  },
  {
    name: "IPA Architect",
    issuer: "Automa",
    url: "https://drive.google.com/file/d/1HMVfSMtGNHS1WtAjU1-HF15dL2yZNZBe/view?usp=sharing",
  },
  // Add more certifications here. Example:
  // {
  //   name: 'Certification name',
  //   issuer: 'Issuer',
  //   year: '2026',
  //   url: 'https://example.com/credential',
  // },
];

/* =========================================================
   NAVIGATION
   ========================================================= */

export const navItems = [
  {
    id: "home",
    label: "Home",
  },

  {
    id: "about",
    label: "About",
  },

  {
    id: "skills",
    label: "Skills",
  },

  {
    id: "experience",
    label: "Experience",
  },

  {
    id: "projects",
    label: "Projects",
  },

  {
    id: "certifications",
    label: "Certifications",
  },

  {
    id: "education",
    label: "Education",
  },

  {
    id: "contact",
    label: "Contact",
  },
];
