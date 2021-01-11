import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import axios from 'axios';
import { Icon, Col, Card, Row, Button } from 'antd';
import ImageSlider from '../../utils/ImageSlider';
import Meta from 'antd/lib/card/Meta';
import StarRatings from 'react-star-ratings';
import Checkbox from './Sections/CheckBox';
import Radiobox from './Sections/RadioBox';
import SearchFeature from './Sections/SearchFeature';
import { categories, price } from './Sections/Datas';

function LandingPage() {

    const [Products, setProducts] = useState([]);
    const [Skip, setSkip] = useState(0);
    const [Limit, setLimit] = useState(4);
    const [PostSize, setPostSize] = useState(0);
    const [Filters, setFilters] = useState({
        categories: [],
        price: []
    });
    const [SearchTerm, setSearchTerm] = useState("");

    useEffect(() => {

        //리뷰 게시글 수 컨트롤 하기 위한 변수들. (더보기 버튼 활용)
        let body = {
            skip: Skip,
            // limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/allProducts', body)
            .then(response => {
                if (response.data.success) {
                    // console.log(response.data);
                    if (body.loadMore) {
                        // console.log('더보기버튼 누름');
                        setProducts([...Products, ...response.data.productsInfo])
                    } else {
                        setProducts(response.data.productsInfo.slice(0, 4))
                    }
                    // console.log(response.data.postSize);
                    setPostSize(response.data.postSize);
                }else {
                    alert('상품들을 가져오는 데 실패함.')
                }
            } )
    }

    const loadMoreHandler = () => {
        //현재 이후의 게시글부터 불러와야함.
        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        //여기서 새로 스킵을 바꾸어주어야 계속해서 다음 게시글부터 가져올 수 있음.
        setSkip(skip)
    }

    const renderCards = Products.map((product, index) => {
        // console.log(product);

        return <Col lg={6} md={8} xs={24} key={index} style={{height: '310px'}} >
            <a href={`/product/${product._id}`}>
            <Card
                cover={<ImageSlider images={product.images} />}
                bodyStyle={{paddingBottom: '5px', height: '130px', minHeight: '130px', maxHeight: '130px'}}
                hoverable
                style={{borderColor: '#83befc'}}

            >
                <Meta
                    title={product.title}
                    description={[<div key={index}>
                        <StarRatings
                        rating={product.stars}
                        starRatedColor="#fcdb03"
                        numberOfStars={5}
                        name='rating'
                        starDimension="15px"
                        starSpacing="5px"
                        />
                        <p>{product.createdAt && product.createdAt.slice(0, 10)}</p>
                    </div>]}
                />
                
            </Card>
            </a>
        </Col>
    })

    const showFilteredResults = (filters) => {
        let body = {
            skip: 0, //checkbox 누를때마다 처음부터 다시 시작해서 가져와야 하므로 0
            // limit: Limit,
            filters: filters
        }
        // console.log("filters의 body", body, filters);
        getProducts(body)
        setSkip(0)

    }

    const handlePrice = (value) => {
        const data = price;
        let priceRange = [];

        for (let key in data) {

            if(data[key]._id === parseInt(value, 10)) {
                priceRange = data[key].rangeArray;
            }
        }
        return priceRange;
    }

    const handleFilters = (filters, filterCategory) => {
        
        const newFilters = {...Filters }
        //자식 컴포넌트 (checkbox)에서 가져온 걸 넣어준다.
        newFilters[filterCategory] = filters;
        
        if (filterCategory === 'price') {
            let priceValues = handlePrice(filters);
            newFilters[filterCategory] = priceValues;
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)

    }   

    const updateSearchTerm = (newSearchTerm) => {
        
        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }
        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)

    }

    

    return (
        <div style={{ width: '75%', margin: '1.5rem auto', height: '100%'}}>
            <div style={{ textAlign: 'center', height: '5rem' }}>
                <h2>👍💬 마이에브리뷰 💬👍</h2>
                <h4>원하는 리뷰를 찾아보고, 자신만의 리뷰를 등록해보세요!</h4>
            </div>
            {/* <div style={{ textAlign: 'center', height: '3rem'}}>
            </div> */}

            {/* 검색 */}
            <div style={{display: 'flex', justifyContent: 'center', margin: '1rem auto', width: '70%'}}>
            <SearchFeature refreshFunction={updateSearchTerm} />
            </div>

            {/* 검색 필터 넣을 곳 */}
            <Row gutter={[16, 16]} type="flex" justify="start">
                <Col lg={12} xs={24}>
                    {/* 카테고리 체크박스 */}
                    <Checkbox list={categories} handleFilters={filters => handleFilters(filters, "categories")} />
                </Col>
                <Col lg={12} xs={24}>
                    {/* price 라디오박스 */}
                    <Radiobox list={price} handleFilters={filters => handleFilters(filters, "price")} />
                </Col>
            </Row>

            {/* cards */}
            <Row gutter={[16, 16]} type="flex" justify="start">
                {renderCards}

            </Row>

            {PostSize >= Limit && 
                <div style={{display: 'flex', justifyContent: 'center', margin: '20px'}}>
                    <Button type="primary" onClick={loadMoreHandler}>더보기</Button>
                </div>
            }
            <br></br>

        </div>
    )
}

export default LandingPage
