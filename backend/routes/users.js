var express = require('express');
var router = express.Router();
const Users = require('../bin/models/Users');

router.get('/userslist', function(req, res, next) {
  if(req.user && req.user.role === 0){
    Users.find().exec((err, data) => {
      if (err) next(err)
      else {
        res.json({
          code: 0,
          data,
        });
      }
    });  
  }else{
    res.json({
      // 没有权限
      code: -1
    })
  }
});

router.get('/self', (req, res, next) => {
  if(req.user){
    res.json({
      code: 0,
      user: req.user
    });  
  }else{
    res.json({
      // 未登录
      code: -1,
    })
  }
})

router.get('/id/:id', (req, res, next) => {
  if(req.user && req.user.role === 0){
    const queryJson = {
      _id: req.params.id,
      role: 1
    }
    Users.findOne(queryJson, (err, data) => {
      if(err) next(err);
      else if(!data){
        res.json({
          // 用户不是普通用户或用户不存在
          code: -2
        })
      }
      else{
        res.json({
          code: 0,
          data
        });
      }
    });
  }else{
    // 未登录
    res.json({
      code: -1
    })
  }
});

router.put('/self', (req, res, next) => {
  if(req.user){
    let queryJson = {
      _id: req.user.id
    }
    let updateJson = req.body;
    Users.findByIdAndUpdate(queryJson, updateJson, (err, data) => {
      if(err) next(err);
      else{
        res.json({
          code: 0,
          data
        });
      }
    });
  }else{
    res.json({
      // 未登录
      code: -1
    })
  }
})

router.post('/', function(req, res, next) {
  if(req.body.name && req.body.telephone){
    let queryJson = {
      name: req.body.name
    }
    Users.findOne(queryJson, (err, user) => {
      if (err) return next(err);
      if(user){
        res.json({
          code: -2,
          msg: '用户名已经存在'
        });
      }else{
        let queryJson = {
          telephone: req.body.telephone
        }
        Users.findOne(queryJson, (err, user) => {
          if (err) return next(err);
          if(user){
            res.json({
              code: -2,
              msg: '电话号码已经存在'
            });
          }else{
            let userData = new Users(req.body);
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
