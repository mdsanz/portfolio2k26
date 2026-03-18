import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Proyectos | Portfolio',
  description: 'Proyectos personales de desarrollo de software — backend, fullstack y experimentación con nuevas tecnologías.',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
