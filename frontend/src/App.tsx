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

function App() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="absolute inset-0 -z-10 bg-grid-glow opacity-40" aria-hidden />
      <Header />
      <main>
        <Hero />
        <Projects />
        <Achievements />
        <About />
        <Skills />
        <Consulting />
        <Contact />
      </main>
      <Footer />
      <ScrollMeter />
    </div>
  )
}

export default App
