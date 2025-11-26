import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'

interface TextFileData {
    name: string
    image?: string
    subtitle?: string
    description: string[]
}

const Text = () => {
    const { windows } = useWindowStore()
    const data = windows.txtfile.data as TextFileData | null

    if (!data) return null

    return (
        <>
            <div id="window-header">
                <WindowControls target='txtfile' />
                <h3>{data.name}</h3>
            </div>

            <div className='bg-white p-6 overflow-auto h-full'>
                {data.image && (
                    <div className='mb-4'>
                        <img
                            src={data.image}
                            alt={data.name}
                            className='w-full max-w-md mx-auto rounded-lg'
                        />
                    </div>
                )}

                {data.subtitle && (
                    <h2 className='text-xl font-semibold mb-4 text-gray-800'>
                        {data.subtitle}
                    </h2>
                )}

                <div className='space-y-4'>
                    {data.description.map((paragraph, index) => (
                        <p key={index} className='text-gray-700 leading-relaxed'>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </>
    )
}

const TextWindow = WindowWrapper(Text, 'txtfile')
export default TextWindow
