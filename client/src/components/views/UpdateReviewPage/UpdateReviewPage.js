import React, { useState, useEffect } from 'react';
import UploadProductPage from './../UploadProductPage/UploadProductPage';
import { Form, Button, Typography, Input, DatePicker, Radio } from 'antd';
import FileUpload from '../../utils/FileUpload';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
import moment from 'moment';


const { Title } = Typography;
const { TextArea } = Input;
const Categories = [
    {key: 1, value: "식품"},
    {key: 2, value: "화장품"},
    {key: 3, value: "의류"},
    {key: 4, value: "전자제품"},
    {key: 5, value: "악세서리"},
    {key: 6, value: "의약품"},
    {key: 7, value: "장소"},
    {key: 8, value: "생활용품"},
    {key: 9, value: "SW 프로그램(어플)"},
]
const config = {
    rules: [
      {
        type: 'object',
        required: true,
        message: '날짜를 입력해주세요!',
      },
    ],
  };

function UpdateReviewPage(props) {
    
    const [Product, setProduct] = useState({});
    const [productName, setProductName] = useState("");
    const [myReview, setMyReview] = useState("");
    const [price, setPrice] = useState(0);
    const [Category, setCategory] = useState(1);
    const [Images, setImages] = useState([]);
    const [Stars, setStars] = useState(0);
    const [usedDate, setUsedDate] = useState("");
    const [reBuy, setReBuy] = useState(0);
    
    useEffect(() => {
        setProduct(props.location.state)
        console.log("Product", Product);
        setProductName(Product.title)
        setStars(Product.stars)
        updateImages(Product.images)
        setPrice(Product.price)
        setMyReview(Product.reviewDescription)
        setReBuy(Product.rebuy)
        setCategory(Product.categories)
        // if(Product.usedDate){
        //     setUsedDate(Product.usedDate.slice(0, 10).replace(/-/gi, "/"))
        // }
        
    }, [Product])



    const nameChangeHandler = (e) => {
        setProductName(e.currentTarget.value)
    }

    const myReviewHandler = (e) => {
        setMyReview(e.currentTarget.value)
    }

    const priceChangeHandler = (e) => {
        setPrice(e.currentTarget.value)
    }

    const categoryChangeHandler = (e) => {
        setCategory(e.currentTarget.value)
    }

    const updateImages = (newImages) => {
        console.log('이미지정보 전달됨', newImages);
        setImages(newImages);
    }

    const starChangeHandler = (newRating, name) => {
        setStars(newRating);
    }

    const dateChangeHandler = (date, dateString) => {
        setUsedDate(dateString);
    }

    const reBuyHandler = (e) => {
        setReBuy(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (!productName || !myReview || !price || !Category || !Images || !Stars || !usedDate || !reBuy) {
            return alert('모든 항목을 넣어주셔야 합니다.')
        }

        //서버에 채운 값들을 request로 보낸다.

        const body = {
            id: Product._id,
            // writer: props.user.userData._id,
            title: productName,
            reviewDescription: myReview,
            price: price,
            images: Images,
            usedDate: usedDate,
            category: Category,
            stars: Stars,
            rebuy: reBuy,
        }
        console.log(body);

        
        axios.post('/api/product/updateReview', body)
            .then(response => {
                if(response.data.success) {
                    alert('업데이트 성공!')
                    props.history.push('/')
                }else {
                    alert('업데이트 실패 ㅠㅜ')
                }
            })



    }
    
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> 제품 리뷰하기 </Title>
            </div>

            <Form onSubmit={submitHandler}>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} images={Images} />
                <br />
                <br />
                <label>제품명</label>
                <Input onChange={nameChangeHandler} value={productName} />
                <br />
                <br />
                <label>나의 리뷰</label>
                <TextArea onChange={myReviewHandler} value={myReview} />
                <br />
                <br />
                <label>제품 가격(원)</label>
                <Input type="number" onChange={priceChangeHandler} value={price} />
                <br />
                <br />
                <label>구매(사용) 날짜</label>
                <Form.Item name="date-picker" {...config}>
                    <DatePicker required onChange={dateChangeHandler} 
                    disabledDate={d => !d || d.isAfter(Date.now())}  />
                    {/* defaultValue={moment(usedDate, 'YYYY/MM/DD')} */}
                </Form.Item>
                <label>카테고리 설정</label><br />
                <select onChange={categoryChangeHandler} value={Category}>
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <label>재구매(재사용)의사</label><br />
                <Radio.Group onChange={reBuyHandler} value={reBuy}>
                    <Radio value={1}>예, 또 구매(사용)할래요.</Radio>
                    <Radio value={2}>아니요, 다시는 안써요.</Radio>
                </Radio.Group>
                <br />
                <br />
                <label>종합 평가</label><br />
                <StarRatings
                    rating={Stars}
                    starRatedColor="#fcdb03"
                    starHoverColor="#fcb103"
                    changeRating={starChangeHandler}
                    numberOfStars={5}
                    name='rating'
                    starDimension="25px"
                    starSpacing="7px"
                />
                <br />
                <br />
                <Button type="primary" onClick={submitHandler}>
                리뷰 업로드
                </Button>
            </Form>
        </div>
    )
}

export default UpdateReviewPage
