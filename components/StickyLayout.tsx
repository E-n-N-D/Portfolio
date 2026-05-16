'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

export interface SectionMeta {
  id: string
  num: string
  label: string
  title: string
  sub: string
  bg: 'bg-white' | 'bg-gray' | 'bg-projects'
  component: React.ReactNode
}

interface Props {
  sections: SectionMeta[]
}

export default function StickyLayout({ sections }: Props) {
  const [activeIdx, setActiveIdx]   = useState(0)
  const [animState, setAnimState]   = useState<'idle' | 'exit' | 'enter'>('idle')
  const [progress, setProgress]     = useState(0)
  const pendingIdx                  = useRef(0)
  const sectionRefs                 = useRef<(HTMLDivElement | null)[]>([])
  const leftRef                     = useRef<HTMLDivElement>(null)
  const wrapperRef                  = useRef<HTMLDivElement>(null)
  const scrollRoot                  = useRef<HTMLElement | null>(null)

  // Track which right-section is most in view
  const onScroll = useCallback(() => {
    const root = scrollRoot.current
    if (!root) return

    // Progress bar — how far through the whole content-wrapper
    const wrapper = wrapperRef.current
    if (wrapper) {
      const wRect = wrapper.getBoundingClientRect()
      const navH  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav') || '58')
      const total = wrapper.offsetHeight - (window.innerHeight - navH)
      const scrolled = Math.max(0, -wRect.top + navH)
      setProgress(Math.min(100, (scrolled / total) * 100))
    }

    // Which section is most in view
    let bestIdx = 0
    let bestVis = -1
    sectionRefs.current.forEach((el, i) => {
      if (!el) return
      const rect  = el.getBoundingClientRect()
      const navH  = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav') || '58')
      const vis   = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, navH)
      if (vis > bestVis) { bestVis = vis; bestIdx = i }
    })

    if (bestIdx !== activeIdx) {
      pendingIdx.current = bestIdx
      setAnimState('exit')
    }
  }, [activeIdx])

  // Wire scroll listener to .scroll-root
  useEffect(() => {
    const root = document.querySelector('.scroll-root') as HTMLElement
    if (!root) return
    scrollRoot.current = root
    root.addEventListener('scroll', onScroll, { passive: true })
    return () => root.removeEventListener('scroll', onScroll)
  }, [onScroll])

  // Apply --progress CSS var on left panel
  useEffect(() => {
    if (leftRef.current) {
      leftRef.current.style.setProperty('--progress', `${progress}%`)
    }
  }, [progress])

  // Handle exit → update → enter animation sequence
  useEffect(() => {
    if (animState === 'exit') {
      const t = setTimeout(() => {
        setActiveIdx(pendingIdx.current)
        setAnimState('enter')
      }, 220)
      return () => clearTimeout(t)
    }
    if (animState === 'enter') {
      const t = setTimeout(() => setAnimState('idle'), 400)
      return () => clearTimeout(t)
    }
  }, [animState])

  const active = sections[activeIdx]
  const contentClass =
    animState === 'exit'  ? 'left-content exit'  :
    animState === 'enter' ? 'left-content enter'  :
    'left-content'

  return (
    <div className="content-wrapper" ref={wrapperRef}>

      {/* ── STICKY LEFT PANEL ── */}
      <div className="sticky-left" ref={leftRef}>
        <div className={contentClass}>
          <div className="left-num">{active.num}</div>
          <div style={{ marginTop: '1.25rem' }}>
            <p className="sec-label">{active.label}</p>
            <h2 className="sec-title" dangerouslySetInnerHTML={{ __html: active.title }} />
            <p className="sec-sub">{active.sub}</p>
          </div>
        </div>
      </div>

      {/* ── SCROLLABLE RIGHT ── */}
      <div className="scrollable-right">
        {sections.map((sec, i) => (
          <div
            key={sec.id}
            id={sec.id}
            className={`right-section ${sec.bg}`}
            ref={(el) => { sectionRefs.current[i] = el }}
          >
            {/* Mobile-only inline heading — hidden on desktop via CSS */}
            <div className="mobile-section-head">
              <div className="left-num">{sec.num}</div>
              <p className="sec-label">{sec.label}</p>
              <h2
                className="sec-title"
                dangerouslySetInnerHTML={{ __html: sec.title }}
              />
            </div>

            {sec.component}
          </div>
        ))}
      </div>
    </div>
  )
}
