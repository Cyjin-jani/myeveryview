import React, { useEffect, useState } from 'react'
import axios from 'axios';
import ProductImage from './Sections/ProductImage';
import ReviewInfo from './Sections/ReviewInfo';
import Comment from './Sections/Comment';
// import LikeDislikes from './Sections/LikeDislikes';
import { Row, Col, Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToScrap } from '../../../_actions/user_actions';

function DetailReviewPage(props) {
    // console.log('DetailReviewPage 컴포넌트');
    const productReviewId = props.match.params.productId;
    const [Product, setProduct] = useState({});
    const [ReviewWriter, setReviewWriter] = useState("");
    const [Comments, setComments] = useState([]);
    const dispatch = useDispatch();
    const variable = {postId: productReviewId};

    useEffect(() => {
        
        // review 가져오기
        axios.get(`/api/product/reviewProducts_by_id?id=${productReviewId}&type=single`)
            .then(response => {
                setProduct(response.data[0])
                setReviewWriter(response.data[0].writer._id)
            })
            .catch(err => alert("상세리뷰 불러오기 실패", err))

        //댓글 가져오기
        axios.post('/api/comment/getComments', variable)
            .then(response => {
                if(response.data.success) {
                    setComments(response.data.comments)
                    
                }else {
                    alert('댓글 가져오기 실패')
                }
            })
        

    }, [])

    //이미 스크랩 되어 있는 지 확인
    const checkScrapped = () => {
        //유저 정보에서 scrap 배열을 확인하여 리뷰아이디가 일치하는지 확인
        let result = false
        if (props.user.userData) {
            if (props.user.userData.scrap) {
                let scrapList = props.user.userData.scrap
                scrapList.map(item => {
                    if (item.id === Product._id) {
                        result = true
                    }
                })
            }
            return result
        }
    }

    //리뷰수정이 가능한 글쓴이인지 체크
    const checkWriter = () => {
        
        if (props.user.userData && ReviewWriter) {
            if (props.user.userData._id === ReviewWriter) {
                return true
            }
            
        }
    }

    const clickHandler = () => {
        //필요한 정보를 scrap필드에 넣어줌.(리뷰글에 대한 ID필요, 스크랩 한 날짜 정도..)
        // console.log('review ID', Product._id)
        dispatch(addToScrap(Product._id))
    }

    const reviewHandler = () => {
        props.history.push(`/product/updateReview/${Product._id}`, Product)
    }

    const refreshFunction = (newComments) => {
        setComments(Comments.concat(newComments))
    }

    return (
        <div style={{ width: '100%', padding: '3rem 4rem'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                <h1>{Product.title}</h1>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    {checkScrapped() ? 
                        <Button size="large" shape="round" type="danger" disabled>
                            스크랩 하기
                        </Button>
                    :
                        <Button size="large" shape="round" type="danger" onClick={clickHandler}>
                            스크랩 하기
                        </Button>
                    }
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
                    <ReviewInfo detail={Product} postId={Product._id} />
                </Col>
            </Row>
            <br />
            <div style={{display: 'flex', justifyContent: 'center' }}>
                {checkWriter() && 
                    <Button size="large" shape="round" type="primary" onClick={reviewHandler}>
                        리뷰수정하기
                    </Button>
                    
                }
                <br />
            </div>
            <br />
            <Comment postId={productReviewId} commentsList={Comments} refreshFunction={refreshFunction} />
        </div>
    )
}

export default DetailReviewPage
