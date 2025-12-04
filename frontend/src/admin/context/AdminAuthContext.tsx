import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { adminApi, type AuthStatus, type LoginPayload } from '../api'
import {
  ADMIN_SESSION_EXPIRED_EVENT,
  clearAdminToken,
  getAdminToken,
  notifyAdminSessionExpired,
  storeAdminToken,
} from '../session'

const defaultStatus: AuthStatus = { twoFactorEnabled: false }

type AdminAuthContextValue = {
  isAuthenticated: boolean
  twoFactorEnabled: boolean
  statusLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => void
  refreshStatus: () => Promise<void>
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getAdminToken())
  const [status, setStatus] = useState<AuthStatus>(defaultStatus)
  const [statusLoading, setStatusLoading] = useState(true)

  const refreshStatus = useCallback(async () => {
    try {
      const nextStatus = await adminApi.getAuthStatus()
      setStatus(nextStatus)
    } catch (error) {
      console.error('Failed to load admin auth status', error)
    } finally {
      setStatusLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshStatus()
  }, [refreshStatus])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleExpiration = () => {
      clearAdminToken()
      setToken(null)
    }
    window.addEventListener(ADMIN_SESSION_EXPIRED_EVENT, handleExpiration)
    return () => window.removeEventListener(ADMIN_SESSION_EXPIRED_EVENT, handleExpiration)
  }, [])

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await adminApi.login(payload)
    storeAdminToken(response.token)
    setToken(response.token)
    setStatus({ twoFactorEnabled: response.twoFactorEnabled })
  }, [])

  const logout = useCallback(() => {
    clearAdminToken()
    setToken(null)
    notifyAdminSessionExpired()
  }, [])

  const value = useMemo<AdminAuthContextValue>(() => ({
    isAuthenticated: Boolean(token),
    twoFactorEnabled: status.twoFactorEnabled,
    statusLoading,
    login,
    logout,
    refreshStatus,
  }), [token, status.twoFactorEnabled, statusLoading, login, logout, refreshStatus])

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider')
  }
  return context
}
