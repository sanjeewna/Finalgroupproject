var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Orders = require('../models/orders');

/* GET ALL CITYS */
router.get('/', function (req, res, next) {

  console.log("GET - /orders");
  return Orders.aggregate([
    {
      $lookup:
      {
        from: "users",
        localField: "orders_customer_id",
        foreignField: "_id",
        as: "customer_data"
      }
    }
  ]).then(function (orders) {
    res.send(orders);
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});


/* GET ALL CITYS */
router.get('/user-orders/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)
  console.log("GET - /orders/user-orders/:id");
  return Orders.aggregate([
    {
      $lookup:
      {
        from: "users",
        localField: "orders_customer_id",
        foreignField: "_id",
        as: "customer_data"
      }
    },
    { $match: { orders_customer_id: req.params.id } }
  ]).then(function (orders) {
    res.send(orders);
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/* GET SINGLE orders BY ID */
router.get('/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)
  console.log("GET - /orders/:id");
  return Orders.aggregate([
    {
      $lookup:
      {
        from: "users",
        localField: "orders_customer_id",
        foreignField: "_id",
        as: "customer_data"
      }
    },
    { $match: { _id: req.params.id } }
  ]).then(function (orders) {
    res.send(orders[0]);
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/* NEW orders */
router.post('/', function (req, res, next) {
  console.log(req.body);
  req.body.orders_customer_id = new mongoose.Types.ObjectId(req.body.orders_customer_id);
  return Orders.create(req.body).then(function (orders) {
    res.json({ status: 'OK', orders: orders });

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/**
 * Updating existing User
 */
router.put('/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)
  req.body.orders_customer_id = new mongoose.Types.ObjectId(req.body.orders_customer_id);

  return Orders.findByIdAndUpdate(req.params.id, req.body).then(function (orders) {
    res.json({ status: 'OK', orders: orders });

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/* DELETE orders */
router.delete('/:id', function (req, res, next) {
  return Orders.findByIdAndDelete(req.params.id).then(function (orders) {
    res.send(orders);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

module.exports = router;
