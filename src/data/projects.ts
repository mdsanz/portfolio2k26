export type ProjectStatus = 'completed' | 'in-progress' | 'coming-soon'

export interface Project {
  slug: string
  name: string
  shortDescription: string    // 1 línea — para la card
  fullDescription: string     // 2-3 párrafos — para la página de detalle
  role: string
  stack: string[]
  architectureDecision: {
    title: string
    description: string
  }
  impact?: {
    metric: string            // ej. "Reducción de latencia"
    value: string             // ej. "40%"
  }
  images?: {
    src: string
    alt: string
    caption?: string
  }[]
  highlights?: string[]       // Key features / bullet points
  architectureDiagram?: string // Mermaid diagram definition
  githubUrl?: string
  demoUrl?: string
  status: ProjectStatus
  year: string
  tags: string[]              // para filtros: 'backend', 'frontend', 'fullstack', 'ai'
}

export const projects: Project[] = [

  // Proyecto 1 — Completado con repositorio público
  {
    slug: 'project-one',
    name: 'Nombre del Proyecto 1',          // TODO: reemplazar
    shortDescription: 'Descripción breve de una línea del proyecto.',
    fullDescription: `
      Párrafo 1: contexto del proyecto, qué problema resuelve
      y por qué decidiste construirlo.

      Párrafo 2: detalles técnicos de la implementación,
      decisiones importantes tomadas durante el desarrollo.

      Párrafo 3: aprendizajes, qué harías diferente,
      próximos pasos o mejoras planeadas.
    `,
    role: 'Full Stack Developer',
    stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Docker'],
    architectureDecision: {
      title: 'Decisión técnica clave',       // TODO: reemplazar
      description: 'Explicación de por qué tomaste esa decisión y qué problema resolvía.',
    },
    impact: {
      metric: 'Métrica de impacto',          // TODO: reemplazar
      value: '0%',                           // TODO: reemplazar
    },
    highlights: [
      'Implementación de API RESTful con autenticación JWT',
      'Pipeline de CI/CD con GitHub Actions',
      'Base de datos PostgreSQL con migraciones automatizadas',
      'Containerización con Docker y docker-compose',
    ],
    images: [
      { src: 'https://picsum.photos/seed/p1-1/800/450', alt: 'Dashboard principal', caption: 'Vista del dashboard principal del proyecto' },
      { src: 'https://picsum.photos/seed/p1-2/800/450', alt: 'Arquitectura del sistema', caption: 'Diagrama de la arquitectura del sistema' },
    ],
    architectureDiagram: `
graph TD
  Client[Web Client] -->|HTTPS| ALB[Load Balancer]
  ALB --> API[Node.js API]
  API --> DB[(PostgreSQL)]
  API --> Cache[(Redis)]
  API --> Worker[Background Worker]
  Worker --> Q[Job Queue]
    `,
    githubUrl: 'https://github.com/username/project-one', // TODO: reemplazar
    demoUrl: undefined,
    status: 'completed',
    year: '2024',
    tags: ['fullstack'],
  },

  // Proyecto 2 — En progreso
  {
    slug: 'project-two',
    name: 'Nombre del Proyecto 2',          // TODO: reemplazar
    shortDescription: 'Descripción breve de una línea del proyecto.',
    fullDescription: `
      Párrafo 1: contexto y motivación del proyecto.

      Párrafo 2: estado actual del desarrollo y
      decisiones técnicas tomadas hasta ahora.
    `,
    role: 'Backend Developer',
    stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
    architectureDecision: {
      title: 'Decisión técnica clave',       // TODO: reemplazar
      description: 'Explicación de por qué tomaste esa decisión.',
    },
    highlights: [
      'Microservicios con Spring Boot y comunicación asíncrona',
      'Event-driven architecture con Apache Kafka',
      'Monitoreo con Prometheus y Grafana',
    ],
    images: [
      { src: 'https://picsum.photos/seed/p2-1/800/450', alt: 'API Gateway', caption: 'Diseño del API Gateway' },
    ],
    githubUrl: 'https://github.com/username/project-two', // TODO: reemplazar
    demoUrl: undefined,
    status: 'in-progress',
    year: '2025',
    tags: ['backend'],
  },

  // Proyecto 3 — Próximamente
  {
    slug: 'project-three',
    name: 'Nombre del Proyecto 3',          // TODO: reemplazar
    shortDescription: 'Próximamente — descripción del proyecto en construcción.',
    fullDescription: '',
    role: 'Backend Developer',
    stack: ['Quarkus', 'MongoDB', 'Kubernetes'],
    architectureDecision: {
      title: 'Por definir',
      description: 'Los detalles se publicarán al completar el proyecto.',
    },
    githubUrl: undefined,
    demoUrl: undefined,
    status: 'coming-soon',
    year: '2025',
    tags: ['backend'],
  },

  // Proyecto 4 — Próximamente
  {
    slug: 'project-four',
    name: 'Nombre del Proyecto 4',          // TODO: reemplazar
    shortDescription: 'Próximamente — descripción del proyecto en construcción.',
    fullDescription: '',
    role: 'Full Stack Developer',
    stack: ['Next.js', 'TypeScript', 'Node.js'],
    architectureDecision: {
      title: 'Por definir',
      description: 'Los detalles se publicarán al completar el proyecto.',
    },
    githubUrl: undefined,
    demoUrl: undefined,
    status: 'coming-soon',
    year: '2025',
    tags: ['fullstack'],
  },

  // Este portfolio como proyecto personal real
  {
    slug: 'portfolio',
    name: 'Portfolio Personal',
    shortDescription: 'Portfolio interactivo construido con Next.js, Three.js y Gemini API.',
    fullDescription: `
      Portfolio personal diseñado con enfoque en experiencia
      visual y técnica. Construido con Next.js 14, Three.js
      para animaciones 3D, Framer Motion para transiciones,
      y React Flow para visualización de arquitectura.

      La navegación tipo presentación — una sección a la vez
      con slide horizontal — fue una decisión deliberada para
      maximizar el impacto visual de cada sección sin el ruido
      de una página de scroll tradicional.

      Incluye integración con Gemini API de Google como
      asistente del portfolio, y un diagrama de arquitectura
      interactivo que representa el stack completo usado
      en proyectos reales.
    `,
    role: 'Full Stack Developer',
    stack: [
      'Next.js', 'TypeScript', 'Three.js',
      'Framer Motion', 'React Flow', 'Tailwind CSS',
      'Gemini API',
    ],
    architectureDecision: {
      title: 'Navegación SPA tipo presentación',
      description: 'Elegí una navegación de sección completa por pantalla en lugar de scroll tradicional para crear una experiencia más inmersiva y controlada, similar a una presentación pero con la fluidez de una web app.',
    },
    impact: {
      metric: 'Secciones con animación 3D',
      value: '3',
    },
    highlights: [
      'Navegación tipo presentación con Framer Motion',
      'Backgrounds 3D interactivos con Three.js',
      'Tema claro/oscuro con transiciones suaves',
      'Diseño completamente responsive',
      'Carrusel de proyectos con soporte para swipe',
    ],
    images: [
      { src: 'https://picsum.photos/seed/port-1/800/450', alt: 'Hero section', caption: 'Sección principal con fondo de grafos animado' },
      { src: 'https://picsum.photos/seed/port-2/800/450', alt: 'Proyectos', caption: 'Vista del carrusel de proyectos' },
      { src: 'https://picsum.photos/seed/port-3/800/450', alt: 'Tech Stack', caption: 'Visualización interactiva del stack tecnológico' },
    ],
    architectureDiagram: `
graph LR
  User((User)) --> NextApp[Next.js App Server]
  NextApp --> VercelCDN[Vercel Edge CDN]
  NextApp -.->|API Calls| Gemini[Gemini AI Model]
  
  subgraph Client [Browser]
    React[React 18]
    ThreeJS[Three.js / Canvas]
    Motion[Framer Motion]
  end

  VercelCDN --> Client
    `,
    githubUrl: 'https://github.com/username/portfolio', // TODO: reemplazar
    demoUrl: 'https://tudominio.dev',                   // TODO: reemplazar
    status: 'in-progress',
    year: '2025',
    tags: ['fullstack', 'frontend'],
  },
]

// Helpers de filtrado
export const completedProjects  = projects.filter(p => p.status === 'completed')
export const inProgressProjects = projects.filter(p => p.status === 'in-progress')
export const comingSoonProjects  = projects.filter(p => p.status === 'coming-soon')

// Los primeros 3 para el carrusel de la sección principal
export const featuredProjects = projects.slice(0, 3)
