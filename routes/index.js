var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    title: 'BTTO'
  });
});

router.get('/404', function(req, res) {
  res.render('404', {});
});

module.exports = router;