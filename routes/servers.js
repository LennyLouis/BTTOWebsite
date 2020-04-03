var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res) {
	var server = models.Server.build();
	
	server.retrieveAll(function(servers) {
		if (servers) {				
		  res.json(servers);
		} else {
		  res.send(404, "Les serveurs n'ont pas été trouvés");
		}
	  }, function(error) {
		res.send(404, "Servers not found");
	  });
});

router.get('/:id', function(req, res) {
	var server = models.Server.build();
	server.retrieveById(req.params.id, function(servers) {
		if (servers) {				
		  res.json(servers);
		} else {
		  res.send(404, "Le serveur n'a pas été trouvé");
		}
	  }, function(error) {
		res.send(404, "Server not found");
	  });
});

module.exports = router;