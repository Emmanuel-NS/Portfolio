const TOKEN_STORAGE_KEY = 'portfolio-admin-token'
export const ADMIN_SESSION_EXPIRED_EVENT = 'portfolio:admin-session-expired'

const isBrowser = typeof window !== 'undefined'

export function getAdminToken() {
  if (!isBrowser) return null
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function storeAdminToken(token: string) {
  if (!isBrowser) return
  window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
}

export function clearAdminToken() {
  if (!isBrowser) return
  window.localStorage.removeItem(TOKEN_STORAGE_KEY)
}

export function notifyAdminSessionExpired() {
  if (!isBrowser) return
  window.dispatchEvent(new Event(ADMIN_SESSION_EXPIRED_EVENT))
}
