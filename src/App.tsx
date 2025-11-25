import { Navbar, Welcome, Dock } from '#components';
import { Draggable } from 'gsap/Draggable';
import gsap from 'gsap';
import Terminal from '#windows/Terminal';

gsap.registerPlugin(Draggable)

export const App = () => {
  return (
    <main>
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  )
}
