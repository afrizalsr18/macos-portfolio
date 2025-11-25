import type { FC } from 'react';
import useWindowStore from '#store/window'
import type { WindowKey } from '#store/window'

interface WindowControlsProps {
    target?: WindowKey | null;
}

const WindowControls: FC<WindowControlsProps> = ({ target }) => {
    const { closeWindow } = useWindowStore();

    return (
        <div id='window-controls'>
            <div className='close' onClick={() => closeWindow(target)} />
            <div className='minimize' />
            <div className='maximize' />
        </div>
    )
}

export default WindowControls