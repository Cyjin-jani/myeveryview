import React, { useState, memo } from 'react'
import { useSelector } from 'react-redux';
import { Comment, Button, Input } from 'antd';
import axios from 'axios';
import LikeDislikes from './LikeDislikes';

const { TextArea } = Input;

function SingleComment(props) {

    const user = useSelector(state => state.user);
    const [OpenReply, setOpenReply] = useState(false);
    const [CommentValue, setCommentValue] = useState("");

    const onClickReplyOpen = () => {
        if(user.userData && user.userData.isAuth === true) {
            setOpenReply(!OpenReply)
        }else {
            alert('로그인이 필요합니다.')
        }
    }
    const onHandleChange = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    // console.log(response.data.result);
                    props.refreshFunction(response.data.result)
                    setCommentValue("")
                    setOpenReply(false)
                } else {
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })

    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}  />
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]


    return (
        <div>
            <Comment 
                actions={actions}
                author={<b>{props.comment.writer.name}</b>}
                content={<p> {props.comment.content} </p>}
            />

            {OpenReply && 
                <form style={{display: 'flex'}} onSubmit={onSubmit}>
                    <textarea 
                        style={{width: '100%', borderRadius: '5px' }} 
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요."
                    />
                    <br />
                    <button style={{width: '20%', height: '52px'}} onClick={onSubmit} >Submit</button>
                </form>
            }
        </div>
    )
}

export default memo(SingleComment)
