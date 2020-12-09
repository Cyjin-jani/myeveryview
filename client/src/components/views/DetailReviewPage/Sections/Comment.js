import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props) {
    //redux에서 user정보 가져오기.
    const user = useSelector(state => state.user);
    const postId = props.postId;
    

    const [commentValue, setcommentValue] = useState("");

    const handleChange = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: postId,
        }

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if(response.data.success) {
                    // console.log(response.data.result);
                } else {
                    alert('코멘트를 저장하지 못했습니다.')
                }
            })
    }

    return (
        <div>
            <br />
            <p> 댓글 </p>
            <hr />
            {/* comment lists */}
            <SingleComment postId={postId} />

            {/* root comment form */}
            <form style={{display: 'flex'}} onSubmit={onSubmit}>
                <textarea 
                    style={{width: '100%', borderRadius: '5px' }} 
                    onChange={handleChange}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요."
                />
                <br />
                <button style={{width: '20%', height: '52px'}} onClick={onSubmit} >Submit</button>
            </form>
        </div>
    )
}

export default Comment
