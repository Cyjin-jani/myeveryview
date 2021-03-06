const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const productSchema = mongoose.Schema({
    //게시자
    writer: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    //제목(제품명)
    title: {
        type:String,
        maxlength: 50
    },
    //리뷰 내용
    reviewDescription: {
        type: String
    },
    //제품가격
    price: {
        type: Number,
        default: 0
    },
    //이미지
    images: {
        type: Array,
        default: []
    },
    //조회수
    views: {
        type: Number,
        default: 0
    },
    //구매(사용)날짜
    usedDate: {
        type: Date,
        default: Date.now
    },
    //카테고리
    categories: {
        type: Number,
        default: 1
    },
    //별점
    stars: {
        type: Number,
        default: 0
    },
    //재사용여부 (1: 예, 2: 아니오)
    rebuy: {
        type: Number,
        default: 1
    },
}, { timestamps: true })

//검색 기능 관련 설정
productSchema.index({
    title: 'text',
    reviewDescription: 'text'
}, {//어떤 부분을 더 중점적으로 검색할 지.
    weights:{
        title: 5,
        reviewDescription: 1
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = { Product }