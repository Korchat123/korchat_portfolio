import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import SideBar from './components/SideBar.jsx'
import Myinfo from './components/Myinfo.jsx'
import MyProjects from './components/MyProjects.jsx'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className=" bg-gray-700 min-h-screen">
    <SideBar/>
    <Myinfo/>
    <MyProjects/>
    </div>
  )
}
