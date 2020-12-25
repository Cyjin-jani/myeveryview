import React from 'react';
import "./UserCardBlock.css";
import {Button} from 'antd';

function UserCardBlock(props) {

    const renderImage = (images) => {
        if(images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () => (
        props.reviews && props.reviews.map((review, index) => (
            <tr key={index}>
                <td>
                    <a href={`/product/${review._id}`}>
                    <img style={{width: '70px', height: '70px'}} alt="review" src={renderImage(review.images)} />
                    </a>
                </td>
                <td>
                    {review.title}
                </td>
                <td>
                    {review.price}
                </td>
                <td>
                    {review.stars}
                </td>
                <td>
                    <Button onClick={()=>props.removeItem(review._id)}>
                        스크랩에서 제거
                    </Button>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>리뷰 이미지</th>
                        <th>리뷰 제목</th>
                        <th>제품 가격</th>
                        <th>별점</th>
                        <th>스크랩에서 제거</th>
                    </tr>
                </thead>
                <tbody>
                    {renderItems()}
                </tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
