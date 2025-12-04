import { Building2, CheckCircle2 } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import type { ConsultingProject } from '../data/content'

type ConsultingProps = {
  consultingProjects: ConsultingProject[]
}

export function Consulting({ consultingProjects }: ConsultingProps) {
  return (
    <section id="consulting" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Consulting"
          title="Consulting partners and digital outcomes"
          description="I help agritech, media, and wellness teams move from strategy to shipped software and training."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {consultingProjects.map((project) => (
            <article key={project.client} className="glass-panel flex flex-col gap-4 rounded-[1.8rem] border border-white/10 p-6">
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
                <Building2 className="h-4 w-4 text-neon" />
                {project.client}
              </div>
              <h3 className="text-xl font-semibold text-white">{project.focus}</h3>
              <p className="text-sm text-muted">{project.description}</p>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
                <CheckCircle2 className={`h-4 w-4 ${project.status === 'Delivered' ? 'text-neon' : 'text-accent'}`} />
                {project.status}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
