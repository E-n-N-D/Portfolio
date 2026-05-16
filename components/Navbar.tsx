'use client'

import { useState } from 'react'

const links = [
  { href: '#hero',         label: 'Home' },
  { href: '#expertise',    label: 'Expertise' },
  { href: '#experience',   label: 'Experience' },
  { href: '#projects',     label: 'Projects' },
  { href: '#achievements', label: 'Achievements' },
  { href: '#contact',      label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <nav>
      <a href="#hero" className="nav-logo">Sushant.</a>

      <button
        className={`nav-hamburger${open ? ' open' : ''}`}
        id="navToggle"
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links${open ? ' open' : ''}`} id="navLinks">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a href={href} onClick={close}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
