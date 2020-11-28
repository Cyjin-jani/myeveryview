import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ReviewInfo from './Sections/ReviewInfo';
import { Row, Col, Button } from 'antd';

function DetailReviewPage(props) {
    
    const productReviewId = props.match.params.productId;

    const [Product, setProduct] = useState({});

    useEffect(() => {
        
        axios.get(`/api/product/reviewProducts_by_id?id=${productReviewId}&type=single`)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.product);
                    setProduct(response.data.product[0])
                }else {
                    alert('상세리뷰 가져오기 실패!')
                }
            })
        
    }, [])

    const clickHandler = () => {
        
    }

    return (
        <div style={{ width: '100%', padding: '3rem 4rem'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <h1>{Product.title}</h1>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                        스크랩 버튼
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
