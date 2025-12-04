import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { About } from './components/About'
import { Achievements } from './components/Achievements'
import { Skills } from './components/Skills'
import { Consulting } from './components/Consulting'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { ScrollMeter } from './components/ScrollMeter'
import { usePortfolioContent } from './hooks/usePortfolioContent'

function App() {
  const { content, loading, error } = usePortfolioContent()

  return (
    <div className="min-h-screen bg-background text-white">
      <div className="absolute inset-0 -z-10 bg-grid-glow opacity-40" aria-hidden />
      <Header contactInfo={content.contact} />
      {(loading || error) && (
        <div
          className="border-b border-white/5 bg-[#050915]/80 px-4 py-2 text-center text-xs uppercase tracking-[0.3em] text-muted"
          aria-live="polite"
        >
          {loading ? 'Syncing live portfolio data…' : 'Unable to sync live data. Showing cached content.'}
        </div>
      )}
      <main>
        <Hero
          heroContent={content.hero}
          heroHighlights={content.heroHighlights}
          heroSpotlights={content.heroSpotlights}
        />
        <Projects projects={content.projects} />
        <Achievements achievements={content.achievements} />
        <About education={content.education} experience={content.experience} />
        <Skills skillGroups={content.skillGroups} />
        <Consulting consultingProjects={content.consultingProjects} />
        <Contact contactInfo={content.contact} />
      </main>
      <Footer />
      <ScrollMeter />
    </div>
  )
}

export default App
