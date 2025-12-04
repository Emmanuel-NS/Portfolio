import type { ResourceKey } from './config'
import { clearAdminToken, getAdminToken, notifyAdminSessionExpired } from './session'

export type HeroContentPayload = {
  name: string
  title: string
  summary: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel: string
  secondaryCtaHref: string
}

export type HeroContent = HeroContentPayload & {
  id: number
  updatedAt?: string
}

export type SocialLabel = 'GITHUB' | 'LINKEDIN' | 'X'

export type SocialLink = {
  id?: number
  label: SocialLabel
  href: string
  sortOrder?: number
}

export type ContactInfoPayload = {
  name: string
  tagline: string
  summary: string
  email: string
  whatsappNumber: string
  whatsappLink: string
  whatsappAvailability: string
  socials: SocialLink[]
}

export type ContactInfo = ContactInfoPayload & {
  id: number
  updatedAt?: string
}

export type AuthStatus = {
  twoFactorEnabled: boolean
}

export type LoginPayload = {
  passcode: string
  totpCode?: string
}

export type LoginResponse = AuthStatus & {
  token: string
}

export type UpdateSecurityPayload = {
  currentPasscode: string
  newPasscode?: string
  totpCode?: string
  twoFactorEnabled?: boolean
}

export type TotpProvision = AuthStatus & {
  secret: string
  otpauthUrl: string
  label: string
  issuer: string
}

const apiBase = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')
const adminBase = apiBase ? `${apiBase}/api/admin` : '/api/admin'

type AdminFetchOptions = RequestInit & {
  skipAuth?: boolean
}

export class AdminApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    if (response.status === 401) {
      clearAdminToken()
      notifyAdminSessionExpired()
    }
    const errorBody = await response.json().catch(() => ({}))
    const message = (errorBody && typeof errorBody === 'object' && 'message' in errorBody && typeof errorBody.message === 'string'
      ? errorBody.message
      : undefined) ?? response.statusText
    throw new AdminApiError(message, response.status)
  }
  if (response.status === 204) {
    return undefined as T
  }
  return (await response.json()) as T
}

function adminFetch<T>(path: string, options: AdminFetchOptions = {}) {
  const url = `${adminBase}${path}`
  const { skipAuth, headers, ...rest } = options
  const finalHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  if (headers) {
    if (headers instanceof Headers) {
      headers.forEach((value, key) => {
        finalHeaders[key] = value
      })
    } else if (Array.isArray(headers)) {
      headers.forEach(([key, value]) => {
        finalHeaders[key] = value
      })
    } else {
      Object.assign(finalHeaders, headers)
    }
  }

  if (!skipAuth) {
    const token = getAdminToken()
    if (token) {
      finalHeaders.Authorization = `Bearer ${token}`
    }
  }

  return fetch(url, {
    headers: finalHeaders,
    ...rest,
  }).then((res) => handleResponse<T>(res))
}

export const adminApi = {
  getAuthStatus: () => adminFetch<AuthStatus>('/auth/status', { skipAuth: true }),
  login: (payload: LoginPayload) => adminFetch<LoginResponse>('/auth/login', { method: 'POST', body: JSON.stringify(payload), skipAuth: true }),
  getSecuritySettings: () => adminFetch<AuthStatus>('/auth/settings'),
  updateSecuritySettings: (payload: UpdateSecurityPayload) =>
    adminFetch<AuthStatus>('/auth/settings', { method: 'PUT', body: JSON.stringify(payload) }),
  provisionTotp: (payload: { currentPasscode: string }) =>
    adminFetch<TotpProvision>('/auth/totp/provision', { method: 'POST', body: JSON.stringify(payload) }),
  rotateTotp: (payload: { currentPasscode: string }) =>
    adminFetch<TotpProvision>('/auth/totp/rotate', { method: 'POST', body: JSON.stringify(payload) }),
  getHero: () => adminFetch<HeroContent | null>('/hero'),
  updateHero: (payload: HeroContentPayload) => adminFetch<HeroContent>('/hero', { method: 'PUT', body: JSON.stringify(payload) }),
  getContact: () => adminFetch<ContactInfo | null>('/contact'),
  updateContact: (payload: ContactInfoPayload) =>
    adminFetch<ContactInfo>('/contact', { method: 'PUT', body: JSON.stringify(payload) }),
  listCollection: (resource: ResourceKey) => adminFetch<unknown[]>(`/${resource}`),
  createCollectionItem: (resource: ResourceKey, payload: Record<string, unknown>) =>
    adminFetch<unknown>(`/${resource}`, { method: 'POST', body: JSON.stringify(payload) }),
  updateCollectionItem: (resource: ResourceKey, id: number, payload: Record<string, unknown>) =>
    adminFetch<unknown>(`/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteCollectionItem: (resource: ResourceKey, id: number) =>
    adminFetch<void>(`/${resource}/${id}`, { method: 'DELETE' }),
}
