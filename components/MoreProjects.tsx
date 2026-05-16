import { moreProjects } from '@/lib/data'
import ProjectCard from '@/components/ProjectCard'

const dirs = ['from-left d2', 'from-bottom d3', 'from-right d4', 'from-left d5', 'from-bottom d6']

export default function MoreProjects() {
  return (
    <div className="projects-grid">
      {moreProjects.map((p, i) => (
        <ProjectCard key={p.name} project={p} dir={dirs[i] ?? 'from-bottom'} />
      ))}
    </div>
  )
}
