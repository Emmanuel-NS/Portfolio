import { motion } from 'framer-motion'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import type { HeroContent, HeroHighlight, HeroSpotlight } from '../data/content'

const profileImageSrc = '/profile.PNG'

type HeroProps = {
  heroContent: HeroContent
  heroHighlights: HeroHighlight[]
  heroSpotlights: HeroSpotlight[]
}

export function Hero({ heroContent, heroHighlights, heroSpotlights }: HeroProps) {
  return (
    <section id="hero" className="relative isolate overflow-hidden bg-transparent px-4 pb-20 pt-16 sm:pb-24 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-aurora opacity-70" />
      <div className="pointer-events-none absolute inset-0 bg-grid-glow opacity-20" />
      <div className="mx-auto flex max-w-6xl flex-col-reverse gap-12 lg:flex-row lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 w-full max-w-xl self-center lg:flex-1"
        >
          <div className="spotlight-card grid gap-5 rounded-[2rem] bg-[#070b1d]/80 p-5 shadow-2xl backdrop-blur-[40px] sm:p-7 lg:p-8">
            <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-1 sm:h-60 sm:w-60">
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#030617]">
                <div className="absolute inset-0 rounded-full bg-gradient-to-b from-indigo-400/25 via-transparent to-transparent" />
                <img
                  src={profileImageSrc}
                  alt="Emmanuel Nsabagasanis portrait"
                  className="relative z-10 h-full w-full rounded-full object-cover"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 rounded-full border border-white/20" />
              </div>
              <div className="pointer-events-none absolute inset-0 rounded-full border border-white/5" />
              <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-[#050915]/35 via-transparent to-transparent" />
            </div>
            <div className="relative space-y-4 text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.4em] text-muted">Currently</p>
              <h2 className="text-2xl font-semibold text-white">
                Forward Edge alum and ALU Software Engineering student supporting security-focused teams.
              </h2>
              <p className="text-sm text-muted">
                I combine platform builds, cyber risk reviews, and ICT teaching so collaborators get one reliable, hands-on partner.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {heroSpotlights.map((spotlight) => (
                <div key={spotlight.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                  <p className="text-xs uppercase tracking-[0.3em] text-muted">{spotlight.title}</p>
                  <p className="mt-2 text-xl font-semibold text-white">{spotlight.stat}</p>
                  <p className="text-xs text-muted/80">{spotlight.descriptor}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 space-y-8 lg:flex-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80">
            <Sparkles className="h-3 w-3 text-neon" />
            {heroContent.title}
          </div>
          <div className="space-y-4">
            <h1 className="text-balance text-4xl font-semibold text-white sm:text-6xl lg:text-7xl">
              {heroContent.name}
            </h1>
            <p className="text-lg text-muted sm:text-xl">{heroContent.summary}</p>
            <p className="text-sm text-muted/80">
              This page brings together the client work, teaching, and security projects I am actively running.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <a href={heroContent.primaryCta.href} className="button-glow text-center text-sm uppercase tracking-[0.2em]">
              {heroContent.primaryCta.label}
            </a>
            <a
              href={heroContent.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
            >
              {heroContent.secondaryCta.label}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {heroHighlights.map((item) => (
              <div key={item.label} className="glass-panel border-white/5 p-5">
                <p className="text-xs uppercase tracking-[0.4em] text-muted">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
