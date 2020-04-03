var express = require('express');
var router = express.Router();
var models  = require('../models');
var https = require('https');
var http = require('http');

/**
 * @swagger
 * /mojang/status:
 *   get:
 *     tags:
 *       - Mojang
 *     description: Returns all servers states
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of servers with states (green or red)
 */
router.get('/status', function(req, res) {
	var options = {
	  host: 'status.mojang.com',
      path: '/check',
      method: 'GET'
    };
	var request = https.request(options, function(response) {
	  response.setEncoding('utf8');
	  console.log(response.statusCode);
	  response.on('data', function(d) {
	    res.json(JSON.parse(d));
	  });
	});
	request.end();

	request.on('error', function(e) {
	  console.error(e);
	});
});

/**
 * @swagger
 * /mojang/uuid/:username:
 *   get:
 *     tags:
 *       - Mojang
 *     description: Returns uuid by username
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of uuid(s)
 */
router.get('/uuid/:username', function(req, res) {
	var options = {
      host: 'api.mojang.com',
      path: '/users/profiles/minecraft/'+req.params.username+'?at=0',
      method: 'GET'
    };
    var request = https.request(options, function(response) {
	  response.setEncoding('utf8');
	  console.log(response.statusCode);
	  response.on('data', function(d) {
	    res.json(JSON.parse(d));
	  });
	});
	request.end();

	request.on('error', function(e) {
	  console.error(e);
	});
});

/**
 * @swagger
 * /mojang/names/:uuid:
 *   get:
 *     tags:
 *       - Mojang
 *     description: Returns all usernames by uuid
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of usernames
 */
router.get('/names/:uuid', function(req, res) {
	var options = {
      host: 'api.mojang.com',
      path: '/user/profiles/'+req.params.uuid+'/names',
      method: 'GET'
    };
    var request = https.request(options, function(response) {
	  response.setEncoding('utf8');
	  console.log(response.statusCode);
	  response.on('data', function(d) {
	    res.json(JSON.parse(d));
	  });
	});
	request.end();

	request.on('error', function(e) {
	  console.error(e);
	});
});

router.post('/uuids', function(req, res) {
	var options = {
      host: 'https://api.mojang.com',
      path: '/profiles/minecraft',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: req.body
    };
    var request = https.request(options, function(response) {
	  response.setEncoding('utf8');
	  console.log(response.statusCode);
	  response.on('data', function(d) {
	    res.json(JSON.parse(d));
	  });
	});
	request.end();

	request.on('error', function(e) {
	  console.error(e);
	});
	//https://api.mojang.com/profiles/minecraft POST ["maksimkurb","nonExistingPlayer"]
});

router.get('/user', function(req, res) {
	var options = {
      host: 'https://api.mojang.com',
      path: '/user',
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+req.body.acces_token
      }
    };
    var request = https.request(options, function(response) {
	  response.setEncoding('utf8');
	  console.log(response.statusCode);
	  response.on('data', function(d) {
	    res.json(JSON.parse(d));
	  });
	});
	request.end();

	request.on('error', function(e) {
	  console.error(e);
	});
});

/**
 * @swagger
 * /mojang/auth:
 *   post:
 *     tags:
 *       - Mojang
 *     description: Returns a user with his access_token
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A user
 */
router.post('/auth', function(req, res){
	var full_response = ""
	var object = {
		"agent": {                             
	        "name": "Minecraft",                
	        "version": 1                                                              
		},
		"username": req.body.username,
		"password": req.body.password,
		"requestUser": true 
	};
	var options = {
      host: 'authserver.mojang.com',
      path: '/authenticate',
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(object))
      }
    };
    var request = https.request(options, function(response) {
	  response.setEncoding('utf8');
	  console.log(response.statusCode);
	  response.on('data', function(d) {
	  	full_response =full_response+d;
	  });
	  response.on('end', function() {
		res.json(JSON.parse(full_response));
	  });
	});
	request.end(JSON.stringify(object));

	request.on('error', function(e) {
	  console.error(e);
	});
});

router.get('/btto', function(req, res){
	console.log(req.body);
	var options = {
      host: 'mcapi.us',
      path: '/server/status?ip=btto.fr&port=25565',
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    };
    var request = https.request(options, function(response) {
	  response.setEncoding('utf8');
	  console.log(response.statusCode);
	  response.on('data', function(d) {
	    res.json(JSON.parse(d));
	  });
	});
	request.end(JSON.stringify(req.body));

	request.on('error', function(e) {
	  console.error(e);
	});
});

module.exports = router;