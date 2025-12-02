import { SectionHeading } from './SectionHeading'
import { education, experience } from '../data/content'

export function About() {
  return (
    <section id="about" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Journey"
           title="Education timeline and field impact"
           description="STEM depth that fuels cybersecurity research, ICT education wins, and consulting leadership for real-world deployments."
        />
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            {education.map((entry, index) => (
              <article
                key={`${entry.institution}-${entry.period}`}
                className="relative grid gap-4 rounded-3xl border border-white/5 bg-[#070b1d]/70 p-6 backdrop-blur-2xl"
              >
                <div className="flex items-start gap-4">
                  <div className="timeline-dot mt-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-muted">{entry.period}</p>
                    <h3 className="mt-2 text-xl font-semibold text-white">{entry.institution}</h3>
                    <p className="text-sm font-semibold text-white/80">{entry.credential}</p>
                    <p className="mt-3 text-sm text-muted">{entry.description}</p>
                  </div>
                </div>
                {index !== education.length - 1 && <span className="absolute left-4 top-full h-8 w-px bg-white/10 lg:left-5" />}
              </article>
            ))}
          </div>
          <div className="space-y-5">
            {experience.map((item) => (
              <article key={`${item.organization}-${item.role}`} className="spotlight-card rounded-3xl border border-white/5 p-6">
                <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-lg font-semibold text-white">{item.organization}</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-muted">{item.period}</p>
                </div>
                <p className="relative z-10 text-sm uppercase tracking-[0.4em] text-primary">{item.role}</p>
                <p className="relative z-10 mt-4 text-sm text-muted">{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
