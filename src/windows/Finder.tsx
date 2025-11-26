import { WindowControls } from '#components'
import { locations } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import useLocationStore from '#store/location'
import clsx from 'clsx'
import { Search, Wind } from 'lucide-react'
import React from 'react'

const Finder = () => {
    const { activeLocation, setActiveLocation } = useLocationStore()

    const renderList = (name, items) => (
        <div>
            <h3>{name}</h3>

            <ul>
                {items.map((item) => (
                    <li key={item.id}
                        onClick={() => setActiveLocation(item)}
                        className={clsx(item.id === activeLocation.id ? 'active' : 'not-active'

                        )}
                    >
                        <img
                            src={item.icon}
                            className='w-4'
                            alt={item.name}
                        />
                        <p
                            className='text-sm font-medium truncate'>
                            {item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <>
            <div id='window-header'>
                <WindowControls target='finder' />
                <Search className='icon' />
            </div>

            <div className='bg-white flex h-full'>
                <div className='sidebar'>
                    {renderList('Favorites', Object.values(locations))}
                    {renderList('Work', locations.work.children)}
                </div>
            </div>
        </>
    )
}

const FinderWindow = WindowWrapper(Finder, 'finder')
export default FinderWindow