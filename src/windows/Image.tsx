import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'

interface ImageFileData {
    name: string
    imageUrl: string
}

const Image = () => {
    const { windows } = useWindowStore()
    const data = windows.imgfile.data as ImageFileData | null

    if (!data) return null

    return (
        <>
            <div id="window-header">
                <WindowControls target='imgfile' />
                <h3>{data.name}</h3>
            </div>

            <div className='bg-white p-6 overflow-auto h-full flex items-center justify-center'>
                <img
                    src={data.imageUrl}
                    alt={data.name}
                    className='max-w-full max-h-full object-contain'
                />
            </div>
        </>
    )
}

const ImageWindow = WindowWrapper(Image, 'imgfile')
export default ImageWindow
