'use client'

import { useState, useEffect, useRef } from 'react'
import { experience } from '@/lib/data'

export default function Experience() {
  // On large screens: detail panel. On small: accordion.
  const [activeIdx, setActiveIdx] = useState(0)   // large screen selected
  const [openIdx,   setOpenIdx]   = useState<number | null>(null) // small accordion
  const [revealed,  setRevealed]  = useState<Set<number>>(new Set())
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  // One-shot reveal observer (mobile accordion)
  useEffect(() => {
    const root = document.getElementById('scrollRoot') as HTMLElement | null
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const idx = itemRefs.current.indexOf(entry.target as HTMLDivElement)
          if (idx !== -1) {
            setRevealed((prev) => { const n = new Set(prev); n.add(idx); return n })
            observer.unobserve(entry.target)
          }
        })
      },
      { root, threshold: 0.1 },
    )
    itemRefs.current.forEach((el) => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const toggleAccordion = (i: number) => {
    const wasOpen = openIdx === i
    setOpenIdx(wasOpen ? null : i)
    if (!wasOpen) {
      setTimeout(() => {
        itemRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 420)
    }
  }

  const active = experience[activeIdx]

  return (
    <div className="exp-layout">

      {/* ── Timeline list (left on large, full-width on small) ── */}
      <div className="exp-list">
        {experience.map((item, i) => {
          const isRevealed  = revealed.has(i)
          const dir         = i % 2 === 0 ? 'from-right' : 'from-left'

          // Large screen: no accordion — just highlight active
          // Small screen: accordion behaviour
          const isAccordionOpen = openIdx === i

          return (
            <div
              key={item.role}
              className={[
                'tl-item reveal',
                dir,
                `d${i + 2}`,
                isRevealed         ? 'in'     : '',
                isAccordionOpen    ? 'open'   : '',
                i === activeIdx    ? 'tl-selected' : '',
              ].filter(Boolean).join(' ')}
              ref={(el) => { itemRefs.current[i] = el }}
              onClick={() => {
                setActiveIdx(i)
                toggleAccordion(i)
              }}
            >
              <div className="tl-header">
                <div>
                  <div className="tl-date">{item.date}</div>
                  <div className="tl-role">{item.role}</div>
                  <div className="tl-org">{item.org}</div>
                </div>
                {/* Chevron only visible on small screens via CSS */}
                <svg className="tl-chevron tl-chevron-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>

              {/* Accordion body — small screens only */}
              <div className="tl-body tl-body-sm" style={{ maxHeight: isAccordionOpen ? '400px' : '0' }}>
                <div className="tl-body-inner">
                  <ul className="tl-bullets">
                    {item.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── Detail panel (right side, large screens only) ── */}
      <div className="exp-detail">
        <div className="exp-detail-inner">
          <div className="exp-detail-role">{active.role}</div>
          <div className="exp-detail-org">{active.org}</div>
          <div className="exp-detail-date">{active.date}</div>
          <div className="exp-detail-divider" />
          <ul className="tl-bullets exp-detail-bullets">
            {active.bullets.map((b) => <li key={b}>{b}</li>)}
          </ul>
        </div>
      </div>

    </div>
  )
}
