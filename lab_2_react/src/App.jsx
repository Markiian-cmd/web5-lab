import Header from './components/Header.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Footer from './components/Footer.jsx'

export default function App() {
  return (
    <>
      <Header name="Маркіян Задерецький" />
      <main>
        <Education />
        <Experience />
      </main>
      <Footer />
    </>
  )
}
