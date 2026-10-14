import Header from './components/Header.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] font-sans text-[#142b45] antialiased">
      <a
        href="#main-content"
        className="sr-only z-10 rounded-lg bg-white px-4 py-3 font-semibold focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:outline-2 focus:outline-offset-4 focus:outline-[#087f8c]"
      >
        Перейти до основного вмісту
      </a>
      <Header name="Маркіян Задерецький" />
      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-6 px-5 py-8 outline-none sm:px-8 sm:py-10 min-[900px]:grid-cols-[0.85fr_1.4fr]"
      >
        <Education />
        <Experience />
      </main>
      <Footer />
    </div>
  )
}
