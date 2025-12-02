import { Trophy } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { achievements } from '../data/content'

export function Achievements() {
  return (
    <section id="achievements" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Proof"
          title="Credentials across security, teaching, and consulting"
          description="Elite certificates, national ICT results, and client celebrations that validate the multi-hyphenate story."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((item) => (
            <article key={item.title} className="spotlight-card flex flex-col gap-3 rounded-[2rem] border border-white/10 p-8">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.4em] text-muted">
                <Trophy className="h-4 w-4 text-accent" />
                {item.context}
              </div>
              <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
              <p className="text-sm text-muted">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
