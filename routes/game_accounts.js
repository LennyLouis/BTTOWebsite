var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res) {
	var Game_account = models.Game_account.build();
	var Account = models.Account.build();
	Account.retrieveByToken(req.query.token, function(acc){
		if(acc){
			Game_account.retrieveByAccountId(acc.id, function(game_accounts) {
				if (game_accounts) {				
				  res.json(game_accounts);
				} else {
				  res.send(404, "Aucun compte de jeu trouvé !");
				}
			}, function(error) {
				res.send(500, "Aucun compte de jeu trouvé !");
			});
		}
		else{
			res.send(404, "Aucun compte associé !");
		}
	}, function(err_acc){
		res.send(500, "Aucun compte associé !");
	});
});

router.post('/', function(req, res) {
	console.log('route !');
	var Account = models.Account.build();
	Account.retrieveByToken(req.body.token, function(acc){
		if(acc){
			console.log(acc);
			var Game_account = models.Game_account.build({game_id: req.body.game_id, username: req.body.username, AccountId: acc.id, GameId: req.body.GameId});
			Game_account.add(function(game_accounts) {
				if (game_accounts) {
				console.log(game_accounts);				
				  res.json(game_accounts);
				} else {
				  res.send(404, "Compte de jeu non créé !");
				}
			}, function(error) {
				res.send(500, "Compte de jeu non créé !");
			});
		}
		else{
			res.send(404, "Aucun compte associé !");
		}
	}, function(err_acc){
		res.send(500, "Aucun compte associé !");
	});
});

router.delete('/', function(req, res) {
	var Game_account = models.Game_account.build();
	var Account = models.Account.build();
	Account.retrieveByToken(req.body.token, function(acc){
		if(acc){
			Game_account.deleteById(req.body.id, function(game_account_deleted) {
				if (game_account_deleted) {
				  console.log(game_account_deleted);				
				  res.json(game_account_deleted)
				} else {
				  res.send(404, "Aucun compte de jeu supprimé !");
				}
			}, function(error) {
				res.send(500, "Aucun compte de jeu supprimé !");
			});
		}
		else{
			res.send(404, "Aucun compte associé !");
		}
	}, function(err_acc){
		res.send(500, "Aucun compte associé !");
	});
});

module.exports = router;