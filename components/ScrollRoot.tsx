'use client'

export default function ScrollRoot({ children }: { children: React.ReactNode }) {
  return <div className="scroll-root" id="scrollRoot">{children}</div>
}
