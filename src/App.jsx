import SideBar from './components/SideBar.jsx'
import Myinfo from './components/Myinfo.jsx'
import MyProjects from './components/MyProjects.jsx'
import TechStack from './components/TechStack.jsx'
import Education from './components/Education.jsx'
import WorkExperience from './components/WorkExperience.jsx'
import Contact from './components/Contact.jsx'
import { PortfolioProvider } from './context/PortfolioContext'
import './App.css'

export default function App() {
  return (
    <PortfolioProvider>
      <div className="flex bg-gray-700 min-h-screen">
        <SideBar />

        <main className="flex-1 h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory">
          <section id="portfolio" className="h-screen flex items-center p-6 md:p-12 snap-start">
            <Myinfo />
          </section>

          <section id="projects" className="h-screen p-6 md:p-12 snap-start">
            <MyProjects />
          </section>

          <section id="tech-stack" className="h-screen p-6 md:p-12 snap-start">
            <TechStack />
          </section>

          <section id="education" className="h-screen p-6 md:p-12 text-white snap-start">
            <Education />
          </section>

          <section id="work-experience" className="h-screen p-6 md:p-12 text-white snap-start">
            <WorkExperience />
          </section>

          <section id="contact" className="h-screen p-6 md:p-12 text-white snap-start overflow-y-auto">
            <Contact />
          </section>
        </main>
      </div>
    </PortfolioProvider>
  )
}

