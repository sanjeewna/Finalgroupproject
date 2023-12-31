var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sell = require('../models/sell');

/* GET ALL CITYS */
router.get('/all-sells/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)

  console.log("GET - /sell");
  return Sell.aggregate([
    {
      $lookup:
      {
        from: "product",
        localField: "sell_product_id",
        foreignField: "_id",
        as: "product_data"
      }
    },
    { $match: { sell_orders_id: req.params.id } }
  ]).then(function (sell) {
    res.send(sell);
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/* GET SINGLE sell BY ID */
router.get('/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)
  console.log("GET - /sell/:id");
  return Sell.aggregate([
    {
      $lookup:
      {
        from: "users",
        localField: "sell_orders_id",
        foreignField: "_id",
        as: "orders_data"
      }
    },
    { $match: { _id: req.params.id } }
  ]).then(function (sell) {
    res.send(sell[0]);
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/* NEW sell */
router.post('/', function (req, res, next) {
  console.log(req.body);
  req.body.sell_orders_id = new mongoose.Types.ObjectId(req.body.sell_orders_id);
  req.body.sell_product_id = new mongoose.Types.ObjectId(req.body.sell_product_id);

  return Sell.create(req.body).then(function (sells) {
    res.json({ status: 'OK', sells: sells });

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/* DELETE sell */
router.delete('/:id', function (req, res, next) {
  return Sell.findByIdAndDelete(req.params.id).then(function (sell) {
    res.send(sell);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

module.exports = router;
