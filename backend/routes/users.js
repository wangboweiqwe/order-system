var express = require('express');
var router = express.Router();
const Users = require('../bin/models/Users');

/* GET users listing. */
router.get('/userslist', function(req, res, next) {
  Users.find().exec((err, data) => {
    if (err) next(err)
    else {
      res.json({
        code: 0,
        data,
      });
    }
  });
});

router.post('/', function(req, res, next) {
  if(req.body.name && req.body.telephone){
    let userData = new Users({
      name: req.body.name,
      hashedPassword: req.body.hashedPassword,
      telephone: req.body.telephone,
      address: req.body.address,
    });
    Users.findOne({ telephone: req.body.telephone }, (err, user) => {
      if (err) return next(err);
      if(user){
        Users.findOneAndUpdate({ telephone: req.body.telephone }, user, (err, user) => {
          return res.json({
            code: 0,
            data: user,
            msg: '更新成功'
          })
        })
      }else{
        userData.save((err, data) => {
          if(err) return next(err);
          else {
            res.json({
              code: 0,
              data
            });
          }
        });      
      }
    })
  }else{
    return res.json({
      code: -1
    })
  }
});


module.exports = router;
