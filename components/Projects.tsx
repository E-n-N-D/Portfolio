'use client'

import { useState } from 'react'
import { projects, moreProjects } from '@/lib/data'
import ProjectCard from '@/components/ProjectCard'

const mainDirs = ['from-left d2', 'from-bottom d3', 'from-right d4']

export default function Projects() {
  const [expanded, setExpanded] = useState(false)

  return (
    <div>
      {/* Main projects — always fills full width in 3 equal columns */}
      <div className="projects-grid-main">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} dir={mainDirs[i] ?? 'from-bottom'} />
        ))}
      </div>

      {/* Expanded more-projects — container animates in, cards don't need reveal */}
      {expanded && (
        <div className="projects-grid projects-grid-more">
          {moreProjects.map((p) => (
            <ProjectCard key={p.name} project={p} dir="" />
          ))}
        </div>
      )}

      {/* Explore More / Show Less button */}
      <div className="explore-btn-wrap">
        <button
          className="explore-btn"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          {expanded ? (
            <>
              <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>
              Show Less
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
              Explore More
            </>
          )}
        </button>
      </div>
    </div>
  )
}