var express = require('express');
var router = express.Router();
var models  = require('../models');
var crypto = require('crypto');

router.post('/admin/login', function(req, res) {
	var user = models.User.build();
	var account = models.Account.build();
	var authority = models.Authority.build();
	user.retrieveByMail(req.body.mail, function(users) {
		if (users) {
			var shasum = crypto.createHash('sha1');
            shasum.update(req.body.password);
            if(users.password==shasum.digest('hex')){
            	account.retrieveByUserId(users.id, function(acc){
            		if(acc){
            			authority.retrieveByRight('admin', function(auth){
            				if(auth.id==acc.AuthorityId){
            					account.updateTokenById(acc.id, function(new_acc){
		            				if(new_acc){
		            					account.retrieveByUserId(users.id, function(new_account){
		            						if(new_account){
		            							var data = {
						            				mail: users.mail,
						            				username: new_account.username,
						            				token: new_account.token
						            			};
						            			res.json(data);
		            						}
		            						else{
		            							res.send(404, {message: "Aucun compte !"});
		            						}
		            					}, function(err_new_account){
		            						res.send(404, {message: "Aucun compte !"});
		            					});
		            				}
		            				else{
		            					res.send(500, {message: "Problème token !"});
		            				}
		            			}, function(err_new_acc){
		            				res.send(500, {message: "Problème token !"});
		            			});
            				}
            				else{
            					res.send(500, {message: "Accès refusé !"});
            				}
            			}, function(err_auth){
            				res.send(404, {message: err_auth});
            			});
            		}
            		else{
            			res.send(404, {message: "Aucun compte !"});
            		}
            	}, function(err){
            		res.send(404, {message: "Aucun compte !"});
            	});
            }
            else{
            	res.send(401, {message: "Mot de passe incorrect !"});
            }			
		} else {
		  res.send(404, {message: "Adresse mail incorrecte !"});
		}
	  }, function(error) {
		res.send(404, {message: "User not found"});
	});
});

/**
 * @swagger
 * definition:
 *   Auth:
 *     properties:
 *       mail:
 *         type: string
 *       token:
 *         type: string
 *       right:
 *         type: string
 */

/**
 * @swagger
 * /auth/login:
 *   get:
 *     tags:
 *       - Auth
 *     description: Returns user connected
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The user connected
 *         schema:
 *           $ref: '#/definitions/Auth'
 */
router.post('/login', function(req, res) {
	var user = models.User.build();
	var account = models.Account.build();
	user.retrieveByMail(req.body.mail, function(users) {
		if (users) {
			var shasum = crypto.createHash('sha1');
            shasum.update(req.body.password);
            if(users.password==shasum.digest('hex')){
            	account.retrieveByUserId(users.id, function(acc){
            		if(acc){
            			account.updateTokenById(acc.id, function(new_acc){
            				if(new_acc){
            					account.retrieveByUserId(users.id, function(new_account){
            						if(new_account){
            							var data = {
				            				mail: users.mail,
				            				username: new_account.username,
				            				token: new_account.token
				            			};
				            			res.json(data);
            						}
            						else{
            							res.send(404, {message: "Aucun compte !"});
            						}
            					}, function(err_new_account){
            						res.send(404, {message: "Aucun compte !"});
            					});
            				}
            				else{
            					res.send(500, {message: "Problème token !"});
            				}
            			}, function(err_new_acc){
            				res.send(500, {message: "Problème token !"});
            			});
            		}
            		else{
            			res.send(404, {message: "Aucun compte !"});
            		}
            	}, function(err){
            		res.send(404, {message: "Aucun compte !"});
            	});
            }
            else{
            	res.send(401, {message: "Mot de passe incorrect !"});
            }			
		} else {
		  res.send(404, {message: "Adresse mail incorrecte !"});
		}
	  }, function(error) {
		res.send(404, {message: "User not found"});
	});
});

 /**
 * @swagger
 * /auth/register:
 *   get:
 *     tags:
 *       - Auth
 *     description: Returns user connected
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The user connected
 *         schema:
 *           $ref: '#/definitions/Auth'
 */
router.post('/register', function(req, res) {
	var password = req.body.password;
	var mail = req.body.mail;
	var username = req.body.username;
	
	var user = models.User.build({ mail: mail, password: password });
	var authority = models.Authority.build();

	user.add(function(new_user){
		authority.retrieveByRight('user', function(auth){
			if(auth){
				var account = models.Account.build({ username: username, token: null, AuthorityId: auth.id, UserId: new_user.id});
				account.add(function(new_account){
					var user = {
						mail: new_user.mail,
						username: new_account.username,
						token: new_account.token,
						right: new_account.right
					};
					res.json(user);
				}, function(er){
					res.send(401, {message: er});
				});
			}
			else{
				res.send(401, {message: 'Aucun droit trouvé !'});
			}
		}, function(error){
			res.send(401, {message: error});
		});
	},
	function(err) {
		res.send(401, {message: err});
	});
});

router.get('/checkRight', function(req, res) {
	var token = req.query.token;
	var account = models.Account.build({});
	if(token==null||token==''){
		console.log('token NULL !');
		console.log(token);
		res.send(401, "Access denied !");
	}
	else{
		account.retrieveByToken(token, function(res_account){
			if(res_account){
				if(res_account.right=="admin"){
					res.json(res_account);
				}
				else{
					res.send(401, "Access denied !");
				}
			}
			else{
				res.send(401, "Access denied !");
			}
		}, function(err_account){
			res.send(401, "Access denied !");
		});	
	}
});

module.exports = router;