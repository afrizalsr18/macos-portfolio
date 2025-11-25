import { Navbar, Welcome, Dock } from '#components';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import { Terminal, Browser, Resume } from '#windows';

gsap.registerPlugin(Draggable)

export const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
      <Browser />
      <Resume />
    </main>
  )
}
