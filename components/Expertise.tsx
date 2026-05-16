import { expertise } from '@/lib/data'

const smallIcons: Record<string, React.ReactNode> = {
  'Mobile App Development': (
    <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1" fill="currentColor"/></svg>
  ),
  'UI Design & Prototyping': (
    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
  ),
  'Cloud, DevOps & Tools': (
    <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  ),
}

const subIcons: Record<string, React.ReactNode> = {
  Frontend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  Backend: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="4" rx="1"/><rect x="2" y="10" width="20" height="4" rx="1"/><rect x="2" y="17" width="20" height="4" rx="1"/>
      <circle cx="6" cy="5" r=".5" fill="currentColor"/><circle cx="6" cy="12" r=".5" fill="currentColor"/><circle cx="6" cy="19" r=".5" fill="currentColor"/>
    </svg>
  ),
  Databases: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M3 5v4c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
      <path d="M3 9v4c0 1.66 4.03 3 9 3s9-1.34 9-3V9"/>
      <path d="M3 13v4c0 1.66 4.03 3 9 3s9-1.34 9-3v-4"/>
    </svg>
  ),
}

const smallDirs = ['from-left d2', 'from-bottom d3', 'from-right d4']

export default function Expertise() {
  const webDev = expertise.find((e) => e.wide)!
  const others = expertise.filter((e) => !e.wide)

  return (
    <div className="expertise-grid">
      {/* Wide web-dev card */}
      <div className="exp-card-wide reveal from-bottom d1">
        <div className="exp-wide-header">
          <div className="exp-wide-header-left">
            <div className="exp-icon" style={{ flexShrink: 0 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
              </svg>
            </div>
            <div>
              <div className="exp-name" style={{ marginBottom: '.25rem' }}>{webDev.name}</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '.08em' }}>FRONTEND · BACKEND · DATABASES</div>
            </div>
          </div>
          <p className="exp-wide-desc">{webDev.desc}</p>
        </div>

        <div className="exp-sub-grid">
          {webDev.subsections!.map((sub) => (
            <div key={sub.name} className="exp-sub-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.85rem' }}>
                <span style={{ width: 26, height: 26, background: 'var(--white)', border: '0.5px solid var(--dim)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ width: 13, height: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>{subIcons[sub.name]}</span>
                </span>
                <div className="exp-sub-label" style={{ marginBottom: 0 }}>{sub.name}</div>
              </div>
              <div className="tags">
                {sub.tags.map((tag) => (
                  <span key={tag.label} className="tag">
                    {tag.icon && <img src={tag.icon} alt={tag.label} />}
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Smaller cards */}
      {others.map((item, i) => (
        <div key={item.name} className={`exp-card reveal ${smallDirs[i]}`}>
          <div className="exp-icon">{smallIcons[item.name]}</div>
          <div className="exp-name">{item.name}</div>
          <div className="exp-desc">{item.desc}</div>
          <div className="tags">
            {item.tags!.map((tag) => (
              <span key={tag.label} className="tag">
                {tag.icon && <img src={tag.icon} alt={tag.label} />}
                {tag.label}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
