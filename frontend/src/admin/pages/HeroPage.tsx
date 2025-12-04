import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { adminApi, type HeroContentPayload } from '../api'

type HeroForm = HeroContentPayload

const initialState: HeroForm = {
  name: '',
  title: '',
  summary: '',
  primaryCtaLabel: '',
  primaryCtaHref: '#projects',
  secondaryCtaLabel: '',
  secondaryCtaHref: 'mailto:e.nsabagasa@alustudent.com',
}

export function HeroPage() {
  const [form, setForm] = useState<HeroForm>(initialState)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await adminApi.getHero()
        if (data) {
          const { id: _id, updatedAt: _updatedAt, ...rest } = data
          setForm((prev) => ({ ...prev, ...rest }))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load hero copy')
      } finally {
        setLoading(false)
      }
    }

    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    try {
      setStatus('saving')
      await adminApi.updateHero(form)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save hero copy')
      setStatus('error')
    }
  }

  return (
    <section className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-panel">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Hero section</p>
        <h2 className="text-2xl font-semibold text-white">Narrative + CTAs</h2>
      </div>
      {error && <p className="mb-4 rounded-2xl bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}
      <form className="grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="space-y-1 text-sm text-white/80">
          Name
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
            disabled={loading}
          />
        </label>
        <label className="space-y-1 text-sm text-white/80 md:col-span-2">
          Title line
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
            disabled={loading}
          />
        </label>
        <label className="space-y-1 text-sm text-white/80 md:col-span-2">
          Summary
          <textarea
            name="summary"
            value={form.summary}
            onChange={handleChange}
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
            disabled={loading}
          />
        </label>
        <label className="space-y-1 text-sm text-white/80">
          Primary CTA label
          <input
            name="primaryCtaLabel"
            value={form.primaryCtaLabel}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
            disabled={loading}
          />
        </label>
        <label className="space-y-1 text-sm text-white/80">
          Primary CTA href
          <input
            name="primaryCtaHref"
            value={form.primaryCtaHref}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
            disabled={loading}
          />
        </label>
        <label className="space-y-1 text-sm text-white/80">
          Secondary CTA label
          <input
            name="secondaryCtaLabel"
            value={form.secondaryCtaLabel}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
            disabled={loading}
          />
        </label>
        <label className="space-y-1 text-sm text-white/80">
          Secondary CTA href
          <input
            name="secondaryCtaHref"
            value={form.secondaryCtaHref}
            onChange={handleChange}
            className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
            disabled={loading}
          />
        </label>
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={status === 'saving'}
            className="button-glow rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] disabled:opacity-60"
          >
            {status === 'saving' ? 'Saving…' : 'Save hero copy'}
          </button>
          {status === 'success' && <span className="ml-4 text-sm text-emerald-300">Saved</span>}
        </div>
      </form>
    </section>
  )
}
