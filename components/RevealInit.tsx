'use client'

import { useEffect } from 'react'

export default function RevealInit() {
  useEffect(() => {
    const root = document.getElementById('scrollRoot') as HTMLElement | null
    if (!root) return

    // ── One-shot reveal: once in view, permanently add .in and stop watching ──
    const reveals = document.querySelectorAll('.reveal')
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            obs.unobserve(e.target) // never remove .in again
          }
        })
      },
      { root, threshold: 0.1 },
    )
    reveals.forEach((el) => revealObs.observe(el))

    // ── Active nav link ──
    const sections = document.querySelectorAll('[id]')
    const navLinks = document.querySelectorAll('.nav-links a')
    const navObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            navLinks.forEach((l) => l.classList.remove('active'))
            const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`)
            if (a) a.classList.add('active')
          }
        })
      },
      { root, threshold: 0.35 },
    )
    sections.forEach((s) => navObs.observe(s))

    // ── Smooth scroll for all hash links ──
    const handleClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement
      const href = a.getAttribute('href')
      if (!href?.startsWith('#')) return
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    }
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', handleClick)
    })

    return () => {
      revealObs.disconnect()
      navObs.disconnect()
      document.querySelectorAll('a[href^="#"]').forEach((a) => {
        a.removeEventListener('click', handleClick)
      })
    }
  }, [])

  return null
}
