import React, {useState, useEffect} from 'react'
//dropzone이라는 라이브러리를 이용할 것이므로, npm i react-dropzone필요.
import Dropzone from 'react-dropzone';
//+아이콘을 사용하기 위해 임포트.
import { Icon } from 'antd'; 
// backend쪽으로 넘기기 위해 axios임포트
import axios from 'axios';

function FileUpload(props) {
    // console.log("fileupload에 넘긴 이미지", props.images);
    const [Images, setImages] = useState([]);

    useEffect(() => {
        if (props.images) {
            setImages(props.images)
        }
    }, [props.images])

    const dropHandler = (files) => {
        
        let formData = new FormData();
        const config = {
            // 어떤 데이터 타입인지 명시해서 보내줌으로써 에러 방지.
            header: { 'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])
        
        //서버에 image 정보 저장
        axios.post('/api/product/image', formData, config)
        .then(response => {
            if (response.data.success) {
                // console.log(response.data);
                //spread operator를 이용해서 모든 이미지들 경로를 저장.
                setImages([...Images, response.data.filePath]);
                //부모 컴포넌트에 이미지 정보들 전달
                props.refreshFunction([...Images, response.data.filePath]);
            } else {
                alert('파일을 서버에 저장하는 데 실패했습니다.')
            }
        })
    }

    const deleteHandler = (image) => {
        //이미지 배열에서 삭제할 이미지의 인덱스를 가져오기.
        const currentIndex = Images.indexOf(image);
        // console.log('curIndex', currentIndex);
        let newImages = [...Images];
        newImages.splice(currentIndex, 1);
        setImages(newImages);
        //이미지 정보에 변경이 있었으므로, 부모 컴포넌트의 정보도 업데이트.
        props.refreshFunction(newImages);
    }


    return (
        // 아래 양식은 https://www.npmjs.com/package/react-dropzone 참고.
        <div style={{ display: "flex", justifyContent: 'space-between'}}>
            <Dropzone onDrop={dropHandler}>
            {({getRootProps, getInputProps}) => (
                <section>
                <label>이미지 업로드</label>
                <div style={{width: 300, height: 240, border: '1px solid #9cd0f7', display: 'flex', alignItems: 'center', justifyContent: 'center'}} {...getRootProps()}>
                    <input {...getInputProps()} />
                    {/* antd의 플러스 아이콘 사용 */}
                    <Icon type="plus" style={{fontSize: '3rem', color: '#1981cf'}} />
                </div>
                </section>
            )}
            </Dropzone>
            <section>
            <label style={{display: 'inline'}}>이미지 미리보기</label>
            <div style={{display: 'flex', width: '320px', height: '240px', border: '1px solid #9cd0f7', overflowX: 'scroll'}}>
                {Images && Images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{minWidth: '300px', width: '300px', height: '240px'}}
                        src={`http://52.78.229.61:5000/${image}`} />
                    </div>
                ))}
            </div>
            </section>
        </div>
    )
}

export default FileUpload
