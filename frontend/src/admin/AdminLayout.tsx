import { Outlet } from 'react-router-dom'
import { AdminSidebar } from './components/AdminSidebar'
import { AdminHeader } from './components/AdminHeader'
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext'
import { AdminAccessGate } from './components/AdminAccessGate'

function AdminLayoutShell() {
  const { isAuthenticated } = useAdminAuth()

  if (!isAuthenticated) {
    return <AdminAccessGate />
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900 px-4 py-8 sm:px-8">
          <div className="mx-auto w-full max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export function AdminLayout() {
  return (
    <AdminAuthProvider>
      <AdminLayoutShell />
    </AdminAuthProvider>
  )
}
