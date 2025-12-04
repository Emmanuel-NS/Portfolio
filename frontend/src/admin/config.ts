export type ResourceKey =
  | 'hero-highlights'
  | 'hero-spotlights'
  | 'education'
  | 'experience'
  | 'projects'
  | 'skill-groups'
  | 'achievements'
  | 'consulting'

export type CollectionFieldType = 'text' | 'textarea' | 'number' | 'select'

export type CollectionField = {
  key: string
  label: string
  type?: CollectionFieldType
  placeholder?: string
  helper?: string
  isArray?: boolean
  options?: { label: string; value: string }[]
}

export type ResourceConfig = {
  key: ResourceKey
  label: string
  description: string
  accent: string
  fields: CollectionField[]
}

const sharedSortField: CollectionField = {
  key: 'sortOrder',
  label: 'Sort order',
  type: 'number',
  helper: 'Controls ordering on the public site',
}

export const resourceConfigs: Record<ResourceKey, ResourceConfig> = {
  'hero-highlights': {
    key: 'hero-highlights',
    label: 'Hero highlights',
    description: 'Headline stats that sit under the hero copy.',
    accent: 'from-cyan-500/30 to-cyan-500/5',
    fields: [
      { key: 'label', label: 'Label' },
      { key: 'value', label: 'Value' },
      sharedSortField,
    ],
  },
  'hero-spotlights': {
    key: 'hero-spotlights',
    label: 'Hero spotlights',
    description: 'Cards on the right side of the hero section.',
    accent: 'from-fuchsia-500/30 to-fuchsia-500/5',
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'stat', label: 'Stat' },
      { key: 'descriptor', label: 'Descriptor', type: 'textarea' },
      sharedSortField,
    ],
  },
  education: {
    key: 'education',
    label: 'Education',
    description: 'Timeline cards for education history.',
    accent: 'from-indigo-500/30 to-indigo-500/5',
    fields: [
      { key: 'institution', label: 'Institution' },
      { key: 'credential', label: 'Credential' },
      { key: 'period', label: 'Period' },
      { key: 'description', label: 'Description', type: 'textarea' },
      sharedSortField,
    ],
  },
  experience: {
    key: 'experience',
    label: 'Experience',
    description: 'Roles surfaced in the About section.',
    accent: 'from-emerald-500/30 to-emerald-500/5',
    fields: [
      { key: 'role', label: 'Role' },
      { key: 'organization', label: 'Organization' },
      { key: 'period', label: 'Period' },
      { key: 'summary', label: 'Summary', type: 'textarea' },
      sharedSortField,
    ],
  },
  projects: {
    key: 'projects',
    label: 'Projects',
    description: 'Live preview cards on the projects grid.',
    accent: 'from-sky-500/30 to-sky-500/5',
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'description', label: 'Description', type: 'textarea' },
      { key: 'tech', label: 'Tech (comma separated)', helper: 'Example: React,Node.js,Tailwind', isArray: true },
      { key: 'link', label: 'Link', placeholder: 'https://example.com' },
      { key: 'impact', label: 'Impact statement', type: 'textarea' },
      sharedSortField,
    ],
  },
  'skill-groups': {
    key: 'skill-groups',
    label: 'Skill groups',
    description: 'Pill lists under the skills section.',
    accent: 'from-yellow-500/30 to-yellow-500/5',
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'items', label: 'Items (comma separated)', helper: 'Example: React,Security,Leadership', isArray: true },
      sharedSortField,
    ],
  },
  achievements: {
    key: 'achievements',
    label: 'Achievements',
    description: 'Proof section callouts.',
    accent: 'from-rose-500/30 to-rose-500/5',
    fields: [
      { key: 'title', label: 'Title' },
      { key: 'context', label: 'Context' },
      { key: 'detail', label: 'Detail', type: 'textarea' },
      sharedSortField,
    ],
  },
  consulting: {
    key: 'consulting',
    label: 'Consulting work',
    description: 'Log of consulting projects and their status.',
    accent: 'from-lime-500/30 to-lime-500/5',
    fields: [
      { key: 'client', label: 'Client' },
      { key: 'focus', label: 'Focus' },
      { key: 'description', label: 'Description', type: 'textarea' },
      {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
          { label: 'In progress', value: 'IN_PROGRESS' },
          { label: 'Delivered', value: 'DELIVERED' },
        ],
      },
      sharedSortField,
    ],
  },
}

export const orderedResources: ResourceKey[] = [
  'hero-highlights',
  'hero-spotlights',
  'education',
  'experience',
  'projects',
  'skill-groups',
  'achievements',
  'consulting',
]
