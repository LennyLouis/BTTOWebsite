var express = require('express');
var router = express.Router();
var models  = require('../models');
var crypto = require('crypto');

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log('middleware USER !!!');
  next();
});

/**
 * @swagger
 * definition:
 *   User:
 *     properties:
 *       id:
 *         type: integer
 *       mail:
 *         type: string
 *       password:
 *         type: string
 *       token_reset_password:
 *         type: string
 */

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/', function(req, res) {
	var user = models.User.build();
	
	user.retrieveAll(function(users) {
		if (users) {				
		  res.json(users);
		} else {
		  res.send(401, "User not found");
		}
	  }, function(error) {
		res.send("User not found");
	  });
});

/**
 * @swagger
 * /users/:user_id:
 *   get:
 *     tags:
 *       - Users
 *     description: Returns a user by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.get('/:user_id', function(req, res) {
	var user = models.User.build();
	user.retrieveById(req.params.user_id, function(users) {
		if (users) {				
		  res.json(users);
		} else {
		  res.send(404, "Utilisateur non trouvé !");
		}
	  }, function(error) {
		res.send(404, "Utilisateur non trouvé !");
	  });
});

/**
 * @swagger
 * /users/:user_id:
 *   put:
 *     tags:
 *       - Users
 *     description: Update a user by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The user updated
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.put('/:user_id', function(req, res){
	var user = models.User.build({username: username, password: password});

	user.updateById(req.params.user_id, function(success){
		res.json(success);
	},
	function(err) {
		res.send(err);
	});
});

/**
 * @swagger
 * /users/:user_id:
 *   delete:
 *     tags:
 *       - Users
 *     description: Delete a user by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The user deleted
 *         schema:
 *           $ref: '#/definitions/User'
 */
router.delete('/:user_id', function(req, res){
	var user = models.User.build();
	var account = models.Account.build();

	account.removeByUserId(req.params.user_id, function(success2){
		user.removeById(req.params.user_id, function(success){
			res.json(success);
		},
		function(err) {
			res.send(500, err);
		});
	}, function(err2){
		res.send(500, err2);
	});
});

module.exports = router;