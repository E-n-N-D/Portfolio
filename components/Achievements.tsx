import { achievements, type Achievement } from '@/lib/data'

const typeLabel: Record<Achievement['type'], string> = {
  award:         'Award',
  involvement:   'Involvement',
  certification: 'Certification',
  publication:   'Publication',
}

const typeIcon: Record<Achievement['type'], React.ReactNode> = {
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
    </svg>
  ),
  involvement: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
    </svg>
  ),
  certification: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/><polyline points="9 9 12 12 15 9"/>
    </svg>
  ),
  publication: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  ),
}

const dirs = ['from-left d1', 'from-right d2', 'from-left d3', 'from-right d4', 'from-left d5']

export default function Achievements() {
  return (
    <div className="ach-grid">
      {achievements.map((item, i) => (
        <div key={item.title} className={`ach-card reveal ${dirs[i] ?? 'from-bottom'}`}>
          <div className="ach-icon">{typeIcon[item.type]}</div>
          <div className="ach-body">
            <div className="ach-meta">
              <span className="ach-type">{typeLabel[item.type]}</span>
              <span className="ach-date">{item.date}</span>
            </div>
            <div className="ach-title">{item.title}</div>
            <div className="ach-org">{item.org}</div>
            <div className="ach-desc">{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
