const path = require("path");
const express = require('express');
const multiparty = require('multiparty');
const fs = require('fs');
const validateImageType = require('../validation/image');

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var cloudinary = require('cloudinary');


cloudinary.config({ 
  cloud_name: 'dks7zihas', 
  api_key: '684449115322763', 
  api_secret: 'LWIPWWMtXOU9oP-otfdIwqbGibU' 
});

const router = express.Router();
var form = new multiparty.Form();

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
   console.log("giving path")
   cb(null, './uploads/')
  },
  filename: function(req, file, cb) {
    console.log("path")
    cb(null, file.originalname +'.png')
  }
})


router.post('/upload', multipartMiddleware, function(req, res) {
   img_path = req.files.file.path;
   const { errors, isValid } = validateImageType(img_path);
   console.log(errors);
   console.log(isValid);
   if (!isValid){

    return res.status(400).json(errors);
   }
   cloudinary.v2.uploader.upload(img_path,
      function(error, result) {
         if (error){
            return res.send(error)
         }
         else{
            fs.unlink(img_path, (err) => {
               if (err) throw err;
               console.log('path/file.txt was deleted');
            });
            res.json(result)


         }
      });

});



module.exports = router;
