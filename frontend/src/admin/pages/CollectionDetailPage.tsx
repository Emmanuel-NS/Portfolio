import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { adminApi } from '../api'
import type { ResourceKey } from '../config'
import { resourceConfigs } from '../config'

type CollectionItem = Record<string, unknown> & { id: number }
type DraftItem = Record<string, unknown> & { id?: number }

type FormStatus = 'idle' | 'saving' | 'success' | 'error'

export function CollectionDetailPage() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const resource = slug as ResourceKey
  const config = resourceConfigs[resource]

  const [items, setItems] = useState<CollectionItem[]>([])
  const [selected, setSelected] = useState<DraftItem | null>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!config) {
      navigate('/admin/collections')
      return
    }

    async function load() {
      try {
        setLoading(true)
        const data = (await adminApi.listCollection(resource)) as CollectionItem[]
        setItems(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load collection')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [resource, navigate, config])

  const fields = useMemo(() => config?.fields ?? [], [config])

  function startCreate() {
    const defaults = fields.reduce<Record<string, unknown>>((acc, field) => {
      if (field.isArray) {
        acc[field.key] = ''
      } else if (field.type === 'number') {
        acc[field.key] = 0
      } else if (field.type === 'select' && field.options?.length) {
        acc[field.key] = field.options[0].value
      } else {
        acc[field.key] = ''
      }
      return acc
    }, { sortOrder: items.length + 1 })
    setSelected(defaults)
  }

  function editItem(item: CollectionItem) {
    setSelected(item)
  }

  function handleChange(key: string, value: string | number) {
    setSelected((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  async function handleSave() {
    if (!selected) return

    const payload: Record<string, unknown> = { ...selected }
    if ('id' in payload) {
      delete payload.id
    }

    fields.forEach((field) => {
      if (field.isArray && typeof payload[field.key] === 'string') {
        payload[field.key] = (payload[field.key] as string)
          .split(',')
          .map((entry) => entry.trim())
          .filter(Boolean)
      }
    })

    try {
      setStatus('saving')
      let nextSelection: CollectionItem
      if (selected.id) {
        const updated = (await adminApi.updateCollectionItem(resource, selected.id, payload)) as CollectionItem
        nextSelection = updated
        setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)))
      } else {
        const created = (await adminApi.createCollectionItem(resource, payload)) as CollectionItem
        nextSelection = created
        setItems((prev) => [...prev, created])
      }
      setSelected(nextSelection)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item')
      setStatus('error')
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm('Delete this item?')) return
    try {
      await adminApi.deleteCollectionItem(resource, id)
      setItems((prev) => prev.filter((item) => item.id !== id))
      setSelected((prev) => (prev?.id === id ? null : prev))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item')
    }
  }

  if (!config) {
    return null
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl border border-white/5 bg-white/5 p-5 shadow-panel">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">{config.label}</p>
            <p className="text-sm text-white/70">{config.description}</p>
          </div>
          <button
            type="button"
            onClick={startCreate}
            className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em]"
          >
            New
          </button>
        </div>
        {error && <p className="mb-4 rounded-2xl bg-rose-500/10 p-3 text-sm text-rose-200">{error}</p>}
        <div className="space-y-3">
          {loading ? (
            <p className="text-sm text-white/60">Loading…</p>
          ) : items.length === 0 ? (
            <p className="text-sm text-white/60">No items yet.</p>
          ) : (
            items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => editItem(item)}
                className={`w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm transition ${
                  selected?.id === item.id ? 'bg-white/10 text-white' : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <p className="font-semibold text-white">{String(item[fields[0]?.key] ?? `Item ${item.id}`)}</p>
                <p className="text-xs text-white/60">ID {item.id}</p>
              </button>
            ))
          )}
        </div>
      </div>
      <div className="rounded-3xl border border-white/5 bg-white/5 p-5 shadow-panel">
        {selected ? (
          <div className="space-y-4">
            {fields.map((field) => (
              <label key={field.key} className="w-full text-xs text-white/70">
                {field.label}
                {field.helper && <span className="ml-2 text-[10px] text-white/40">{field.helper}</span>}
                {field.type === 'textarea' ? (
                  <textarea
                    value={String(selected[field.key] ?? '')}
                    rows={4}
                    className="mt-1 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white"
                    onChange={(event) => handleChange(field.key, event.target.value)}
                  />
                ) : field.type === 'number' ? (
                  <input
                    type="number"
                    value={Number(selected[field.key] ?? 0)}
                    className="mt-1 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white"
                    onChange={(event) => handleChange(field.key, Number(event.target.value))}
                  />
                ) : field.type === 'select' && field.options ? (
                  <select
                    value={String(selected[field.key] ?? field.options[0]?.value ?? '')}
                    onChange={(event) => handleChange(field.key, event.target.value)}
                    className="mt-1 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white"
                  >
                    {field.options.map((option) => (
                      <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    value={
                      field.isArray && Array.isArray(selected[field.key])
                        ? (selected[field.key] as string[]).join(',')
                        : String(selected[field.key] ?? '')
                    }
                    className="mt-1 w-full rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-sm text-white"
                    onChange={(event) => handleChange(field.key, event.target.value)}
                  />
                )}
              </label>
            ))}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="button-glow rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em]"
                disabled={status === 'saving'}
              >
                {selected.id ? 'Update' : 'Create'}
              </button>
              {selected.id && (
                <button
                  type="button"
                  onClick={() => handleDelete(selected.id!)}
                  className="rounded-full border border-rose-400/40 px-6 py-3 text-sm font-semibold text-rose-200"
                >
                  Delete
                </button>
              )}
              {status === 'success' && <span className="text-sm text-emerald-300">Saved</span>}
            </div>
          </div>
        ) : (
          <p className="text-sm text-white/60">Select an item or create a new entry.</p>
        )}
      </div>
    </section>
  )
}
