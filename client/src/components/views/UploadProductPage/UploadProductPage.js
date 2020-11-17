import React, {useState} from 'react';
import { Form, Button, Typography, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';

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
    {key: 8, value: "게임"},
    {key: 9, value: "SW 프로그램(어플)"},
]

// 실수함(컴포넌트는 대문자로 시작해야 한다.
function UploadProductPage() {
    const [productName, setProductName] = useState("");
    const [myReview, setMyReview] = useState("");
    const [price, setPrice] = useState(0);
    const [Category, setCategory] = useState(1);


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

    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <Title level={2}> 제품 리뷰하기 </Title>
            </div>

            <Form>
                {/* DropZone */}
                <FileUpload />
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
                <select onChange={categoryChangeHandler} value={Category}>
                    {Categories.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br />
                <br />
                <Button type="submit">
                확인
                </Button>
            </Form>
        </div>
    )
}

export default UploadProductPage
