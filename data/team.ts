export interface TeamMember {
  slug: string;
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  image: string;
  linkedin?: string;
  github?: string;
  expertise: string[];
  achievements: string[];
  experience: {
    company: string;
    role: string;
    duration: string;
    highlights: string[];
  }[];
  technologies: {
    primary: string[];
    secondary: string[];
  };
  education?: {
    degree: string;
    institution: string;
    year?: string;
  }[];
  certifications?: string[];
  languages?: string[];
  interests?: string[];
}

export const team: TeamMember[] = [
  {
    slug: "michal-wiatr",
    name: "Michał Wiatr",
    title: "CEO & CTO",
    shortBio: "Ex-Sabre tech lead and former Samsung 5G RAN architect with 10+ years scaling distributed systems.",
    fullBio: `Michał is a seasoned technology leader with over a decade of experience in building and scaling distributed systems that handle millions of requests per day. His journey began at Samsung, where he worked as a 5G RAN architect, contributing to next-generation telecommunications infrastructure.

At Sabre, Michał served as a tech lead where he made significant impact by reducing CI/CD cycle time by 88%, enabling same-day releases for critical airline shopping engines. This achievement alone saved the company millions in operational costs and dramatically improved their time-to-market capabilities.

Today, as CEO & CTO of CloudFloo, Michał shapes the company's cloud-native strategy and helps clients migrate to modern Kubernetes-based architectures. His deep understanding of both business and technical challenges makes him an invaluable advisor to enterprise clients undergoing digital transformation.

When not architecting cloud solutions, Michał is an avid marathon runner and hiking enthusiast, bringing the same discipline and endurance to his outdoor pursuits as he does to solving complex technical challenges.`,
    image: "/images/team/michal-wiatr.jpg",
    linkedin: "https://www.linkedin.com/in/mwiatr/",
    github: "https://github.com/wiatrM",
    expertise: [
      "NestJS & TypeScript Microservices",
      "Kubernetes & GitOps (Argo CD)",
      "Distributed Transactions & Event Sourcing",
      "Performance Engineering & Observability",
      "5G RAN Architecture",
      "Enterprise Cloud Migration"
    ],
    achievements: [
      "Reduced CI/CD cycle time by 88% at Sabre, enabling same-day releases",
      "Architected systems handling 10M+ daily requests",
      "Led cloud transformation for Fortune 500 companies",
      "Designed 5G RAN infrastructure at Samsung",
      "Mentored 50+ engineers in cloud-native practices",
      "Speaker at major cloud computing conferences"
    ],
    experience: [
      {
        company: "CloudFloo",
        role: "CEO & CTO",
        duration: "2022 - Present",
        highlights: [
          "Founded cloud-native consultancy serving enterprise clients",
          "Built team of senior engineers specializing in Kubernetes and microservices",
          "Delivered 100+ successful cloud migration projects"
        ]
      },
      {
        company: "Sabre Corporation",
        role: "Senior Tech Lead",
        duration: "2019 - 2022",
        highlights: [
          "Reduced CI/CD cycle time by 88% for airline shopping engines",
          "Led team of 15 engineers in microservices transformation",
          "Implemented event-driven architecture handling millions of transactions"
        ]
      },
      {
        company: "Samsung Electronics",
        role: "5G RAN Architect",
        duration: "2016 - 2019",
        highlights: [
          "Designed next-generation 5G radio access network infrastructure",
          "Contributed to 3GPP standards for 5G architecture",
          "Optimized network performance for ultra-low latency applications"
        ]
      }
    ],
    technologies: {
      primary: ["NestJS", "TypeScript", "Kubernetes", "Docker", "PostgreSQL", "Redis"],
      secondary: ["AWS", "GCP", "Terraform", "Argo CD", "Prometheus", "Grafana"]
    },
    education: [
      {
        degree: "MSc Computer Science",
        institution: "AGH University of Science and Technology",
        year: "2015"
      }
    ],
    certifications: [
      "Certified Kubernetes Administrator (CKA)",
      "AWS Solutions Architect Professional",
      "Google Cloud Professional Cloud Architect"
    ],
    languages: ["Polish (Native)", "English (Fluent)", "German (Conversational)"],
    interests: ["Marathon Running", "Mountain Hiking", "Photography", "Open Source Contributing"]
  },
  {
    slug: "sebastian-debicki",
    name: "Sebastian Dębicki",
    title: "Head of Frontend",
    shortBio: "React & accessibility specialist with 900+ production commits, expert in performance optimization and inclusive design.",
    fullBio: `Sebastian is a frontend engineering specialist with an exceptional track record of delivering high-quality, accessible web applications. With over 900 production commits at The Software House, he has consistently demonstrated his ability to build scalable, performant, and inclusive user interfaces.

His expertise in performance optimization is particularly noteworthy - Sebastian introduced Lighthouse budgets that lifted average SPA scores from 68 to 97 and reduced bundle sizes by 42%. This work directly improved user experience for millions of users while reducing infrastructure costs for clients.

At CloudFloo, Sebastian leads frontend developer experience (DX), ensuring that every pixel is not only visually appealing but also fast, accessible, and themeable. His commitment to web accessibility (WCAG 2.2) ensures that applications serve all users, regardless of their abilities.

Sebastian is passionate about creating design systems and component libraries that enable teams to build consistent, high-quality interfaces efficiently. His work on Storybook-based design systems has become a model for other teams in the industry.`,
    image: "/images/team/sebastian-debicki.jpg",
    linkedin: "https://www.linkedin.com/in/debicki5/",
    github: "https://github.com/Sebastian-Debicki",
    expertise: [
      "React & Next.js (13+)",
      "Storybook & Design Systems",
      "Web Accessibility (WCAG 2.2)",
      "Type-safe APIs with tRPC",
      "Performance Optimization",
      "Component Architecture"
    ],
    achievements: [
      "900+ production commits with zero critical accessibility violations",
      "Improved Core Web Vitals from 68 to 97 across multiple projects",
      "Reduced bundle sizes by 42% through optimization techniques",
      "Built design systems used by 50+ developers",
      "Led accessibility compliance for enterprise clients",
      "Contributor to React accessibility libraries"
    ],
    experience: [
      {
        company: "CloudFloo",
        role: "Head of Frontend",
        duration: "2022 - Present",
        highlights: [
          "Leads frontend DX and architecture decisions",
          "Established accessibility-first development practices",
          "Built reusable component libraries and design systems"
        ]
      },
      {
        company: "The Software House",
        role: "Senior Frontend Developer",
        duration: "2020 - 2022",
        highlights: [
          "Delivered 900+ production commits with exceptional quality",
          "Introduced Lighthouse budgets improving performance metrics",
          "Mentored junior developers in React best practices"
        ]
      },
      {
        company: "Various Startups",
        role: "Frontend Consultant",
        duration: "2018 - 2020",
        highlights: [
          "Helped 10+ startups build scalable frontend architectures",
          "Specialized in React performance optimization",
          "Implemented accessibility standards across client projects"
        ]
      }
    ],
    technologies: {
      primary: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Storybook", "tRPC"],
      secondary: ["Vite", "Webpack", "Jest", "Playwright", "Figma", "Adobe Creative Suite"]
    },
    education: [
      {
        degree: "BSc Computer Science",
        institution: "University of Warsaw",
        year: "2018"
      }
    ],
    certifications: [
      "Certified Professional in Accessibility Core Competencies (CPACC)",
      "Google Analytics Certified",
      "React Testing Library Certified"
    ],
    languages: ["Polish (Native)", "English (Fluent)", "Spanish (Basic)"],
    interests: ["UI/UX Design", "Digital Art", "Accessibility Advocacy", "Tech Blogging"]
  },
  {
    slug: "damian-ogrodnik",
    name: "Damian Ogrodnik",
    title: "Head of Backend",
    shortBio: "Node.js engineer focusing on event-driven architectures and PostgreSQL, with MSc from Wrocław University of Economics.",
    fullBio: `Damian is a backend engineering expert who specializes in building fault-tolerant, event-driven systems using Node.js, PostgreSQL, and modern messaging technologies. His academic background with an MSc from Wrocław University of Economics provides him with a unique perspective on both technical implementation and business requirements.

As a strong advocate for Hexagonal & Clean Architecture principles, Damian ensures that codebases remain maintainable and testable as they scale. His architectural decisions consistently result in systems that can evolve with changing business needs without requiring complete rewrites.

At Sky Gate, Damian led a critical modernization project where he rewrote a legacy SOAP monolith into a microservices mesh that now serves 12 million API calls per day. This transformation not only improved system reliability but also enabled the company to scale their operations significantly.

At CloudFloo, Damian architects backend solutions that form the foundation of modern applications, ensuring they can handle high loads while maintaining data consistency and system reliability.`,
    image: "/images/team/damian-ogrodnik.jpg",
    linkedin: "https://www.linkedin.com/in/damian-ogrodnik-193408143/",
    github: "https://github.com/orgs/cloudfloo/people/Damian-Ogrodnik",
    expertise: [
      "Node.js (NestJS & Fastify)",
      "PostgreSQL & Database Optimization",
      "Kafka / NATS Streaming",
      "Domain-Driven Design",
      "Event-Driven Architecture",
      "Microservices Patterns"
    ],
    achievements: [
      "Rewrote legacy SOAP monolith serving 12M API calls/day",
      "Designed fault-tolerant systems with 99.99% uptime",
      "Optimized database queries achieving sub-millisecond response times",
      "Led microservices transformation for enterprise clients",
      "Implemented event sourcing patterns for financial systems",
      "Mentored teams in clean architecture principles"
    ],
    experience: [
      {
        company: "CloudFloo",
        role: "Head of Backend",
        duration: "2022 - Present",
        highlights: [
          "Architects scalable backend solutions for enterprise clients",
          "Leads database design and optimization initiatives",
          "Implements event-driven architectures for high-throughput systems"
        ]
      },
      {
        company: "Sky Gate",
        role: "Senior Backend Engineer",
        duration: "2020 - 2022",
        highlights: [
          "Rewrote legacy SOAP monolith into microservices architecture",
          "Achieved 12M+ API calls/day with improved reliability",
          "Implemented event sourcing for financial transaction processing"
        ]
      },
      {
        company: "Financial Services Startup",
        role: "Backend Developer",
        duration: "2018 - 2020",
        highlights: [
          "Built real-time payment processing systems",
          "Implemented fraud detection using event streaming",
          "Designed database schemas for financial compliance"
        ]
      }
    ],
    technologies: {
      primary: ["Node.js", "NestJS", "PostgreSQL", "Apache Kafka", "Docker", "TypeScript"],
      secondary: ["Redis", "MongoDB", "NATS", "RabbitMQ", "Elasticsearch", "Kubernetes"]
    },
    education: [
      {
        degree: "MSc Economics and Computer Science",
        institution: "Wrocław University of Economics",
        year: "2018"
      }
    ],
    certifications: [
      "PostgreSQL Certified Professional",
      "Apache Kafka Developer Certification",
      "AWS Certified Developer Associate"
    ],
    languages: ["Polish (Native)", "English (Fluent)", "German (Intermediate)"],
    interests: ["Database Theory", "Distributed Systems", "Economics", "Chess"]
  }
];