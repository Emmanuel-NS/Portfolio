import { ShieldCheck, Zap } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import { skillGroups } from '../data/content'

export function Skills() {
  return (
    <section id="skills" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="Capabilities powering secure delivery"
          description="Every engagement blends cybersecurity rigor, software craftsmanship, IT education, and consulting instincts into one toolkit."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="spotlight-card relative rounded-[2rem] border border-white/10 p-8">
            <div className="relative z-10 space-y-4">
              <ShieldCheck className="h-10 w-10 text-neon" />
              <p className="text-xl font-semibold text-white">Secure-by-design approach</p>
              <p className="text-sm text-muted">
                From penetration testing to resilient shipping practices, engagements stay audit-ready without dulling the product shine.
              </p>
            </div>
          </div>
          <div className="glass-panel grid gap-4 p-8">
            {skillGroups.map((group) => (
              <div key={group.title} className="rounded-2xl border border-white/5 bg-white/5 p-5">
                <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.4em] text-muted">
                  <Zap className="h-4 w-4 text-accent" />
                  {group.title}
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/90">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
