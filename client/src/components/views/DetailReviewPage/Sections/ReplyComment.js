import React, { useEffect, useState, memo } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {

    const [ChildCommentNum, setChildCommentNum] = useState(0);
    const [OpenReplyComments, setOpenReplyComments] = useState(false);

    useEffect(() => {
        let commentNumber = 0;

        props.commentsList.map((comment) => {
            if(comment.responseTo === props.parentCommentId) {
                commentNumber ++
            }
        })

        setChildCommentNum(commentNumber);

    }, [props.commentsList])
    
    const renderReplyComment = (parentCommentId) => 
        props.commentsList.map((comment, index) => (
            
            <React.Fragment>
                {comment.responseTo === parentCommentId && (
                    <div style={{width: '80%', marginLeft: '40px'}}>
                        <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} key={index} />
                        <ReplyComment key={index+1} refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={props.postId} commentsList={props.commentsList} />
                    </div>
                )}
            </React.Fragment>
        ))
    

    const onHandleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }
    
    
    return (
        <div>

            {ChildCommentNum > 0 && 
                <p style={{fontSize: '14px', margin: 0, color: 'gray'}} onClick={onHandleChange}>
                    View {ChildCommentNum} more comment(s)
                </p>
            
            }

            {OpenReplyComments && 
                renderReplyComment(props.parentCommentId)
            }

        </div>
    )
}

export default memo(ReplyComment)
