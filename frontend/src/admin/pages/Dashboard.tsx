import { useEffect, useState } from 'react'
import { adminApi, type ContactInfo, type HeroContent } from '../api'
import { orderedResources, resourceConfigs, type ResourceKey } from '../config'

const formatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

const createCountMap = () =>
  orderedResources.reduce((acc, key) => {
    acc[key] = 0
    return acc
  }, {} as Record<ResourceKey, number>)

export function Dashboard() {
  const [hero, setHero] = useState<HeroContent | null>(null)
  const [contact, setContact] = useState<ContactInfo | null>(null)
  const [counts, setCounts] = useState<Record<ResourceKey, number>>(() => createCountMap())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const heroPromise = adminApi.getHero().catch(() => null)
        const contactPromise = adminApi.getContact().catch(() => null)
        const collectionsPromise = Promise.all(
          orderedResources.map((key) =>
            adminApi.listCollection(key).then((items) => ({ key, items } as { key: ResourceKey; items: unknown[] })),
          ),
        )

        const [heroData, contactData, collections] = await Promise.all([heroPromise, contactPromise, collectionsPromise])

        if (heroData) setHero(heroData)
        if (contactData) setContact(contactData)

        const nextCounts = createCountMap()
        collections.forEach((entry) => {
          nextCounts[entry.key] = Array.isArray(entry.items) ? entry.items.length : 0
        })
        setCounts(nextCounts)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load overview')
      } finally {
        setLoading(false)
      }
    }

    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="space-y-8">
      {error && <p className="rounded-2xl bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p>}

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Hero</p>
          {hero ? (
            <>
              <h2 className="mt-2 text-2xl font-semibold text-white">{hero.name}</h2>
              <p className="text-sm text-white/70">{hero.title}</p>
              {hero.updatedAt && <p className="mt-4 text-xs text-white/40">Updated {formatter.format(new Date(hero.updatedAt))}</p>}
            </>
          ) : (
            <p className="mt-2 text-sm text-white/60">No hero content yet.</p>
          )}
        </div>
        <div className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-panel">
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">Contact</p>
          {contact ? (
            <>
              <h2 className="mt-2 text-2xl font-semibold text-white">{contact.email}</h2>
              <p className="text-sm text-white/70">WhatsApp {contact.whatsappNumber}</p>
              {contact.updatedAt && <p className="mt-4 text-xs text-white/40">Updated {formatter.format(new Date(contact.updatedAt))}</p>}
            </>
          ) : (
            <p className="mt-2 text-sm text-white/60">No contact info yet.</p>
          )}
        </div>
      </section>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Collections</p>
            <h2 className="text-xl font-semibold text-white">Live content inventory</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {orderedResources.map((key) => {
            const config = resourceConfigs[key]
            const count = counts[key]
            return (
              <div
                key={key}
                className={`rounded-3xl border border-white/5 bg-gradient-to-br ${config.accent} p-5`}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-white/60">{config.label}</p>
                <p className="mt-3 text-4xl font-semibold text-white">{loading ? '…' : count}</p>
                <p className="text-sm text-white/70">Entries live</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
