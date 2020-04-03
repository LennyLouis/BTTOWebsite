var express = require('express');
var router = express.Router();
var models  = require('../models');

// middleware to use for all requests
router.use(function(req, res, next) {
  var account = models.Account.build({});
  account.retrieveByToken(req.query.token, function(accounts){
  	if(accounts){
  		if(req.method=="PUT"){
  			if(accounts.right=="admin"){
  				next();
  			}
  			else{
				res.send(401, "Authorization denied !");
  			}
  		}
  		else if(req.method=="GET"){
  			if(req._parsedUrl.pathname=='/'){
  				console.log('/ OK !');
  				if(accounts.right=="admin"){
	  				next();
	  			}
	  			else{
					res.send(401, "Authorization denied !");
	  			}
  			}
  			else if(req._parsedUrl.pathname.indexOf('/mail')>=0){
  				if(accounts.right=="admin"){
	  				next();
	  			}
	  			else{
					res.send(401, "Authorization denied !");
	  			}
  			}
  			else{
  				//faille si un utilisateur s'approprie un compte (admin) qui n'est pas le sien et qu'il chope le token
  				if(accounts.id==req._parsedUrl.pathname.split('/')[1]){
  					next();
  				}
  				else{
  					res.send(401, "Authorization denied !");
  				}
  			}
  		}
  		else{
  			res.send(404, "API doesn't exist !");
  		}
  	}
  	else{
  		res.send(401, "Authorization denied !");
  	}
  }, function(err_accounts){
  	res.send(401, "Authorization denied !");
  });
});

/**
 * @swagger
 * definition:
 *   Account:
 *     properties:
 *       id:
 *         type: integer
 *       username:
 *         type: string
 *       token:
 *         type: string
 *       UserId:
 *         type: integer
 */

 /**
 * @swagger
 * /accounts:
 *   get:
 *     tags:
 *       - Accounts
 *     description: Returns all accounts
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of accounts
 *         schema:
 *           $ref: '#/definitions/Account'
 */
router.get('/', function(req, res) {
	var account = models.Account.build();
	
	account.retrieveAll(function(accounts) {
		if (accounts) {				
		  res.json(accounts);
		} else {
		  res.send(401, "Accounts not found");
		}
	  }, function(error) {
		res.send("Accounts not found");
	  });
});

 /**
 * @swagger
 * /accounts/:account_id:
 *   get:
 *     tags:
 *       - Accounts
 *     description: Returns an account by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of accounts
 *         schema:
 *           $ref: '#/definitions/Account'
 */
router.get('/:account_id', function(req, res) {
	console.log('GET');
	var account = models.Account.build();
	console.log(req.params.account_id);
	account.retrieveById(req.params.account_id, function(accounts) {
		console.log(accounts);
		if (accounts) {				
		  res.json(accounts);
		} else {
		  res.send(401, "Account not found");
		}
	  }, function(error) {
	  	console.log(error);
		res.send("Account not found");
	  });
});

 /**
 * @swagger
 * /accounts/mail/:mail:
 *   get:
 *     tags:
 *       - Accounts
 *     description: Returns an account by mail
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of accounts
 *         schema:
 *           $ref: '#/definitions/Account'
 */
router.get('/mail/:mail', function(req, res) {
	console.log("MAIL");
	var user = models.User.build();
	var account = models.Account.build();
	console.log(req.params.mail);
	user.retrieveByMail(req.params.mail, function(users){
		if(users){
			account.retrieveByUserId(users.id, function(accounts) {
			console.log(accounts);
			if (accounts) {				
			  res.json(accounts);
			} else {
			  res.send(404, "Account non trouvé !");
			}
		  }, function(err_account) {
		  	console.log(error);
			res.send(404, "Account non trouvé !");
		  });
		}
		else{
			res.send(404, "Utilisateur non trouvé !");
		}
	}, function(err_user){
		console.log(err_user);
		res.send(404, "Utilisateur non trouvé !");
	});
});

 /**
 * @swagger
 * /accounts/:UserId:
 *   put:
 *     tags:
 *       - Accounts
 *     description: Update right's account by UserId
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of accounts
 *         schema:
 *           $ref: '#/definitions/Account'
 */
router.put('/:UserId', function(req, res) {
	console.log('PUT Account !!!!');
	console.log(req.body.right);
	var account = models.Account.build({right: req.body.right});
	console.log(req.params.UserId);
	account.updateByUserId(req.params.UserId, function(accounts) {
		console.log(accounts);
		if (accounts) {				
		  res.json(accounts);
		} else {
		  res.send(401, "Account not found");
		}
	  }, function(error) {
	  	console.log(error);
		res.send("Account not found");
	  });
});

module.exports = router;