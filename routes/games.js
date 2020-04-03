var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res) {
	var Game = models.Game.build();
	Game.retrieveAll(function(games) {
		if (games) {				
		  res.json(games);
		} else {
		  res.send(404, "Aucun jeux trouvés !");
		}
	  }, function(error) {
		res.send(404, "Aucun jeux trouvés !");
	  });
});

router.get('/:game_id', function(req, res) {
	var Game = models.Game.build();
	Game.retrieveById(req.params.game_id, function(game) {
		console.log(game);
		if (game) {				
		  res.json(game);
		} else {
		  res.send(404, "Aucun jeu trouvé");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(404, "Aucun jeu trouvé");
	  });
});

module.exports = router;