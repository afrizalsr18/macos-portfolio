import dayjs from 'dayjs'
import { navIcons, navLinks } from '#constants'
import useWindowStore from '#store/window'
import type { WindowKey } from '#store/window'

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

  const getDarkModeIcon = () => {
    if (darkMode.theme === 'dark') return '🌙';
    if (darkMode.theme === 'light') return '☀️';
    return '💻';
  };

  return (
    <nav>
      {/* left side navbar */}
      <div>
        {/* <img src='../../public/images/logo.svg' /> */}
        <p className="font-bold">Zal's Portfolio</p>
        <ul>
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
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  )
}

export default Navbar