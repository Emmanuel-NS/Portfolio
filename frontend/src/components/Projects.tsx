import { useEffect, useState, type KeyboardEvent } from 'react'
import { ArrowUpRight, Layers, PlayCircle, X } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import type { Project } from '../data/content'

type ProjectsProps = {
  projects: Project[]
}

export function Projects({ projects }: ProjectsProps) {
  const [preview, setPreview] = useState<{ title: string; link: string } | null>(null)

  useEffect(() => {
    if (!preview) {
      document.body.style.overflow = ''
      return
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [preview])

  return (
    <section id="projects" className="px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Impact"
          title="Flagship builds with live previews"
          description="Healthcare, security, fintech, and community builds with quick previews of the live work."
        />
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => {
            const isLive = project.link.startsWith('http')
            const openPreview = () =>
              setPreview({
                title: project.title,
                link: project.link,
              })
            const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
              if (!isLive) return
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                openPreview()
              }
            }
            return (
              <article
                key={project.title}
                className={`spotlight-card group relative overflow-hidden rounded-[2rem] border border-white/10 p-8 transition duration-300 hover:-translate-y-1 ${
                  index % 2 === 0 ? 'bg-[#060b1d]/80' : 'bg-[#090f23]/80'
                } ${isLive ? 'cursor-pointer' : ''}`}
                onClick={isLive ? openPreview : undefined}
                onKeyDown={handleKeyDown}
                role={isLive ? 'button' : undefined}
                tabIndex={isLive ? 0 : undefined}
              >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted">
                  <Layers className="h-4 w-4 text-accent" />
                  {project.tech.slice(0, 2).join(' · ')}
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-muted">{project.description}</p>
                </div>
                <p className="text-sm font-semibold text-white/80">{project.impact}</p>
                <div className="flex flex-wrap gap-2 text-xs text-muted">
                  {project.tech.map((stack) => (
                    <span key={stack} className="rounded-full border border-white/10 px-3 py-1">
                      {stack}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative z-10 mt-6 flex flex-wrap gap-3 text-sm font-semibold">
                {isLive ? (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      openPreview()
                    }}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-white transition hover:border-white/40"
                  >
                    <PlayCircle className="h-4 w-4" />
                    Preview live
                  </button>
                ) : (
                  <a
                    href="#contact"
                    onClick={(event) => event.stopPropagation()}
                    className="inline-flex items-center gap-2 text-primary transition hover:text-white"
                  >
                    Discuss opportunity
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-neon/10 opacity-0 transition group-hover:opacity-100" />
              </article>
            )
          })}
        </div>
      </div>

      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10">
          <div className="glass-panel relative w-full max-w-5xl rounded-[2.5rem] border border-white/10 bg-[#050915]/95 p-6 shadow-panel">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-muted">Live preview</p>
                <p className="text-2xl font-semibold text-white">{preview.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setPreview(null)}
                className="rounded-full border border-white/10 p-2 text-white transition hover:border-white/40"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="relative h-[70vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
              <iframe
                src={preview.link}
                title={`${preview.title} live preview`}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
