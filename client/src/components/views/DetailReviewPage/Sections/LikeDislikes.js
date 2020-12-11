import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import axios from 'axios';

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0);
    const [Dislikes, setDislikes] = useState(0);
    const [LikeAction, setLikeAction] = useState(null);
    const [DislikeAction, setDislikeAction] = useState(null);

    let variable = {}

    if(props.review) {
        if(props.postId){
            variable = { postId: props.postId, userId: props.userId }
        }
    } else {
        variable = {commentId: props.commentId, userId: props.userId}
    }


    useEffect(() => {
        axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {
                    //얼마나 많은 좋아요를 받았는지 세팅
                    setLikes(response.data.likes.length)

                    //내가 이미 그 좋아요를 눌렀는지 확인 후 처리
                    response.data.likes.map(like => {
                        if(like.userId === props.userId && like.postId && (like.postId === props.postId)) {
                            setLikeAction('liked')
                        }else if (like.userId === props.userId && like.commentId && (like.commentId === props.commentId)) {
                            setLikeAction('liked')
                        }
                    })

                } else {
                    alert('좋아요 정보 가져오기 실패')
                }
            })
        axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if(response.data.success) {
                    //얼마나 많은 싫어요를 받았는지 세팅
                    setDislikes(response.data.dislikes.length)

                    //내가 이미 그 싫어요를 눌렀는지 확인 후 처리
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId) {
                            setDislikeAction('disliked')
                        }
                    })

                } else {
                    alert('싫어요 정보 가져오기 실패')
                }
            })
    }, [props.postId])

    const onLike = () => {

        if(LikeAction === null){
            //클릭이 안되어 있을 때
            axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes + 1)
                        setLikeAction("liked")

                        if(DislikeAction !== null ) {
                            setDislikeAction(null)
                            setDislikes(Dislikes - 1)
                        }

                    }else {
                        alert('like 올리기 실패ㅠ')
                    }
                })
        } else {
            console.log('like가 클릭되어있던 경우 온라이크');
            //like가 클릭이 되어 있었을 때
            axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {
                        setLikes(Likes - 1)
                        setLikeAction(null)
                    }else {
                        alert('like 내리기 실패ㅠ')
                    }
                })
        }

    }

    const onDislike = () => {

        if(DislikeAction !== null) {
            //이미 싫어요 눌린 경우
            axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDislikes(Dislikes - 1)
                        setDislikeAction(null)
                    } else {
                        alert('undislike 실패!')
                    }
                })
        } else {
            //dislike버튼이 클릭 되어있지 않은 경우
            axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDislikes(Dislikes + 1)
                        setDislikeAction('disliked')

                        if (LikeAction !== null){
                            setLikeAction(null)
                            setLikes(Likes - 1)
                        }


                    } else {
                        alert('dislike하기 실패!')
                    }
                })
        }

    }


    return (
        <div>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" theme={LikeAction === 'liked' ? 'filled' : 'outlined'} onClick={onLike} />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto' }}> {Likes} </span>
            </span>&nbsp;&nbsp;

            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike" theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}  onClick={onDislike} />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto' }}> {Dislikes} </span>
            </span>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
