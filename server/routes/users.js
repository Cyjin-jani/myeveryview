const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

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

module.exports = router;
