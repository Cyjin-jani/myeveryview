import React from 'react'
//dropzone이라는 라이브러리를 이용할 것이므로, npm i react-dropzone필요.
import Dropzone from 'react-dropzone';
//+아이콘을 사용하기 위해 임포트.
import { Icon } from 'antd'; 

function FileUpload() {
    return (
        <div style={{ display: "flex", justifyContent: 'space-between'}}>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div style={{width: 300, height: 240, border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <Icon type="plus" style={{fontSize: '3rem'}} />
                </div>
                </section>
            )}
            </Dropzone>
        </div>
    )
}

export default FileUpload
