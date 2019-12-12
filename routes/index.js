const express = require('express')
const { Router } = require('express');
const router = Router();
const multer = require('multer');
const upload = multer({ dest:'tmp/' });
const fs = require('fs');

/* GET index page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Express'
  });
});

const checkSize = (req, res, next) => {
  const imgArr = req.files;
  const filteredArr = imgArr.filter(img => img.size <= 3000000);
  imgArr.length != filteredArr.length ?
    res.render("index", { error: "Your files size must be less than 3mb"}):
    next()
}

router.post('/myupload', upload.array('myfiles'), checkSize, (req, res, next) => {
  req.files.forEach(file => {  
    fs.rename(file.path, 'public/images/' + file.originalname, function(err){
      if(err) {
        res.send('problem during travel')
      } else {
        res.send('file uploaded successfuly')
      }
    })
  })  
})

module.exports = router;
