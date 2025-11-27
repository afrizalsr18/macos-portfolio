import dayjs from 'dayjs'
import { useState } from 'react'
import { navIcons, navLinks } from '#constants'
import useWindowStore from '#store/window'
import type { WindowKey } from '#store/window'
// import Calendar from './Calendar'

interface NavbarProps {
  darkMode: {
    theme: 'light' | 'dark' | 'system';
    toggleDarkMode: () => void;
    setLightMode: () => void;
    setDarkMode: () => void;
    setSystemMode: () => void;
    isDark: boolean;
  }
}

const Navbar = ({ darkMode }: NavbarProps) => {
  const { openWindow } = useWindowStore()
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const getDarkModeIcon = () => {
    if (darkMode.theme === 'dark') return '🌙';
    if (darkMode.theme === 'light') return '☀️';
    return '💻';
  };

  return (
    <nav>
      {/* left side navbar */}
      <div>
        <ul>
          <p className='font-bold'>Zal's Portfolio</p>
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type as WindowKey)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>
      {/* right side navbar */}
      <div>
        <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img src={img} alt={`icon-${id}`} className='icon-hover' />
            </li>
          ))}
          <li onClick={darkMode.toggleDarkMode} className="cursor-pointer" title={`Theme: ${darkMode.theme}`}>
            <span className='icon text-xl'>{getDarkModeIcon()}</span>
          </li>
        </ul>
        <time
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="cursor-pointer"
        >
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>

      {/* Calendar popup */}
      {/* <Calendar
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
      /> */}
    </nav>
  )
}

export default Navbar