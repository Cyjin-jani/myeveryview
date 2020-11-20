import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import Meta from 'antd/lib/card/Meta';
import StarRatings from 'react-star-ratings';

function LandingPage() {

    const [Products, setProducts] = useState([]);

    useEffect(() => {

        let body = {

        }

        axios.post('/api/product/allProducts', )
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    setProducts(response.data.productsInfo)
                }else {
                    alert('상품들을 가져오는 데 실패함.')
                }
            } )


    }, [])

    const renderCards = Products.map((product, index) => {
        console.log(product);

        return <Col lg={6} md={8} xs={24} key={index}>
            <Card
                cover={<img style={{width: '100%', maxHeight: '150px'}} src={`http://localhost:5000/${product.images[0]}`} />}
                bodyStyle={{paddingBottom: '5px'}}
            >
                <Meta
                    title={product.title}
                    description={[<div>
                        <StarRatings
                        rating={product.stars}
                        starRatedColor="#fcdb03"
                        numberOfStars={5}
                        name='rating'
                        starDimension="15px"
                        starSpacing="5px"
                        />
                        <p>{product.createdAt.slice(0, 10)}</p>
                    </div>]}
                />
                
            </Card>
        </Col>
    })


    return (
        <div style={{ width: '75%', margin: '3rem auto'}}>
            <div style={{ textAlign: 'center' }}>
                <h2>마이 에브리뷰~ 🤦‍♂️</h2>
            </div>

            {/* 검색 필터 넣을 곳 */}
            
            {/* 검색 */}

            {/* cards */}
            <Row gutter={[16, 16]}>
                {renderCards}

            </Row>

            <div style={{ justifyContent: 'center' }}>
                <Button>더보기</Button>
            </div>

        </div>
    )
}

export default LandingPage
