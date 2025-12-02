import { useEffect, useState, type CSSProperties } from 'react'

export function ScrollMeter() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      const total = Math.max(scrollHeight - clientHeight, 1)
      const next = Math.min(100, Math.max(0, (scrollTop / total) * 100))
      setProgress(next)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const arcStyle: CSSProperties = {
    background: `conic-gradient(#22d3ee ${progress}%, rgba(255,255,255,0.08) ${progress}% 100%)`,
  }

  return (
    <>
      <div className="pointer-events-none fixed bottom-6 right-6 z-40 hidden flex-col items-center gap-3 rounded-full border border-white/10 bg-[#050915]/80 p-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-muted shadow-panel sm:flex">
        <span className="text-white/70">Progress</span>
        <div className="relative h-20 w-20" aria-label={`Scroll progress ${progress.toFixed(0)} percent`}>
          <div className="absolute inset-0 rounded-full border border-white/5" style={arcStyle} />
          <div className="absolute inset-2 flex flex-col items-center justify-center rounded-full bg-[#050915]/90">
            <span className="text-lg font-semibold text-white">{progress.toFixed(0)}%</span>
            <span className="text-[8px] tracking-[0.3em] text-white/50">100%</span>
          </div>
        </div>
        <span className="text-[8px] tracking-[0.4em] text-white/60">0 → 100</span>
      </div>

      <div className="pointer-events-none fixed bottom-4 right-4 z-40 flex items-center justify-center rounded-full border border-white/10 bg-[#050915]/90 p-2 shadow-panel sm:hidden">
        <div className="relative h-12 w-12" aria-label={`Scroll progress ${progress.toFixed(0)} percent`}>
          <div className="absolute inset-0 rounded-full border border-white/10" style={arcStyle} />
          <div className="absolute inset-[6px] flex items-center justify-center rounded-full bg-[#050915]">
            <span className="text-xs font-semibold text-white">{progress.toFixed(0)}%</span>
          </div>
        </div>
      </div>
    </>
  )
}
