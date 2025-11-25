import dayjs from 'dayjs'
import { navIcons, navLinks } from '#constants'
import useWindowStore from '#store/window'
import type { WindowKey } from '#store/window'


const Navbar = () => {
  const { openWindow } = useWindowStore()
  return (
    <nav>
      {/* left side navbar */}
      <div>
        <img src='../../public/images/logo.svg' />
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
        </ul>
        <time>{dayjs().format("ddd MMM D h:mm A")}</time>
      </div>
    </nav>
  )
}

export default Navbar