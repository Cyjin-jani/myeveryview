const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { Product } = require('../models/Product');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        scrap: req.user.scrap,
    });
});

router.post("/register", (req, res) => {
    console.log('유저 register 시작(DB).');
    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });

        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post("/checkEmail", (req, res) => {
   console.log(req.body.currentEmail);
    User.findOne({email: req.body.currentEmail }, (err, user) => {
        if (!user) {
            return res.json({
                emailCheck: true,
                message: "사용해도 좋은 이메일 입니다."
            });
        } else {
            return res.json({
                emailCheck: false,
                message: "이미 사용하고 있는 이메일입니다."
            })
        }
    })
});

router.post("/update", (req, res) => {
    console.log('유저 업뎃 요청받음');
    const user = new User(req.body);
    // console.log(req.body);
    //이름은 update하고, password는 암호화 해야해서 save로 해봄.
    User.findOneAndUpdate({ email: req.body.email }, { name: req.body.name, password: user.password}, {new: true},(err, doc) => {
        if (err) return res.json({ updateSuccess: false, err });
        return res.status(200).send({
            updateSuccess: true,
            doc: doc
        });
    });

});


router.post("/addToScrap", auth, (req, res) => {
    console.log('scrap기능');
    //해당 유저의 정보를 가져오기.
    
    User.findOne({ _id: req.user._id }, (err, userInfo) => {
        //가져온 정보에서 스크랩하려는 상품리뷰가 이미 있는 지 확인.
        let alreadyScrapped = false;

        userInfo.scrap.forEach((item) => {
            if(item.id === req.body.reviewProductId) {
                //이미 들어 있다
                alreadyScrapped = true;
            }
        })

        //상품리뷰가 이미 스크랩 되어 있는 경우
        if(alreadyScrapped) {
            // console.log('상품이 이미 스크랩 되어있다.');
            return res.status(200).send(alreadyScrapped);

        } else {
            //상품리뷰가 스크랩 되지 않은 경우
            User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    $push: {
                        scrap: {
                            id: req.body.reviewProductId,
                            date: Date.now()
                        }
                    }
                },
                { new: true },
                (err, userInfo) => {
                    // console.log('ADDTOscrap의 userInfo', userInfo);
                    if (err) return res.status(400).json({success: false, err})
                    res.status(200).send(userInfo.scrap);
                }
            )
        }
    })
});


router.get('/removeFromScrap', auth, (req, res) => {
    
    //스크랩한 목록 중 지우고자 하는 리뷰 삭제
    User.findOneAndUpdate(
        {_id: req.user._id},
        {
            $pull: {
                scrap: { id: req.query.id }
            }
        },
        { new: true },
        (err, userInfo) => {
            if(err) {
                console.log(err);
            }
            console.log('userinfo: ', userInfo);
            //product collection에서 현재 남아있는 정보들을 가져오기. 
            let scrap = userInfo.scrap;
            let array = scrap.map(item => {
                return item.id
            })

            Product.find({_id: { $in: array }})
            .populate('writer')
            .exec((err, reviewInfo) => {
                return res.status(200).json({
                    reviewInfo,
                    scrap
                })
            })
        }
    )

})



module.exports = router;
