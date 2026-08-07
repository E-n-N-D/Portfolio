'use client'

import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status !== 'idle') {
      setStatus('idle')
      setErrorMessage('')
    }

    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      setStatus('error')
      setErrorMessage('Please fill in all fields before sending.')
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      const payload: { error?: string } = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(payload.error || 'Failed to send message.')
      }

      setForm({ name: '', email: '', message: '' })
      setStatus('sent')
    } catch (err) {
      setStatus('error')
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message.')
    }
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
          <p className="cf-status" aria-live="polite">
            ✓ Message sent — I&apos;ll be in touch soon!
          </p>
        ) : (
          <form className="cf" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message →'}
            </button>
            {status === 'error' ? (
              <p className="cf-status error" aria-live="assertive">
                {errorMessage}
              </p>
            ) : null}
          </form>
        )}
      </div>

      <footer>
        <span>© 2025 Sushant Adhikari. All rights reserved.</span>
        <span>Built with care &amp; clean code.</span>
      </footer>
    </section>
  )
}
