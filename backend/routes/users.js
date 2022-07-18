var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const UsersSchema = require('../bin/models/Users');
const Users = mongoose.model('Users', UsersSchema);

/* GET users listing. */
router.get('/userslist', function(req, res, next) {
  Users.find({}).exec((err, data) => {
    if (err) {
      console.log("Error:" + err);
    }
    else {
      res.json({
        code: 0,
        data,
      });
    }
  });
});

router.post('/', function(req, res, next) {
  let user = new Users({
    name: req.body.name,
    telephone: req.body.telephone,
    address: req.body.address
  });
  user.save((err, data) => {
    if(err) return next(err);
    else {
      res.json({
        code: 0,
        data
      });
    }
  });
});


module.exports = router;
