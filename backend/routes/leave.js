var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Leave = require('../models/leave');

/* GET ALL leaveestatus */
router.get('/', function (req, res, next) {

  Leave.aggregate([
  {
    $lookup:
    {
      from: "users",
      localField: "leave_user_id",
      foreignField: "_id",
      as: "users_data"
    }
  },
  {
    $lookup:
    {
      from: "leavestatuses",
      localField: "leave_ls_id",
      foreignField: "_id",
      as: "ls_data"
    }
  }
], function (err, leave) {
    if (err) {
      return next(err);
    }
    res.json({ "leave_list": leave });
  });

});

/* GET SINGLE leave BY ID */
router.get('/:id', function (req, res, next) {
  Leave.findById(req.params.id, function (err, leave) {
    if (err) {
      return next(err);
    }
    res.json({ "leave_data": leave });
  });
});

/* NEW leave */
router.post('/', function (req, res, next) {
  console.log(req.body);
  req.body.leave_user_id = mongoose.Types.ObjectId(req.body.leave_user_id);
  req.body.leave_ls_id = mongoose.Types.ObjectId(req.body.leave_ls_id);
  
  Leave.create(req.body, function (err, leave) {
    if (err) {
      return next(err);
    }
    res.json({ status: 'OK', leave: leave });
  });
});

/* UPDATE leave */
router.put('/:id', function (req, res, next) {
  req.body.leave_user_id = mongoose.Types.ObjectId(req.body.leave_user_id);
  req.body.leave_ls_id = mongoose.Types.ObjectId(req.body.leave_ls_id);
  
  Leave.findByIdAndUpdate(req.params.id, req.body, function (err, leave) {
    if (err) {
      return next(err);
    }
    res.json(leave);
  });
});

/* DELETE leave */
router.delete('/:id', function (req, res, next) {
  Leave.findByIdAndRemove(req.params.id, req.body, function (err, leave) {
    if (err) {
      return next(err);
    }
    res.json(leave);
  });
});

module.exports = router;
