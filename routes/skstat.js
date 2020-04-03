var express = require('express');
var router = express.Router();
var path = require('path');
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";
var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var sequelize = new Sequelize(config.database, config.username, config.password, config);

router.get('/', function(req, res) {
	sequelize.query("SELECT * FROM `skstat_freebuild_Player`", { type: sequelize.QueryTypes.SELECT})
  .then(function(stats) {
    // We don't need spread here, since only the results will be returned for select queries
    res.json(stats);
  }, function(err){
    res.send(500, err);
  })

});

module.exports = router;