import './App.css'
import './index.css'
import Writer from './components/Writer'
import Navbar from './components/Navbar'
import Gemini from './components/Gemini'
import Menu from './components/Menu'
import { useState } from 'react'

function App() {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='h-dvh w-dvw relative'>
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Menu isMenuOpen={isMenuOpen} />
      <Writer />
      <Gemini />
    </div>
  )
}

export default App
