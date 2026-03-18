export interface Tech {
  name: string;
  icon: string;
  yearsExp: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface Ecosystem {
  ecosystem: string;
  techs: Tech[];
}

export const techStack: Ecosystem[] = [
  {
    ecosystem: 'JVM',
    techs: [
      { name: 'Java', icon: 'openjdk', yearsExp: 4, level: 'Expert' },
      { name: 'Spring Boot', icon: 'springboot', yearsExp: 3, level: 'Advanced' },
      { name: 'Quarkus', icon: 'quarkus', yearsExp: 2, level: 'Advanced' },
    ],
  },
  {
    ecosystem: 'Frontend',
    techs: [
      { name: 'Next.js', icon: 'nextdotjs', yearsExp: 2, level: 'Advanced' },
      { name: 'React', icon: 'react', yearsExp: 3, level: 'Advanced' },
      { name: 'TypeScript', icon: 'typescript', yearsExp: 3, level: 'Advanced' },
    ],
  },
  {
    ecosystem: 'Cloud & Infra',
    techs: [
      { name: 'AWS', icon: 'amazonwebservices', yearsExp: 2, level: 'Intermediate' },
      { name: 'Azure', icon: 'microsoftazure', yearsExp: 1, level: 'Intermediate' },
      { name: 'Docker', icon: 'docker', yearsExp: 3, level: 'Advanced' },
    ],
  },
  {
    ecosystem: 'Learning',
    techs: [
      { name: 'Python', icon: 'python', yearsExp: 1, level: 'Beginner' },
      { name: 'TensorFlow', icon: 'tensorflow', yearsExp: 0.5, level: 'Beginner' },
    ],
  },
];
