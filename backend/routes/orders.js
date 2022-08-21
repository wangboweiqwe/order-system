const express = require('express');
const router = express.Router();
const Orders = require('../bin/models/Orders');

router.get('/list', (req, res, next) => {
  if(req.user && req.user.role === 0){
    Orders.count({}, (err, count) => {
      if(err) return next(err);
      Orders.find({}, (err2, data) => {
        if(err) return next(err2);
        res.json({
          code: 0,
          count,
          data
        });
      });
    });
  }else if(req.user && req.user.role === 1){
    let queryJson = {
      user: req.user._id
    }
    Orders.count(queryJson, (err, count) => {
      if(err) return next(err);
      Orders.find(queryJson, (err2, data) => {
        if(err) return next(err2);
        res.json({
          code: 0,
          count,
          data
        });
      });
    });
  }else{
    return res.json({
      //权限不足
      code: -1
    });
  }
});

router.get("/id/:id", (req, res, next) => {
  const id = req.params.id;
  let queryJson = {};
  if(!req.user || (req.user.role === undefined) ){
    return res.json({
      // 用户没权限
      code: -1
    });  
  }else if(req.user.role === 1){
    queryJson = {
      _id: id,
      user: req.user._id
    }
  }else if(req.user.role === 0){
    queryJson._id = id;
  }else{
    return res.json({
      code: -2,
    });
  }
  Orders.findOne(queryJson, (err, data) => {
    if(err) next(err);
    else if(!data){
      res.json({
        // 数据为空
        code: -3
      });
    }else{
      res.json({
        code: 0,
        data
      });
    }
  });
})

router.post('/add', (req, res, next) => {
  let updateJson = req.body
  let order;
  if(!req.user || (req.user.role === undefined) ){
    return res.json({
      // 用户没权限
      code: -1
    });  
  }else if(req.user.role === 1){
    updateJson.user = req.user._id;
    order = new Orders(updateJson);
  }else if(req.user.role === 0){
    order = new Orders(req.body);
  }else {
    return res.json({
      // 用户权限错误
      code: -2
    })
  }
  order.save((err, data) => {
    if(err) next(err);
    else {
      res.json({
        code: 0,
        data
      });
    }
  });
});

module.exports = router;