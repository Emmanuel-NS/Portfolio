import { Link, useLocation } from 'react-router-dom'
import { useAdminAuth } from '../context/AdminAuthContext'

export function AdminHeader() {
  const location = useLocation()
  const { logout } = useAdminAuth()
  const pathname = location.pathname
  let title = 'Collections'
  if (pathname === '/admin') title = 'Overview'
  else if (pathname.startsWith('/admin/hero')) title = 'Hero content'
  else if (pathname.startsWith('/admin/contact')) title = 'Contact'
  else if (pathname.startsWith('/admin/collections')) title = 'Collections'
  else if (pathname.startsWith('/admin/security')) title = 'Security'

  return (
    <header className="flex flex-col gap-4 border-b border-white/5 bg-[#030617]/80 px-6 py-5 text-white lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/40">Admin workspace</p>
        <h1 className="text-2xl font-semibold text-white">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
        >
          Back to site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="button-glow rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em]"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}
