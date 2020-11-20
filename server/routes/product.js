const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

//=================================
//             Product
//=================================

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
let upload = multer({ storage: storage }).single("file");


router.post('/image', (req, res) => {
    //가져온 이미지를 저장해줌.
    upload(req, res, err => {
        if(err) {
            return res.json({success: false, err})
        }
        return res.json({
            success: true, filePath: res.req.file.path, fileName: res.req.file.filename
        })
    })
})

//리뷰 등록
router.post('/', (req, res) => {
  //받아온 정보들 DB에 넣어줌.
  const product = new Product(req.body);

  product.save((err) => {
    if(err) return res.status(400).json({success: false, err})
    return res.status(200).json({success: true})
  })

})

//전체 리뷰 가져오기
router.post('/allProducts', (req, res) => {
  
  //product collection안에 들어있는 모든 상품 정보 불러오기.
  Product.find()
    .populate('writer') //writer에 대한 모든 정보 가져옴.
    .exec((err, productsInfo) => {
      if (err) return res.status(400).json({success: false, err})
      return res.status(200).json({success: true, productsInfo})
    })

})



module.exports = router;
 