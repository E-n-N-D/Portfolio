'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Replace this with your real API call / EmailJS / Resend etc.
    await new Promise((r) => setTimeout(r, 800))
    setStatus('sent')
  }

  return (
    <section id="contact">
      <div className="contact-card reveal from-bottom d2">
        <p className="sec-label">GET IN TOUCH</p>
        <h2 className="sec-title">Contact Me</h2>
        <p className="contact-sub">
          Have a project in mind or just want to say hello?
          <br />
          Drop me a message and I&apos;ll get back to you.
        </p>

        {status === 'sent' ? (
          <p style={{ fontSize: 13, color: 'var(--muted)', paddingTop: '1rem' }}>
            ✓ Message sent — I&apos;ll be in touch soon!
          </p>
        ) : (
          <div className="cf">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
            />
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
            />
            <button type="button" onClick={handleSubmit} disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message →'}
            </button>
          </div>
        )}
      </div>

      <footer>
        <span>© 2025 Sushant Adhikari. All rights reserved.</span>
        <span>Built with care &amp; clean code.</span>
      </footer>
    </section>
  )
}
