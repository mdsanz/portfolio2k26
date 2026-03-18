export interface Certification {
  name: string;
  issuer: string;
  status: 'in-progress' | 'obtained';
  estimatedDate?: string;
  badgeUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: 'Microsoft Certified: Azure Developer Associate',
    issuer: 'Microsoft',
    status: 'in-progress',
    estimatedDate: 'May 2026',
  },
  {
    name: 'AWS Certified Developer - Associate',
    issuer: 'Amazon Web Services',
    status: 'in-progress',
    estimatedDate: 'July 2026',
  },
];
