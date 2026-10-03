import Header from './components/Header.jsx'
import About from './components/About.jsx'
import Education from './components/Education.jsx'
import Experience from './components/Experience.jsx'
import Contacts from './components/Contacts.jsx'
import Footer from './components/Footer.jsx'
import { profile, projects } from './data/cv.js'

function App() {
  return (
    <>
      <Header name={profile.name} specialty={profile.specialty} city={profile.city} />
      <main>
        <About profile={profile} />
        <Education profile={profile} />
        <Experience projects={projects} />
        <Contacts github={profile.github} />
      </main>
      <Footer name={profile.name} group={profile.group} city={profile.city} />
    </>
  )
}

export default App
