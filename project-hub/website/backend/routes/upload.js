const path = require("path");
const express = require('express');
const multiparty = require('multiparty');
const fs = require('fs');
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var cloudinary = require('cloudinary');


cloudinary.config({ 
  cloud_name: 'dmlto4elx', 
  api_key: '529638953118896', 
  api_secret: 'tUiccDI1mM5leDgDFnq5hN7CGlY' 
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

/*
const storage = multer.diskStorage({
   destination: "./public/uploads/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");

*/
/*router.post("/upload", {
   upload(req, res, (err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file);//Here you get file.
      /*Now do where ever you want to do*/
/*      if(!err)
         return res.send(200).end();
   });
};);*/

router.post('/upload', multipartMiddleware, function(req, res) {
   console.log(req.files.file.path);
   img_path = req.files.file.path;

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
   //const upload = multer({ storage:storage }).single('file');

//   console.log( req.files);
//   let uploadFile = req.files.file
//   const fileName = req.files.file.name
//   uploadFile.mv(
//     `${__dirname}/public/files/${fileName}`,
//     function (err) {
//       if (err) {
//         return res.status(500).send(err)
//       }

//       res.json({
//         file: `public/${req.files.file.name}`,
//       })
//   // don't forget to delete all req.files when done
// });
});

/*('/upload', multipartMiddleware, (req, res, next) => {


   form.parse(req, function(err, fields, files) {
        // fields fields fields
   console.log(req.files);
   console.log(">>>>>>>>>>>>>>>>");

    });*/
 /*  req.on('data', (data) => {
    console.log(data.toString());
  });
*/
/*  let uploadFile = req.files.file
  const fileName = req.files.file.name
  uploadFile.mv(
    `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }

      res.json({
        file: `public/${req.files.file.name}`,
      })
    },
  )
});
*/

module.exports = router;