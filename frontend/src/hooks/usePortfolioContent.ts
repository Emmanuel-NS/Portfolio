import { useCallback, useEffect, useState } from 'react'
import {
  defaultPortfolioContent,
  type Achievement,
  type ConsultingProject,
  type ContactInfo,
  type EducationEntry,
  type ExperienceEntry,
  type HeroContent,
  type HeroHighlight,
  type HeroSpotlight,
  type PortfolioContentData,
  type Project,
  type SkillGroup,
} from '../data/content'

type ApiHeroContent = {
  name: string
  title: string
  summary: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

type ApiHeroHighlight = HeroHighlight & { id?: number; sortOrder?: number }
type ApiHeroSpotlight = HeroSpotlight & { id?: number; sortOrder?: number }
type ApiEducationEntry = EducationEntry & { id?: number; sortOrder?: number }
type ApiExperienceEntry = ExperienceEntry & { id?: number; sortOrder?: number }
type ApiProject = Project & { id?: number; sortOrder?: number }
type ApiSkillGroup = SkillGroup & { id?: number; sortOrder?: number }
type ApiAchievement = Achievement & { id?: number; sortOrder?: number }

type ApiConsultingStatus = 'DELIVERED' | 'IN_PROGRESS'

type ApiConsultingProject = Omit<ConsultingProject, 'status'> & {
  id?: number
  sortOrder?: number
  status?: ApiConsultingStatus | null
}

type ApiSocialLabel = 'GITHUB' | 'LINKEDIN' | 'X'

type ApiContactInfo = {
  name: string
  tagline: string
  summary: string
  email: string
  whatsappNumber: string
  whatsappLink: string
  whatsappAvailability: string
  socials: { id?: number; label: ApiSocialLabel; href: string; sortOrder?: number }[]
}

type ApiContentResponse = {
  hero: ApiHeroContent | null
  heroHighlights: ApiHeroHighlight[]
  heroSpotlights: ApiHeroSpotlight[]
  education: ApiEducationEntry[]
  experience: ApiExperienceEntry[]
  projects: ApiProject[]
  skillGroups: ApiSkillGroup[]
  achievements: ApiAchievement[]
  consultingProjects: ApiConsultingProject[]
  contact: ApiContactInfo | null
}

const apiBase = (import.meta.env.VITE_API_URL ?? '/api').replace(/\/$/, '')
const contentEndpoint = `${apiBase}/content`

const socialLabelMap: Record<ApiSocialLabel, ContactInfo['socials'][number]['label']> = {
  GITHUB: 'GitHub',
  LINKEDIN: 'LinkedIn',
  X: 'X',
}

const consultingStatusMap: Record<ApiConsultingStatus, ConsultingProject['status']> = {
  DELIVERED: 'Delivered',
  IN_PROGRESS: 'In Progress',
}

const normalizeHero = (hero: ApiHeroContent | null): HeroContent => {
  if (!hero) {
    return defaultPortfolioContent.hero
  }

  return {
    name: hero.name,
    title: hero.title,
    summary: hero.summary,
    primaryCta: {
      label: hero.primaryCtaLabel,
      href: hero.primaryCtaHref,
    },
    secondaryCta: {
      label: hero.secondaryCtaLabel,
      href: hero.secondaryCtaHref,
    },
  }
}

const normalizeContact = (contact: ApiContactInfo | null): ContactInfo => {
  if (!contact) {
    return defaultPortfolioContent.contact
  }

  return {
    name: contact.name,
    tagline: contact.tagline,
    summary: contact.summary,
    email: contact.email,
    whatsapp: {
      number: contact.whatsappNumber,
      href: contact.whatsappLink,
      availability: contact.whatsappAvailability,
    },
    socials: (contact.socials ?? []).map((social) => ({
      label: socialLabelMap[social.label],
      href: social.href,
    })),
  }
}

const normalizeConsultingProjects = (projects: ApiConsultingProject[]): ConsultingProject[] =>
  projects.map((project) => ({
    client: project.client,
    focus: project.focus,
    description: project.description,
    status: consultingStatusMap[project.status ?? 'IN_PROGRESS'],
  }))

const normalizeContent = (payload: ApiContentResponse): PortfolioContentData => ({
  hero: normalizeHero(payload.hero),
  heroHighlights: payload.heroHighlights.map(({ label, value }) => ({ label, value })),
  heroSpotlights: payload.heroSpotlights.map(({ title, stat, descriptor }) => ({ title, stat, descriptor })),
  education: payload.education.map(({ institution, credential, period, description }) => ({
    institution,
    credential,
    period,
    description,
  })),
  experience: payload.experience.map(({ organization, role, period, summary }) => ({
    organization,
    role,
    period,
    summary,
  })),
  projects: payload.projects.map(({ title, description, tech, link, impact }) => ({
    title,
    description,
    tech,
    link,
    impact,
  })),
  skillGroups: payload.skillGroups.map(({ title, items }) => ({ title, items })),
  achievements: payload.achievements.map(({ title, context, detail }) => ({
    title,
    context,
    detail,
  })),
  consultingProjects: normalizeConsultingProjects(payload.consultingProjects),
  contact: normalizeContact(payload.contact),
})

export function usePortfolioContent() {
  const [content, setContent] = useState<PortfolioContentData>(defaultPortfolioContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchContent = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true)
      try {
        const response = await fetch(contentEndpoint, { signal })
        if (!response.ok) {
          throw new Error(`Failed to load content (${response.status})`)
        }
        const payload: ApiContentResponse = await response.json()
        setContent(normalizeContent(payload))
        setError(null)
      } catch (err) {
        if (signal?.aborted) {
          return
        }
        const message = err instanceof Error ? err.message : 'Failed to fetch portfolio content'
        setError(message)
      } finally {
        if (!signal?.aborted) {
          setLoading(false)
        }
      }
    },
    [],
  )

  useEffect(() => {
    const controller = new AbortController()
    fetchContent(controller.signal)
    return () => controller.abort()
  }, [fetchContent])

  const refetch = useCallback(() => fetchContent(), [fetchContent])

  return { content, loading, error, refetch }
}
