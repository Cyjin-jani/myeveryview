const express = require('express');
const router = express.Router();

const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//             Like
//=================================

//like 찾기
router.post("/getLikes", (req, res) => {
    
    let variable = {}

    if(req.body.postId) {
        variable = {postId: req.body.postId}
    } else {
        variable = {commentId: req.body.commentId}
    }

    console.log('getLikes의 variable', variable);

    Like.find(variable)
        .exec((err, likes) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, likes })
        })


})
//dislike 찾기
router.post("/getDislikes", (req, res) => {
    
    let variable = {}

    if(req.body.postId) {
        variable = {postId: req.body.postId}
    } else {
        variable = {commentId: req.body.commentId}
    }

    Dislike.find(variable)
        .exec((err, dislikes) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({ success: true, dislikes })
        })
})

//좋아요 올리기
router.post("/upLike", (req, res) => {
    
    let variable = {}
    
    if(req.body.postId) {
        variable = {postId: req.body.postId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    console.log('uplike의 variable', variable);
    
    // Like 콜렉션에 해당 정보를 넣어줄 것.
    const like = new Like(variable)
    
    like.save((err, likeResult) => {
        if(err) return res.json({success: false, err})
        
        // 만약에 dislike이 이미 클릭이 되어 있다면, dislike을 1 줄여준다.
        Dislike.findOneAndDelete(variable)
        .exec((err, dislikeResult) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({ success: true })
        })
        
    })
    
})

//좋아요 내리기
router.post("/unLike", (req, res) => {
    
    let variable = {}

    if(req.body.postId) {
        variable = {postId: req.body.postId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    console.log('unlike의 variable', variable);

    Like.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({ success: true })
        })
})

//싫어요를 취소하기
router.post("/unDislike", (req, res) => {
    
    let variable = {}

    if(req.body.postId) {
        variable = {postId: req.body.postId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    Dislike.findOneAndDelete(variable)
        .exec((err, result) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({ success: true })
        })
})

//싫어요 올리기
router.post("/upDislike", (req, res) => {
    
    let variable = {}
    
    if(req.body.postId) {
        variable = {postId: req.body.postId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }
    
    // Dislike 콜렉션에 해당 정보를 넣어줄 것.
    const dislike = new Dislike(variable)
    
    dislike.save((err, dislikeResult) => {
        if(err) return res.json({success: false, err})
        
        // 만약에 Like이 이미 클릭이 되어 있다면, Like을 1 줄여준다.
        Like.findOneAndDelete(variable)
        .exec((err, likeResult) => {
            if(err) return res.status(400).json({success: false, err})
            res.status(200).json({ success: true })
        })
        
    })
    
})



module.exports = router;
 