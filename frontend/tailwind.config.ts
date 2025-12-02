import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        background: '#050915',
        foreground: '#f8fafc',
        muted: '#94a3b8',
        primary: {
          DEFAULT: '#7c3aed',
          light: '#a855f7',
          dark: '#5b21b6',
        },
        accent: {
          DEFAULT: '#f97316',
          light: '#fb923c',
          dark: '#c2410c',
        },
        panel: 'rgba(15,23,42,0.85)',
        neon: '#22d3ee',
      },
      backgroundImage: {
        'grid-glow':
          'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        'hero-glow':
          'radial-gradient(circle at 20% 20%, rgba(124,58,237,0.35), transparent 45%), radial-gradient(circle at 80% 0%, rgba(249,115,22,0.3), transparent 40%)',
        aurora:
          'radial-gradient(circle at 20% 20%, rgba(34,211,238,0.25), transparent 40%), radial-gradient(circle at 80% 0%, rgba(248,113,113,0.15), transparent 45%)',
        'diagonal-glow':
          'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(34,211,238,0) 60%), linear-gradient(315deg, rgba(249,115,22,0.15) 0%, rgba(124,58,237,0) 70%)',
      },
      boxShadow: {
        glow: '0 25px 50px -12px rgba(124,58,237,0.35)',
        panel: '0 20px 45px -20px rgba(15,23,42,0.7)',
        ring: '0 0 30px rgba(34,211,238,0.4)',
        card: '0 35px 120px -45px rgba(15,23,42,0.9)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
      },
      screens: {
        '3xl': '1600px',
      },
    },
  },
  plugins: [],
}

export default config
