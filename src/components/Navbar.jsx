import React, { useRef, useState, useEffect } from 'react';
import { MoonIcon, SunIcon, Bars2Icon } from '@heroicons/react/24/outline';
import { VscGithub } from "react-icons/vsc";
import { motion } from 'motion/react';

export default function NavbarComponent({ isMenuOpen, setIsMenuOpen }) {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  };

  const [mode, setMode] = useState(localStorage.getItem('theme') || getInitialTheme());
  const themeBtn = useRef(null);

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.documentElement.setAttribute('data-theme', mode);

    if (mode === 'dark') {
      document.documentElement.classList.add('dark', 'theme-transition');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('theme-transition');
    }

    const timer = setTimeout(() => {
      document.documentElement.classList.remove('theme-transition');
    }, 700);

    return () => clearTimeout(timer);
  }, [mode]);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='flex items-center justify-between h-16 px-8'>
      <div className="left">
        <button className="btn" aria-label="Open menu">
          <Bars2Icon className={`h-6 w-6 transition-transform duration-500 ease-in-out ${isMenuOpen ? 'transform rotate-90' : ''}`} onClick={handleMenu}/>
        </button>
      </div>

      <div className="mid">
        <h1 className='tracking-tighter text-xl font-semibold'>Markdown</h1>
      </div>

      <div className="right flex items-center gap-6">
        <button className="btn" aria-label="Open GitHub">
          <VscGithub className='h-6 w-6 ' />
        </button>
        <button
          className="btn transition-transform duration-700 ease-in-out"
          onClick={toggleTheme}
          ref={themeBtn}
          title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
        >
          {mode === 'dark' ? (
            <MoonIcon className="h-6 w-6 transform scale-100 opacity-100 transition-all duration-700 ease-in-out" />
          ) : (
            <SunIcon className="h-6 w-6 transform scale-100 opacity-100 transition-all duration-700 ease-in-out" />
          )}
        </button>
      </div>
    </motion.nav>
  );
}
