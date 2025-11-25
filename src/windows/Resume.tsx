import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper'
import { Download } from 'lucide-react'
import { Document as PDFDocument, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
).toString();

const Resume = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target='resume' />
                <h3>Resume.pdf</h3>

                <a href="files/resume.pdf" download className='cursor-pointer' title='download resume'>
                    <Download className='icon' />
                </a>
            </div>
            <PDFDocument file="files/resume.pdf" >
                <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
            </PDFDocument>
        </>
    )
}

const ResumeWindow = WindowWrapper(Resume, 'resume')
export default ResumeWindow
