import { NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Overview', to: '/admin' },
  { label: 'Hero', to: '/admin/hero' },
  { label: 'Contact', to: '/admin/contact' },
  { label: 'Collections', to: '/admin/collections' },
  { label: 'Security', to: '/admin/security' },
]

export function AdminSidebar() {
  return (
    <aside className="hidden w-64 flex-col border-r border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/80 p-6 lg:flex">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.4em] text-indigo-300/80">Admin</p>
        <p className="mt-2 text-lg font-semibold text-white">Portfolio Control</p>
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) =>
              `block rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                isActive ? 'bg-white/10 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto pt-8">
        <a
          href="/"
          className="inline-flex w-full items-center justify-center rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40"
        >
          View public site
        </a>
      </div>
    </aside>
  )
}
