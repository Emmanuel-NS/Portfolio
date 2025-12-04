import { useEffect, useState, type FormEvent } from 'react'
import { Shield, ShieldAlert } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'
import { adminApi, type AuthStatus, type TotpProvision } from '../api'
import { useAdminAuth } from '../context/AdminAuthContext'

const defaultStatus: AuthStatus = { twoFactorEnabled: false }

export function SecurityPage() {
  const { refreshStatus } = useAdminAuth()
  const [settings, setSettings] = useState<AuthStatus>(defaultStatus)
  const [loading, setLoading] = useState(true)
  const [setupPasscode, setSetupPasscode] = useState('')
  const [setupDetails, setSetupDetails] = useState<TotpProvision | null>(null)
  const [setupLoading, setSetupLoading] = useState(false)
  const [enablePasscode, setEnablePasscode] = useState('')
  const [enableCode, setEnableCode] = useState('')
  const [enabling, setEnabling] = useState(false)
  const [disablePasscode, setDisablePasscode] = useState('')
  const [disabling, setDisabling] = useState(false)
  const [rotateCurrentPasscode, setRotateCurrentPasscode] = useState('')
  const [newPasscode, setNewPasscode] = useState('')
  const [rotatingPasscode, setRotatingPasscode] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const response = await adminApi.getSecuritySettings()
        setSettings(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load security preferences')
      } finally {
        setLoading(false)
      }
    }
    loadSettings()
  }, [])

  const applyStatusUpdate = (status: AuthStatus) => {
    setSettings(status)
  }

  const handleSetupRequest = async (mode: 'show' | 'rotate') => {
    if (!setupPasscode) {
      setError('Enter the current passcode to continue.')
      return
    }
    setSetupLoading(true)
    setMessage(null)
    setError(null)
    try {
      const response =
        mode === 'rotate'
          ? await adminApi.rotateTotp({ currentPasscode: setupPasscode })
          : await adminApi.provisionTotp({ currentPasscode: setupPasscode })
      setSetupDetails(response)
      applyStatusUpdate(response)
      if (mode === 'rotate') {
        setMessage('Authenticator secret rotated. Scan the new QR code and enable 2FA again.')
        await refreshStatus()
      } else {
        setMessage('Scan the QR code with Authy, Google Authenticator, or any TOTP app.')
      }
      setSetupPasscode('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load authenticator details')
    } finally {
      setSetupLoading(false)
    }
  }

  const handleEnableTwoFactor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setEnabling(true)
    setMessage(null)
    setError(null)
    try {
      const updated = await adminApi.updateSecuritySettings({
        currentPasscode: enablePasscode,
        totpCode: enableCode,
        twoFactorEnabled: true,
      })
      applyStatusUpdate(updated)
      await refreshStatus()
      setEnablePasscode('')
      setEnableCode('')
      setMessage('Two-factor authentication is enabled.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to enable two-factor authentication')
    } finally {
      setEnabling(false)
    }
  }

  const handleDisableTwoFactor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisabling(true)
    setMessage(null)
    setError(null)
    try {
      const updated = await adminApi.updateSecuritySettings({
        currentPasscode: disablePasscode,
        twoFactorEnabled: false,
      })
      applyStatusUpdate(updated)
      await refreshStatus()
      setDisablePasscode('')
      setMessage('Two-factor authentication is disabled.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to disable two-factor authentication')
    } finally {
      setDisabling(false)
    }
  }

  const handlePasscodeRotation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setRotatingPasscode(true)
    setMessage(null)
    setError(null)
    try {
      await adminApi.updateSecuritySettings({
        currentPasscode: rotateCurrentPasscode,
        newPasscode,
      })
      await refreshStatus()
      setRotateCurrentPasscode('')
      setNewPasscode('')
      setMessage('Admin passcode updated successfully.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to update passcode')
    } finally {
      setRotatingPasscode(false)
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <div className="mb-4 flex items-center gap-3">
          <div className={`rounded-2xl p-3 ${settings.twoFactorEnabled ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
            {settings.twoFactorEnabled ? (
              <Shield className="h-6 w-6 text-emerald-300" />
            ) : (
              <ShieldAlert className="h-6 w-6 text-amber-300" />
            )}
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Security</p>
            <h2 className="text-2xl font-semibold text-white">
              {settings.twoFactorEnabled ? 'Two-factor authentication is enabled' : 'Two-factor authentication is disabled'}
            </h2>
            <p className="text-sm text-white/60">
              Scan a QR code, confirm a 6-digit code, and you are done—no extra steps.
            </p>
          </div>
        </div>
        {loading && <p className="text-sm text-white/60">Loading current status…</p>}
        {message && <p className="text-sm text-emerald-300">{message}</p>}
        {error && <p className="text-sm text-rose-300">{error}</p>}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <form
            onSubmit={(event) => {
              event.preventDefault()
              handleSetupRequest('show')
            }}
            className="rounded-3xl border border-white/10 bg-[#050b20]/80 p-6"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Step 1 · Get your QR</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Reveal or regenerate the authenticator secret</h3>
            <p className="mt-2 text-sm text-white/60">
              Enter the current passcode to show the QR code from the server .env. Need a fresh seed? Generate a new QR and scan it
              again.
            </p>
            <label className="mt-4 block text-sm font-semibold text-white/80" htmlFor="setupPasscode">
              Current passcode
            </label>
            <input
              id="setupPasscode"
              type="password"
              value={setupPasscode}
              onChange={(event) => setSetupPasscode(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
              placeholder="Enter passcode"
              required
            />
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <button
                type="submit"
                disabled={setupLoading}
                className="rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:bg-white/10"
              >
                {setupLoading ? 'Loading…' : 'Show QR code'}
              </button>
              <button
                type="button"
                onClick={() => handleSetupRequest('rotate')}
                disabled={setupLoading || !setupPasscode}
                className="rounded-2xl border border-white/20 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:border-white/40 disabled:cursor-not-allowed"
              >
                {setupLoading ? 'Working…' : 'Generate new QR'}
              </button>
            </div>
            {setupDetails && (
              <div className="mt-6 grid gap-4 sm:grid-cols-[auto,1fr] sm:items-start">
                <div className="rounded-2xl bg-white p-3 text-slate-900">
                  <QRCodeSVG value={setupDetails.otpauthUrl} size={160} />
                </div>
                <div className="space-y-3 text-sm text-white/80">
                  <div>
                    <p className="font-semibold text-white">Secret</p>
                    <p className="break-all text-xs text-white/70">{setupDetails.secret}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">App label</p>
                    <p className="text-xs text-white/70">
                      {setupDetails.label} · {setupDetails.issuer}
                    </p>
                  </div>
                  <p className="text-xs text-white/60">
                    Scan the QR or paste the secret into Authy, Google Authenticator, 1Password, or any TOTP-compatible app.
                  </p>
                </div>
              </div>
            )}
          </form>

          <form onSubmit={handleEnableTwoFactor} className="rounded-3xl border border-white/10 bg-[#050b20]/80 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Step 2 · Confirm a code</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Turn on 2FA</h3>
            <p className="mt-2 text-sm text-white/60">
              After scanning, enter one fresh 6-digit code plus the passcode to enable the second factor.
            </p>
            <label className="mt-4 block text-sm font-semibold text-white/80" htmlFor="enablePasscode">
              Current passcode
            </label>
            <input
              id="enablePasscode"
              type="password"
              value={enablePasscode}
              onChange={(event) => setEnablePasscode(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
              placeholder="Passcode"
              required
            />
            <label className="mt-4 block text-sm font-semibold text-white/80" htmlFor="enableCode">
              6-digit authenticator code
            </label>
            <input
              id="enableCode"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={enableCode}
              onChange={(event) => setEnableCode(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
              placeholder="123456"
              required
            />
            <button
              type="submit"
              disabled={enabling}
              className="mt-6 w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-white/10"
            >
              {enabling ? 'Enabling…' : 'Enable 2FA'}
            </button>
          </form>

          <form onSubmit={handleDisableTwoFactor} className="rounded-3xl border border-white/10 bg-[#050b20]/80 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-white/40">Step 3 · Optional</p>
            <h3 className="mt-2 text-xl font-semibold text-white">Disable 2FA</h3>
            <p className="mt-2 text-sm text-white/60">
              Need to pause two-factor temporarily? Provide the passcode to turn it off. You can re-enable it anytime.
            </p>
            <label className="mt-4 block text-sm font-semibold text-white/80" htmlFor="disablePasscode">
              Current passcode
            </label>
            <input
              id="disablePasscode"
              type="password"
              value={disablePasscode}
              onChange={(event) => setDisablePasscode(event.target.value)}
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
              placeholder="Passcode"
              required
            />
            <button
              type="submit"
              disabled={disabling || !settings.twoFactorEnabled}
              className="mt-6 w-full rounded-2xl bg-rose-500/80 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:bg-white/10"
            >
              {disabling ? 'Disabling…' : 'Disable 2FA'}
            </button>
            {!settings.twoFactorEnabled && (
              <p className="mt-2 text-xs text-white/50">Enable 2FA first to unlock this action.</p>
            )}
          </form>
        </div>

        <form onSubmit={handlePasscodeRotation} className="rounded-3xl border border-white/10 bg-[#050b20]/80 p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-white/40">Optional · Passcode rotation</p>
          <h3 className="mt-2 text-xl font-semibold text-white">Update the dashboard passcode</h3>
          <p className="mt-2 text-sm text-white/60">
            Change the passcode whenever you need. You’ll be signed out everywhere once the new value is saved.
          </p>
          <label className="mt-4 block text-sm font-semibold text-white/80" htmlFor="currentPasscode">
            Current passcode
          </label>
          <input
            id="currentPasscode"
            type="password"
            value={rotateCurrentPasscode}
            onChange={(event) => setRotateCurrentPasscode(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
            placeholder="Existing passcode"
            required
          />
          <label className="mt-4 block text-sm font-semibold text-white/80" htmlFor="newPasscode">
            New passcode
          </label>
          <input
            id="newPasscode"
            type="password"
            value={newPasscode}
            onChange={(event) => setNewPasscode(event.target.value)}
            className="mt-2 w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-indigo-400 focus:outline-none"
            placeholder="New secure passcode"
            required
            minLength={6}
          />
          <button
            type="submit"
            disabled={rotatingPasscode}
            className="mt-6 w-full rounded-2xl bg-emerald-500 px-4 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:bg-white/10"
          >
            {rotatingPasscode ? 'Updating…' : 'Update passcode'}
          </button>
        </form>
      </div>
    </div>
  )
}
