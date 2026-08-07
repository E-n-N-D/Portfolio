import { NextResponse } from 'next/server'
import { Resend } from 'resend'

interface ContactRequestBody {
  name?: unknown
  email?: unknown
  message?: unknown
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')
}

function parseRecipients(value: string): string[] {
  return value
    .split(',')
    .map((recipient) => recipient.trim())
    .filter(Boolean)
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const apiKey = process.env.RESEND_API_KEY
    const mailFrom = process.env.MAIL_FROM
    const mailTo = process.env.MAIL_TO

    if (!apiKey || !mailFrom || !mailTo) {
      return NextResponse.json(
        {
          error: 'Resend is not configured. Set RESEND_API_KEY, MAIL_FROM, and MAIL_TO.',
        },
        { status: 500 }
      )
    }

    const body: ContactRequestBody = await request.json()
    const name = typeof body.name === 'string' ? body.name.trim() : ''
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 })
    }

    const recipients = parseRecipients(mailTo)

    if (!recipients.length) {
      return NextResponse.json({ error: 'RESEND_TO must include at least one recipient.' }, { status: 500 })
    }

    const resend = new Resend(apiKey)
    const subject = `Portfolio contact from ${name}`
    const text = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n')
    const html = `
      <h2>New portfolio contact message</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replaceAll('\n', '<br />')}</p>
    `

    const { error } = await resend.emails.send({
      from: mailFrom,
      to: recipients.length === 1 ? recipients[0] : recipients,
      replyTo: email,
      subject,
      text,
      html,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}