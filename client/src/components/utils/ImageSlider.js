import React from 'react';
import {Carousel} from 'antd';


function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay style={{height: '150px'}}>       
            {props.images.map((image, index) => (
                <div key={index}>
                    <img style={{width: '100%', minHeight: '150px',  maxHeight: '150px'}} src={`http://3.35.24.201:5000/${image}`} />
                </div>
            ))}
            </Carousel>            
        </div>
    )
}

export default ImageSlider
