import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import style from './DropzoneFileUpload.module.css'

export default function DropzoneFileUpload({setFiles}) {
    const alertUserOfRejectedFile = (rejectedFile) => {
        alert(`we're unable to upload these file, make sure that they are jpeg or png image file \n \n` + rejectedFile)
    }

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        if(rejectedFiles) {
            alertUserOfRejectedFile(rejectedFiles.map(file => file.file.name))
        }
        setFiles(acceptedFiles)
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg', '.jpg'],
        }
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            <div className={`${style.dropArea} ${isDragActive ? style.active : style.notActive}` }>
                <div className={style.dropAreaContent}>
                    {isDragActive &&  <h1>Yup, just drop it here</h1>}
                    {!isDragActive &&
                        <div>
                            <h1>Drag 'n' drop some files here</h1>
                            <p>Or click to here select files</p>
                        </div>}
                </div>
            </div>
        </div>
    )
}
