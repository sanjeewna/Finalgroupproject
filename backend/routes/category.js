var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Category = require('../models/category');


/**
 * Code for Image Upload
 */
var multer = require('multer');
var mkdirp = require('mkdirp');

var storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/');
  },
  filename: function (req, file, cb) {
    let originalFileName = (file.originalname).split(".");
    let extention = originalFileName.slice(-1)[0];
    var filename = "File_" + Date.now().toString().substring(0, 11) + "." + extention;
    console.log(filename);
    cb(null, filename);
  }
});

var uploadFile = multer({ storage: storageFile }).single('category_image');


/**
 * Function for Getting all the category
 */
router.get('/', function (req, res, next) {
  console.log("GET - /categories");
  return Category.find({}).then(function (category) {
    res.send(category);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});``

/* GET SINGLE category BY ID */
router.get('/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)
  return Category.find(req.params.id).then(function (category) {
    res.send(category[0]);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/**
 * New Function
 */
router.post('/', function (req, res, next) {

  uploadFile(req, res, function (err, data) {
    req.body.category_category_id = new mongoose.Types.ObjectId(req.body.category_category_id);
    req.body.category_image = res.req.file.filename;

    return Category.create(req.body).then(function (category) {
      res.json({ status: 'OK', category: category });

    })
      .catch(function (err) {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      })

  });

});

/**
 * Update Function
 */
router.post('/:id', function (req, res, next) {

  uploadFile(req, res, function (err, data) {

    req.body.category_category_id = new mongoose.Types.ObjectId(req.body.category_category_id);
    req.params.id = new mongoose.Types.ObjectId(req.params.id);

    // Check image exits or not 
    if (typeof res.req.file != "undefined" && res.req.file) {
      req.body.category_image = res.req.file.filename;
    } else {
      req.body.category_image =  req.body.category_image_temp;
    }
   
    return Category.findByIdAndUpdate(req.params.id, req.body).then(function (category) {
      res.json({ status: 'OK', category: category });

    })
      .catch(function (err) {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      })

  });

});

/* DELETE category */
router.delete('/:id', function (req, res, next) {
  return Category.findByIdAndDelete(req.params.id).then(function (category) {
    res.send(category);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })

});

module.exports = router;
