const express = require('express');
const router = express.Router();
const multer = require('multer');

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

module.exports = router;
 