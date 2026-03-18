export interface Experience {
  company: string;
  role: string;
  period: string;
  achievements: string[];
  technologies: string[];
}

export const experience: Experience[] = [
  {
    company: 'Tech Solutions Corp',
    role: 'Backend Engineer',
    period: '2022 - Present (3.5 years)',
    achievements: [
      'Led the migration of legacy monolithic services to a microservices architecture using Spring Boot.',
      'Optimized database queries reducing latency by 40% for the core transaction engine.',
      'Implemented a robust CI/CD pipeline reducing deployment errors by 25%.',
    ],
    technologies: ['Java', 'Spring Boot', 'Quarkus', 'PostgreSQL', 'Docker', 'AWS'],
  },
];
