import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ReviewInfo from './Sections/ReviewInfo';
import { Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToScrap } from '../../../_actions/user_actions';

function DetailReviewPage(props) {
    
    const productReviewId = props.match.params.productId;
    const [Product, setProduct] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        
        axios.get(`/api/product/reviewProducts_by_id?id=${productReviewId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
            })
            .catch(err => alert("상세리뷰 불러오기 실패", err))
        
    }, [])

    const clickHandler = () => {
        //필요한 정보를 scrap필드에 넣어줌.(리뷰글에 대한 ID필요, 스크랩 한 날짜 정도..)
        // console.log('review ID', Product._id)
        dispatch(addToScrap(Product._id))
    }

    return (
        <div style={{ width: '100%', padding: '3rem 4rem'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <h1>{Product.title}</h1>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                        스크랩 하기
                    </Button>
                </div>
            </div>

            <br />
            <Row gutter={[16, 16]} >
                <Col lg={12} sm={24}>
                    {/* review Image */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* review Detail Info */}
                    <ReviewInfo detail={Product} />
                </Col>
            </Row>
        </div>
    )
}

export default DetailReviewPage
