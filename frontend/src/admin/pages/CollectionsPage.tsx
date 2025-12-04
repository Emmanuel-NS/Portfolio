import { Link } from 'react-router-dom'
import { orderedResources, resourceConfigs } from '../config'

export function CollectionsPage() {
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Collections</p>
        <h2 className="text-2xl font-semibold text-white">Content building blocks</h2>
        <p className="text-sm text-white/60">Pick a collection to edit, reorder, or add entries.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {orderedResources.map((key) => {
          const config = resourceConfigs[key]
          return (
            <Link
              key={key}
              to={`/admin/collections/${key}`}
              className={`rounded-3xl border border-white/5 bg-gradient-to-br ${config.accent} p-5 transition hover:border-white/30`}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">{config.label}</p>
              <p className="mt-2 text-sm text-white/80">{config.description}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-white">
                Manage
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
