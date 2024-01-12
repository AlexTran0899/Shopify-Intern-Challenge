import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import style from './DropzoneFileUpload.module.css'

export default function DropzoneFileUpload({setFiles}) {
    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles)
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

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
