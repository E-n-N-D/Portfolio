import { type ProjectItem } from '@/lib/data'

const GithubIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
)

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24">
    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const PlaceholderIcon = () => (
  <svg viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="13" rx="2" />
    <circle cx="12" cy="9.5" r="2.5" />
    <path d="M7 20l5-3.5L17 20" />
  </svg>
)

interface Props {
  project: ProjectItem
  dir: string
}

export default function ProjectCard({ project, dir }: Props) {
  return (
    <div className={['proj-card', dir && 'reveal', dir].filter(Boolean).join(' ')}>
      <div className="proj-media">
        {project.image
          ? <img src={project.image} alt={project.name} />
          : (
            <div className="proj-media-placeholder">
              <PlaceholderIcon />
              <span>SCREENSHOT / GIF</span>
            </div>
          )
        }
      </div>

      <div className="proj-body">
        <div className="proj-name">{project.name}</div>
        <div className="proj-desc">{project.desc}</div>

        <div className="proj-stack tags">
          {project.tags.map((tag) => (
            <span key={tag.label} className="tag">
              {tag.icon && <img src={tag.icon} alt={tag.label} />}
              {tag.label}
            </span>
          ))}
        </div>

        {/* Only render the links row if at least one link exists */}
        {(project.github || project.demo) && (
          <div className="proj-links">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="proj-link"
                aria-label={`${project.name} source code`}
              >
                <GithubIcon />
                Code
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="proj-link proj-link-live"
                aria-label={`${project.name} live demo`}
              >
                <ExternalIcon />
                Live
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}