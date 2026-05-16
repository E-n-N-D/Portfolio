export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-left">
        <p className="hero-eyebrow reveal from-top d1">FULL STACK DEVELOPER · BACKEND FOCUS</p>
        <h1 className="hero-name reveal from-left d2">Sushant</h1>
        <p className="hero-tagline reveal from-left d3">
          I build scalable backend systems and intelligent applications — turning complex problems
          into clean, working software.
        </p>
        <div className="hero-actions reveal from-bottom d4">
          <a href="https://github.com/E-n-N-D" target="_blank" rel="noreferrer" className="btn">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/sushant-adk" target="_blank" rel="noreferrer" className="btn">
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
            LinkedIn
          </a>
          <a href="/cv.pdf" className="btn primary" download>
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M12 3v13M8 12l4 4 4-4M4 18h16" />
            </svg>
            Download CV
          </a>
        </div>
      </div>

      <div className="photo-wrap">
        <div className="photo-card reveal from-right d3">
          <div className="photo-inner">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.4 3.58-8 8-8s8 3.6 8 8" />
            </svg>
            <span>Your photo here</span>
          </div>
        </div>
      </div>
    </section>
  )
}
