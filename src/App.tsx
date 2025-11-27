import { Navbar, Dock } from '#components';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import { Terminal, Browser, Resume, Finder, BugSquasher, Text, Image, Contact } from '#windows';
import { useDarkMode } from './hooks/useDarkMode';

gsap.registerPlugin(Draggable)

export const App = () => {
  const darkMode = useDarkMode();

  return (
    <main>
      <Navbar darkMode={darkMode} />
      {/* <Welcome /> */}
      <Dock />
      {/* <Home /> */}
      <Terminal />
      <Browser />
      <Resume />
      <Finder />
      <BugSquasher />
      <Text />
      <Image />
      <Contact />

    </main>
  )
}
