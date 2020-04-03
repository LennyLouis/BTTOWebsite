var express = require('express');
var router = express.Router();
var models  = require('../models');

/**
 * @swagger
 * definition:
 *   Authority:
 *     properties:
 *       id:
 *         type: integer
 *       right:
 *         type: string
 */

 /**
 * @swagger
 * /authorities:
 *   get:
 *     tags:
 *       - Authorities
 *     description: Returns all authorities
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of authorities
 *         schema:
 *           $ref: '#/definitions/Authority'
 */
router.get('/', function(req, res) {
	var authority = models.Authority.build();
	
	authority.retrieveAll(function(authorities) {
		if (authorities) {				
		  res.json(authorities);
		} else {
		  res.send(401, "Authorities not found");
		}
	  }, function(error) {
		res.send("Authorities not found");
	  });
});

module.exports = router;