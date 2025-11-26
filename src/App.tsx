import { Navbar, Welcome, Dock } from '#components';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import { Terminal, Browser, Resume, Finder, Space } from '#windows';
import { useDarkMode } from './hooks/useDarkMode';

gsap.registerPlugin(Draggable)

export const App = () => {
  const darkMode = useDarkMode();

  return (
    <main>
      <Navbar darkMode={darkMode} />
      {/* <Welcome /> */}
      <Dock />

      <Terminal />
      <Browser />
      <Resume />
      <Finder />
      <Space />
    </main>
  )
}
