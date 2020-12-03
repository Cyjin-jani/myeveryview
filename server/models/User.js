const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const moment = require("moment");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    role : {
        type:Number,
        default: 0 
    },
    scrap: {
        type: Array,
        default: []
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    },
    created:{
        type: Date,
        default: Date.now
    }
})


userSchema.pre('save', function( next ) {
    var user = this;
    console.log('save하기 직전의 유저정보', user);
    if(user.isModified('password')){    
        console.log('password changed -- 비밀번호 암호화 시작')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err);
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
});

userSchema.pre('findOneAndUpdate', function( next ) {
    var user = this;
    console.log('User유저: ', user._update.$pull);

    //logout 할 때는 options가 빈 객체
    if (Object.keys(user.options).length === 0) {
        next()
    }
    //scrap 하기를 누른 경우 또는 스크랩 삭제를 누른 경우
    else if (user._update.$push || user._update.$pull) {
        next()
    }
    
    else {
        console.log('password changed -- 비밀번호 암호화 시작')
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err);
            // console.log("유저 패스워드", user._update.password);
            bcrypt.hash(user._update.password, salt, function(err, hash){
                if(err) return next(err);
                user._update.password = hash
                next()
            })
        })
    }
});

userSchema.methods.comparePassword = function(plainPassword,cb){
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;
    console.log('user',user)
    console.log('userSchema', userSchema)
    var token =  jwt.sign(user._id.toHexString(),'secret')
    var oneHour = moment().add(1, 'hour').valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user){
        if(err) return cb(err)
        cb(null, user);
    })
}

userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id":decode, "token":token}, function(err, user){
            if(err) return cb(err);
            cb(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User }