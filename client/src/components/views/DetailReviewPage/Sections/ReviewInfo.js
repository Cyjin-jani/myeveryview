import React, { useEffect } from 'react';
import { Descriptions } from 'antd';
import StarRatings from 'react-star-ratings';
import { categories } from '../../LandingPage/Sections/Datas';

function ReviewInfo(props) {
    // console.log(categories[6].name);
    let writerName = ""
    if (props.detail.writer) {
        writerName = props.detail.writer.name;
    }
    
    return (
        <div>
            <Descriptions title={`작성자: ${props.detail.writer ? writerName: ''}`} bordered size="small" layout='vertical' >
                <Descriptions.Item label="제품명">{props.detail.title}</Descriptions.Item>
                <Descriptions.Item label="카테고리">{props.detail.categories && categories[props.detail.categories-1].name}</Descriptions.Item>
                <Descriptions.Item label="경험 날짜">{props.detail.usedDate && props.detail.usedDate.slice(0, 10)}</Descriptions.Item>
                <Descriptions.Item label="가격">{props.detail.price}</Descriptions.Item>
                <Descriptions.Item label="재구매의사">{props.detail.rebuy == 1 ? 'YES' : 'NO'}</Descriptions.Item>
                <Descriptions.Item label="평점">
                    <StarRatings
                        rating={props.detail.stars}
                        starRatedColor="#ffff00"  //#fcdb03 
                        starEmptyColor="#669999"
                        numberOfStars={5}
                        name='rating'
                        starDimension="15px"
                        starSpacing="5px"
                        />
                </Descriptions.Item>
                <Descriptions.Item label="리뷰 내용">
                    {props.detail.reviewDescription}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ReviewInfo
