import Navbar       from '@/components/Navbar'
import Hero         from '@/components/Hero'
import Expertise    from '@/components/Expertise'
import Experience   from '@/components/Experience'
import Projects     from '@/components/Projects'
import Achievements from '@/components/Achievements'
import Contact      from '@/components/Contact'
import RevealInit   from '@/components/RevealInit'
import StickyLayout, { type SectionMeta } from '@/components/StickyLayout'

const sections: SectionMeta[] = [
  {
    id:        'expertise',
    num:       '01',
    label:     'WHAT I DO',
    title:     'My<br/>Expertise',
    sub:       'Four areas I work across — from full-stack web to cloud deployments.',
    bg:        'bg-white',
    component: <Expertise />,
  },
  {
    id:        'experience',
    num:       '02',
    label:     "WHERE I'VE WORKED",
    title:     'Experi&shy;ence',
    sub:       'Click any role to see what I learned and built there.',
    bg:        'bg-gray',
    component: <Experience />,
  },
  {
    id:        'projects',
    num:       '03',
    label:     "WHAT I'VE BUILT",
    title:     'Projects',
    sub:       'Selected work — each one a real problem, a real solution.',
    bg:        'bg-projects',
    component: <Projects />,
  },
  {
    id:        'achievements',
    num:       '04',
    label:     'BEYOND THE CODE',
    title:     'Achieve&shy;ments',
    sub:       'Certifications, research, and community involvement.',
    bg:        'bg-gray',
    component: <Achievements />,
  },
]

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StickyLayout sections={sections} />
      <Contact />
      <RevealInit />
    </>
  )
}
