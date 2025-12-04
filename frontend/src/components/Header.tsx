import { useState } from 'react'
import { Github, Linkedin, Menu, Twitter, X as CloseIcon } from 'lucide-react'
import type { ContactInfo } from '../data/content'

const navLinks = [
  { label: 'Projects', href: '#projects' },
  { label: 'Proof', href: '#achievements' },
  { label: 'Journey', href: '#about' },
  { label: 'Consulting', href: '#consulting' },
  { label: 'Contact', href: '#contact' },
]

const socialIconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  X: Twitter,
}

type HeaderProps = {
  contactInfo: ContactInfo
}

export function Header({ contactInfo }: HeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050915]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#hero" className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white">
          <span className="h-2 w-8 rounded-full bg-gradient-to-r from-primary to-accent" />
          Emmanuel NS
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {contactInfo.socials.map((social) => {
            const Icon = socialIconMap[social.label]
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 p-2 text-muted transition hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            )
          })}
          <a href={`mailto:${contactInfo.email}`} className="button-glow relative overflow-hidden rounded-full px-5 py-2 text-sm font-semibold">
            Email me
          </a>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full border border-white/10 p-2 text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <CloseIcon className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="space-y-4 border-t border-white/5 bg-[#050915]/95 px-4 py-6 md:hidden">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="block text-base font-semibold text-white">
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4">
            {contactInfo.socials.map((social) => {
              const Icon = socialIconMap[social.label]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/10 p-2 text-muted transition hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
