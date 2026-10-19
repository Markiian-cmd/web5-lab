import { useCallback, useEffect, useRef, useState } from 'react'
import Header from './components/Header.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'
import Reviews from './components/Reviews.jsx'
import ContactForm from './components/ContactForm.jsx'

function getThemeByTime() {
  const hour = new Date().getHours()
  return hour >= 7 && hour < 21 ? 'light' : 'dark'
}

export default function App() {
  const [theme, setTheme] = useState(getThemeByTime)
  const [isAutoTheme, setIsAutoTheme] = useState(true)
  const [isContactOpen, setIsContactOpen] = useState(false)
  const contactTimer = useRef(null)

  const openContact = useCallback(() => {
    window.clearTimeout(contactTimer.current)
    setIsContactOpen(true)
  }, [])

  const closeContact = useCallback(() => setIsContactOpen(false), [])

  useEffect(() => {
    contactTimer.current = window.setTimeout(openContact, 60000)
    return () => window.clearTimeout(contactTimer.current)
  }, [openContact])

  useEffect(() => {
    if (!isAutoTheme) return
    const updateTheme = () => setTheme(getThemeByTime())
    const updateVisiblePage = () => {
      if (!document.hidden) updateTheme()
    }
    updateTheme()
    const interval = window.setInterval(updateTheme, 60000)
    document.addEventListener('visibilitychange', updateVisiblePage)
    return () => {
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', updateVisiblePage)
    }
  }, [isAutoTheme])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
  }, [theme])

  function toggleTheme() {
    setIsAutoTheme(false)
    setTheme((current) => current === 'light' ? 'dark' : 'light')
  }

  function enableAutoTheme() {
    setIsAutoTheme(true)
    setTheme(getThemeByTime())
  }

  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-[#142b45] antialiased dark:bg-slate-950 dark:text-slate-100">
      <a
        href="#main-content"
        className="sr-only z-10 rounded-lg bg-white px-4 py-3 font-semibold focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:outline-2 focus:outline-offset-4 focus:outline-[#087f8c] dark:bg-slate-800"
      >
        Перейти до основного вмісту
      </a>
      <Header
        name="Маркіян Задерецький"
        theme={theme}
        isAutoTheme={isAutoTheme}
        onThemeToggle={toggleTheme}
        onAutoTheme={enableAutoTheme}
        onContactOpen={openContact}
      />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-6 px-5 py-8 outline-none sm:px-8 sm:py-10 min-[900px]:grid-cols-[0.85fr_1.4fr]"
      >
        <Education />
        <Experience />
        <Reviews />
      </main>
      <Footer onContactOpen={openContact} />
      <ContactForm isOpen={isContactOpen} onClose={closeContact} />
    </div>
  )
}
