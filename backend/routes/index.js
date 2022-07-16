var express = require('express');
var router = express.Router();
let path = require('path');

/* GET home page. */
router.get('/*', function(req, res, next) {
  let html = path.join(__dirname, '..', '..', 'frontend', 'build', 'index.html');
  res.sendFile(html);
});

module.exports = router;
