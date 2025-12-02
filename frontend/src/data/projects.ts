export type Project = {
  title: string
  description: string
  tech: string[]
  cta: string
  repo?: string
  stats: string
  year: string
}

export const projects: Project[] = [
  {
    title: 'Cerebro AI Ops Platform',
    description:
      'Unified observability surface that stitches logs, traces, and infra signals together with AI copilots so teams ship resiliently.',
    tech: ['TypeScript', 'Next.js', 'tRPC', 'Postgres', 'Tailwind'],
    cta: 'https://github.com/Emmanuel-NS/cerebro',
    repo: 'https://github.com/Emmanuel-NS/cerebro',
    stats: '35% fewer incident escalations',
    year: '2025',
  },
  {
    title: 'Nova Payments SDK',
    description:
      'Drop-in SDK powering compliant, real-time payment orchestration across 42 countries with pluggable ledgers.',
    tech: ['React', 'Vite', 'Zustand', 'Stripe', 'Rust'],
    cta: 'https://github.com/Emmanuel-NS/nova-payments',
    repo: 'https://github.com/Emmanuel-NS/nova-payments',
    stats: 'USD 180M GMV processed',
    year: '2024',
  },
  {
    title: 'Pulse BI Canvas',
    description:
      'Composable BI canvas for ops teams to spin up live dashboards with streaming data sources and multiplayer annotations.',
    tech: ['React', 'D3', 'WebSockets', 'Node', 'AWS'],
    cta: 'https://github.com/Emmanuel-NS/pulse-bi',
    repo: 'https://github.com/Emmanuel-NS/pulse-bi',
    stats: '480ms slicer latency',
    year: '2023',
  },
]
