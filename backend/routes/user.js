var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');


/**
 * Function for Getting all the users
 */
router.get('/list/:id', function (req, res, next) {
  console.log("GET - /users");
  return User.find({ "user_level_id": req.params.id }).then(function (users) {
    res.send(users);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/* GET SINGLE ROLE BY ID */
router.get('/:id', function (req, res, next) {
  req.params.id = new mongoose.Types.ObjectId(req.params.id)

  return User.findById(req.params.id).then(function (users) {
    res.send(users);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/** 
 * Check Username is already there in  database
 */
router.get('/check-user-exits/:email', function (req, res, next) {
  return User.find({ "user_email": req.params.email }).then(function (users) {
    res.send(users);
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/**
 *  Registering New User
 * */
router.post('/', function (req, res, next) {

  return User.create(req.body).then(function (user) {
    res.json({ status: 'OK', user: user });

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

  return User.findByIdAndUpdate(req.params.id, req.body).then(function (user) {
    res.json({ status: 'OK', user: user });

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

/**
 * Function for User Login
 */
router.post('/login', function (req, res, next) {
  return User.find({
    user_email: req.body.login_email,
    user_password: req.body.login_password
  }).then(function (users) {
    if (Object.keys(users).length == 0) {
      res.status = 404;
      res.json({ status: 404, error: 'Invalid Username and Password' });
    } else {
      res.json({ "status": 200, "message": "Login Successfully", "user_data": users[0] });
    }
  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.json({ status: 404, error: 'Invalid Username and Password' });
    })
});

/**
 * Function for deleting user
 */
router.delete('/:id', function (req, res, next) {
  return User.findByIdAndDelete(req.params.id).then(function (user) {
    res.send(user);

  })
    .catch(function (err) {
      res.statusCode = 500;
      console.log('Internal error(%d): %s', res.statusCode, err.message);
      return res.send({ error: 'Server error' });
    })
});

module.exports = router;
