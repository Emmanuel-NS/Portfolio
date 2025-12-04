import type { LucideIcon } from 'lucide-react'
import { ArrowUpRight, Github, Linkedin, Mail, MessageCircle, PhoneCall, Twitter } from 'lucide-react'
import { SectionHeading } from './SectionHeading'
import type { ContactInfo } from '../data/content'

const iconMap: Record<'GitHub' | 'LinkedIn' | 'X', LucideIcon> = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: Twitter,
}

type ContactProps = {
  contactInfo: ContactInfo
}

export function Contact({ contactInfo }: ContactProps) {
  return (
    <section id="contact" className="px-4 pb-28 pt-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          description="Use email, WhatsApp, or social links for project work, security reviews, or teaching support."
        />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="spotlight-card rounded-[2rem] border border-white/10 p-10">
            <div className="relative z-10 space-y-5">
              <p className="text-sm uppercase tracking-[0.4em] text-muted">Primary channel</p>
              <h3 className="text-3xl font-semibold text-white">{contactInfo.name}</h3>
              <p className="text-sm text-muted">{contactInfo.tagline}</p>
              <p className="text-sm text-muted">{contactInfo.summary}</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                <Mail className="h-4 w-4" />
                {contactInfo.email}
              </a>
              <a
                href={contactInfo.whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/40"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp · {contactInfo.whatsapp.number}
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <p className="text-xs text-muted">{contactInfo.whatsapp.availability}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="glass-panel rounded-3xl border border-white/5 p-8">
              <div className="mb-4 flex items-center gap-3">
                <PhoneCall className="h-5 w-5 text-neon" />
                <p className="text-sm uppercase tracking-[0.4em] text-muted">Connect elsewhere</p>
              </div>
              <div className="flex flex-col gap-3">
                {contactInfo.socials.map((social) => {
                  const Icon = iconMap[social.label]
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40"
                    >
                      <span className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {social.label}
                      </span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            </div>
            <div className="glass-panel flex flex-col gap-3 rounded-3xl border border-white/5 px-6 py-5 text-sm text-muted md:flex-row md:items-center md:justify-between">
              <p>Available for software builds, cybersecurity support, ICT teaching, and consulting work.</p>
              <div className="flex flex-col gap-2 text-xs uppercase tracking-[0.4em] sm:flex-row">
                <a href={`mailto:${contactInfo.email}`} className="button-glow inline-flex items-center justify-center px-4 py-2">
                  Email
                </a>
                <a
                  href={contactInfo.whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="button-glow inline-flex items-center justify-center px-4 py-2"
                >
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
