var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/product');
var Category = require('../models/category.js');


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

var uploadFile = multer({ storage: storageFile }).single('product_image_filename');


/* GET ALL CITYS */
router.get('/', function (req, res, next) {

  console.log("GET - /products");
  return Product.aggregate([
    {
      $lookup:
      {
        from: "category",
        localField: "product_category_id",
        foreignField: "_id",
        as: "category_data"
      }
    },
    {
      $lookup:
      {
        from: "company",
        localField: "product_company_id",
        foreignField: "_id",
        as: "company_data"
      }
    }
  ]).then(function (products) {
    res.send(products);
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/* GET SINGLE product BY ID */
router.get('/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)
  return Product.find(req.params.id).then(function (product) {
    res.send(product[0]);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/** 
 * GET SINGLE product details BY ID 
 * */
router.get('/product-details/:id', function (req, res, next) {
  console.log("GET - /products");
  req.params.id = new mongoose.Types.ObjectId(req.params.id)
  return Product.aggregate([
    {
      $lookup:
      {
        from: "category",
        localField: "product_category_id",
        foreignField: "_id",
        as: "category_data"
      }
    },
    {
      $lookup:
      {
        from: "company",
        localField: "product_company_id",
        foreignField: "_id",
        as: "company_data"
      }
    },
    { $match: { _id: req.params.id } }
  ]).then(function (products) {
    res.send(products);
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/**  
 * Filter products by  category ID 
 */
router.get('/all-product/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)
  console.log("GET - /products");
  return Product.aggregate([
    {
      $lookup:
      {
        from: "category",
        localField: "product_category_id",
        foreignField: "_id",
        as: "category_data"
      }
    },
    {
      $lookup:
      {
        from: "company",
        localField: "product_company_id",
        foreignField: "_id",
        as: "company_data"
      }
    },
    { $match: { product_category_id: req.params.id } }
  ]).then(function (products) {
    res.send(products);
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
    req.body.product_category_id = new mongoose.Types.ObjectId(req.body.product_category_id);
    req.body.product_image_filename = res.req.file.filename;

    return Product.create(req.body).then(function (product) {
      res.json({ status: 'OK', product: product });

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

    req.body.product_category_id = new mongoose.Types.ObjectId(req.body.product_category_id);
    req.params.id = new mongoose.Types.ObjectId(req.params.id);

    // Check image exits or not 
    if (typeof res.req.file != "undefined" && res.req.file) {
      req.body.product_image_filename = res.req.file.filename;
    } else {
      req.body.product_image_filename =  req.body.product_image;
    }
   
    return Product.findByIdAndUpdate(req.params.id, req.body).then(function (product) {
      res.json({ status: 'OK', product: product });

    })
      .catch(function (err) {
        res.statusCode = 500;
        console.log('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({ error: 'Server error' });
      })

  });

});

/* DELETE product */
router.delete('/:id', function (req, res, next) {
  return Product.findByIdAndDelete(req.params.id).then(function (product) {
    res.send(product);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

module.exports = router;
