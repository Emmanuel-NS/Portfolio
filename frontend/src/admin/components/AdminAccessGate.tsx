import { useState, type FormEvent } from 'react'
import { ShieldCheck } from 'lucide-react'
import { AdminApiError } from '../api'
import { useAdminAuth } from '../context/AdminAuthContext'

export function AdminAccessGate() {
  const { twoFactorEnabled, statusLoading, login } = useAdminAuth()
  const [passcode, setPasscode] = useState('')
  const [totpCode, setTotpCode] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [needsTwoFactor, setNeedsTwoFactor] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await login({ passcode, totpCode: needsTwoFactor ? totpCode : undefined })
      setPasscode('')
      setTotpCode('')
      setNeedsTwoFactor(false)
    } catch (err) {
      if (err instanceof AdminApiError && err.status === 400 && err.message.includes('Authenticator code required')) {
        setNeedsTwoFactor(true)
        setError('Enter the 6-digit code from your authenticator app to finish signing in.')
      } else {
        setError(err instanceof Error ? err.message : 'Unable to verify admin access')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const disableSubmit = submitting || !passcode || (needsTwoFactor && !totpCode)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#030617]/80 p-8 shadow-2xl">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-indigo-500/20 p-3">
            <ShieldCheck className="h-6 w-6 text-indigo-300" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Admin security</p>
            <h1 className="text-xl font-semibold">Enter passcode to continue</h1>
          </div>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="passcode" className="text-sm font-semibold text-white/80">
              Passcode
            </label>
            <input
              id="passcode"
              type="password"
              value={passcode}
              onChange={(event) => setPasscode(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
              placeholder={statusLoading ? 'Loading requirements…' : 'Enter admin passcode'}
              disabled={submitting || statusLoading}
              required
            />
          </div>
          {needsTwoFactor && (
            <div>
              <label htmlFor="totpCode" className="text-sm font-semibold text-white/80">
                Authenticator code
              </label>
              <input
                id="totpCode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={totpCode}
                onChange={(event) => setTotpCode(event.target.value)}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
                placeholder="6-digit code"
                disabled={submitting}
                required
              />
              <p className="mt-1 text-xs text-white/50">Use Authy or Google Authenticator with the configured secret.</p>
            </div>
          )}
          {error && <p className="text-sm text-rose-300">{error}</p>}
          <button
            type="submit"
            disabled={disableSubmit}
            className="w-full rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-white/10"
          >
            {submitting ? 'Verifying…' : needsTwoFactor ? 'Verify 6-digit code' : 'Continue'}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-white/50">
          Two-factor is {twoFactorEnabled ? 'enabled' : 'disabled'} for this workspace. You’ll be asked for a code only after the passcode succeeds.
        </p>
      </div>
    </div>
  )
}
