import { useEffect, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { adminApi, type ContactInfoPayload, type SocialLabel, type SocialLink } from '../api'

type ContactForm = ContactInfoPayload

const socialOptions: { label: string; value: SocialLabel }[] = [
  { label: 'GitHub', value: 'GITHUB' },
  { label: 'LinkedIn', value: 'LINKEDIN' },
  { label: 'X / Twitter', value: 'X' },
]

const initialState: ContactForm = {
  name: '',
  tagline: '',
  summary: '',
  email: '',
  whatsappNumber: '',
  whatsappLink: '',
  whatsappAvailability: '',
  socials: [
    { label: 'GITHUB', href: '', sortOrder: 1 },
    { label: 'LINKEDIN', href: '', sortOrder: 2 },
    { label: 'X', href: '', sortOrder: 3 },
  ],
}

export function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialState)
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await adminApi.getContact()
        if (data) {
          const { id: _id, updatedAt: _updatedAt, ...rest } = data
          setForm({
            ...rest,
            socials: rest.socials.length > 0 ? rest.socials : initialState.socials,
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load contact info')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function updateSocial(index: number, key: keyof SocialLink, value: string | number) {
    setForm((prev) => {
      const socials = [...prev.socials]
      socials[index] = { ...socials[index], [key]: value }
      return { ...prev, socials }
    })
  }

  function addSocial() {
    setForm((prev) => ({
      ...prev,
      socials: [...prev.socials, { label: 'GITHUB', href: '', sortOrder: prev.socials.length + 1 }],
    }))
  }

  function removeSocial(index: number) {
    setForm((prev) => ({
      ...prev,
      socials: prev.socials.filter((_, i) => i !== index),
    }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...form,
      socials: form.socials.map((social, index) => ({
        ...social,
        sortOrder: social.sortOrder ?? index + 1,
      })),
    }

    try {
      setStatus('saving')
      await adminApi.updateContact(payload)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save contact info')
      setStatus('error')
    }
  }

  return (
    <section className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-panel">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Contact</p>
        <h2 className="text-2xl font-semibold text-white">Touchpoints + socials</h2>
      </div>
      {error && <p className="mb-4 rounded-2xl bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
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
          <label className="space-y-1 text-sm text-white/80">
            Tagline
            <input
              name="tagline"
              value={form.tagline}
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
              rows={3}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
              disabled={loading}
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm text-white/80">
            Email
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
              disabled={loading}
            />
          </label>
          <label className="space-y-1 text-sm text-white/80">
            WhatsApp number
            <input
              name="whatsappNumber"
              value={form.whatsappNumber}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
              disabled={loading}
            />
          </label>
          <label className="space-y-1 text-sm text-white/80">
            WhatsApp link
            <input
              name="whatsappLink"
              value={form.whatsappLink}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
              disabled={loading}
            />
          </label>
          <label className="space-y-1 text-sm text-white/80">
            Availability note
            <input
              name="whatsappAvailability"
              value={form.whatsappAvailability}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-white focus:border-white/40"
              disabled={loading}
            />
          </label>
        </div>

        <div>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Social links</p>
              <p className="text-xs text-white/50">Control order, label, and URLs</p>
            </div>
            <button
              type="button"
              onClick={addSocial}
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/80"
            >
              Add
            </button>
          </div>
          <div className="space-y-4">
            {form.socials.map((social, index) => (
              <div key={`${social.label}-${index}`} className="rounded-2xl border border-white/10 p-4">
                <div className="grid gap-3 md:grid-cols-[0.8fr_1.6fr_0.6fr]">
                  <label className="text-xs text-white/70">
                    Platform
                    <select
                      value={social.label}
                      onChange={(event) => updateSocial(index, 'label', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white"
                    >
                      {socialOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="text-xs text-white/70">
                    URL
                    <input
                      value={social.href}
                      onChange={(event) => updateSocial(index, 'href', event.target.value)}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white"
                    />
                  </label>
                  <label className="text-xs text-white/70">
                    Sort
                    <input
                      type="number"
                      value={social.sortOrder ?? index + 1}
                      onChange={(event) => updateSocial(index, 'sortOrder', Number(event.target.value))}
                      className="mt-1 w-full rounded-xl border border-white/10 bg-transparent px-3 py-2 text-sm text-white"
                    />
                  </label>
                </div>
                {form.socials.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSocial(index)}
                    className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-300"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={status === 'saving'}
            className="button-glow rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] disabled:opacity-60"
          >
            {status === 'saving' ? 'Saving…' : 'Save contact info'}
          </button>
          {status === 'success' && <span className="ml-4 text-sm text-emerald-300">Saved</span>}
        </div>
      </form>
    </section>
  )
}
