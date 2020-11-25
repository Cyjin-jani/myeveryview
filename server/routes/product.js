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

//리뷰 가져오기
router.post('/allProducts', (req, res) => {
  
  //product collection안에 들어있는 모든 상품 정보 불러오기.

  //더보기를 누르기 전에 최대 몇 개 까지 보여줄지 리미트를 정함.
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  //만약 스킵이 없다면 처음부터 데이터를 보여줘야 함. (만약 이미 데이터가 있다면, 그 다음 게시물부터 보여줘야함)
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  // console.log("skip과 limit: ", skip, limit);
  let term = req.body.searchTerm;

  let findArgs = {};
  for(let key in req.body.filters) {
    
    if(req.body.filters[key].length > 0){

      // console.log('key', key);
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0], //greater than equal 크거나 같은
          $lte: req.body.filters[key][1] //less than equal 작거나 같은
        }
      } else {
        //category인 경우에만.
        findArgs[key] = req.body.filters[key];
      }

    
    
    }

  }
  console.log('findArgs: ', findArgs);
  // 어떤 카테고리만 가져올 지를 find에다가 findArgs로 넣어줌.
  // console.log('findArgs', findArgs);

  if (term) {
    //검색어 있는 경우
    Product.find(findArgs)
      .find({ $text: { $search: term } }) //검색어 통해서 가져오도록.
      .populate('writer') //writer에 대한 모든 정보 가져옴.
      .skip(skip)
      .limit(limit)
      .exec((err, productsInfo) => {
        if (err) return res.status(400).json({success: false, err})
        console.log('db값');
        for(let i in productsInfo){
          console.log("리뷰들", productsInfo[i].title);
        }
        return res.status(200).json({success: true, productsInfo, postSize: productsInfo.length})
      })
  } else {
    //검색어 없는 경우
    Product.find(findArgs)
      .populate('writer') //writer에 대한 모든 정보 가져옴.
      .skip(skip)
      .limit(limit)
      .exec((err, productsInfo) => {
        if (err) return res.status(400).json({success: false, err})
        console.log('db값');
        for(let i in productsInfo){
          console.log("리뷰들", productsInfo[i].title);
        }
        return res.status(200).json({success: true, productsInfo, postSize: productsInfo.length})
      })
  }



})



module.exports = router;
 