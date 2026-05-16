import type { Metadata } from 'next'
import { Instrument_Serif, Hanken_Grotesk } from 'next/font/google'
import './globals.css'

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Sushant — Portfolio',
  description: 'Full Stack Developer · Backend Focus · AI Engineer',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${hankenGrotesk.variable}`}>
      <body>
        <div className="scroll-root" id="scrollRoot">
          {children}
        </div>
      </body>
    </html>
  )
}
