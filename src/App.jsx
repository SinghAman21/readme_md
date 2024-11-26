import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import Writer from './components/Writer'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)
  const [mode, setMode] = useState('light'); // Whether dark mode is enabled or not


  const toggleMode = ()=>{
    if(mode === 'light'){
      setMode('black');
      document.body.style.backgroundColor = '#042743';
    }
    else{
      setMode('light');
      document.body.style.backgroundColor = 'white';
    }
  }
  return (
    <>
      <Navbar toggleMode={toggleMode} mode={mode}/>
      <Writer mode={mode}/>
    </>
  )
}

export default App
