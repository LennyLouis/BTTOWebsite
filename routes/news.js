var express = require('express');
var router = express.Router();
var models  = require('../models');

// middleware to use for all news requests
router.use(function(req, res, next) {
  var account = models.Account.build({});
  var authority = models.Authority.build({});
  if(req.method=="GET"){
  	next();
  }
  else{
  	console.log(req.query.token);
  	account.retrieveByToken(req.query.token, function(accounts){
	  	if(accounts){
	  		console.log(accounts);
	  		req.body.AccountId = accounts.id;
	  		authority.retrieveById(accounts.AuthorityId, function(auth){
	  			if(auth){
	  				console.log(req.method);
	  				console.log(auth);
	  				if(req.method=="PUT"){
			  			if(auth.right=="admin"){
			  				next();
			  			}
			  			else{
							res.send(401, "Access denied !");
			  			}
			  		}
			  		else if(req.method=="POST"){
			  			if(auth.right=="admin"){
			  				next();
			  			}
			  			else{
							res.send(401, "Access denied !");
			  			}
			  		}
			  		else if(req.method=="DELETE"){
			  			if(auth.right=="admin"){
			  				next();
			  			}
			  			else{
							res.send(401, "Access denied !");
			  			}
			  		}
			  		else{
			  			res.send(404, "Access denied !");
			  		}
	  			}
	  			else{
	  				res.send(401, "Access denied !");
	  			}
	  		});
	  	}
	  	else{
	  		res.send(401, "Access denied !");
	  	}
	  }, function(err_accounts){
	  	res.send(401, "Access denied !");
	  });
  }
});

/**
 * @swagger
 * definition:
 *   News:
 *     properties:
 *       id:
 *         type: integer
 *       title:
 *         type: string
 *       description:
 *         type: string
 *       content:
 *         type: string
 *       author:
 *         type: string
 *       image:
 *         type: string
 *       AccountId:
 *         type: integer
 */

/**
 * @swagger
 * /news:
 *   get:
 *     tags:
 *       - News
 *     description: Returns all news
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of news
 *         schema:
 *           $ref: '#/definitions/News'
 */
router.get('/', function(req, res) {
	var news = models.News.build();
	
	news.retrieveAll(function(articles) {
		if (articles) {				
		  res.json(articles);
		} else {
		  res.send(404, "News non trouvé");
		}
	  }, function(error) {
		res.send(404, "News non trouvé");
	  });
});

/**
 * @swagger
 * /news/:news_id:
 *   get:
 *     tags:
 *       - News
 *     description: Returns a news by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of news
 *         schema:
 *           $ref: '#/definitions/News'
 */
router.get('/:news_id', function(req, res) {
	var news = models.News.build();
	console.log(req.params.news_id);
	news.retrieveById(req.params.news_id, function(article) {
		console.log(article);
		if (article) {				
		  res.json(article);
		} else {
		  res.send(404, "News non trouvé");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(404, "News non trouvé");
	  });
});

/**
 * @swagger
 * /news/:news_id:
 *   put:
 *     tags:
 *       - News
 *     description: Update a news by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 1 if updated
 *         schema:
 *           $ref: '#/definitions/News'
 */
router.put('/:news_id', function(req, res) {
	console.log('PUT News !!!!');
	var news = models.News.build({title: req.body.title, description: req.body.description, content:req.body.content, image: req.body.image, modifiedBy: req.body.modifiedBy});
	console.log(req.params.news_id);
	news.updateById(req.params.news_id, function(article) {
		console.log(article);
		if (article) {				
		  res.json(article);
		} else {
		  res.send(500, "News non mis à jour");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(500, "News non mis à jour");
	  });
});

/**
 * @swagger
 * /news:
 *   post:
 *     tags:
 *       - News
 *     description: Add a news
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of news
 *         schema:
 *           $ref: '#/definitions/News'
 */
router.post('/', function(req, res) {
	var title = req.body.title;
	var description = req.body.description;
	var content = req.body.content;
	var image = req.body.image;
	var author = req.body.author;
	var AccountId = req.body.AccountId;
	var news = models.News.build({title: title, description: description, content: content, author: author, image: image, AccountId: AccountId});
	news.add(function(article) {
		if (article) {				
		  res.json(article);
		} else {
		  res.send(500, "News non mis à jour");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(500, "News non mis à jour");
	  });
});

/**
 * @swagger
 * /news/:news_id:
 *   delete:
 *     tags:
 *       - News
 *     description: Remove a news by id
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of news
 *         schema:
 *           $ref: '#/definitions/News'
 */
router.delete('/:news_id', function(req, res){
	var news = models.News.build();
	news.removeById(req.params.news_id, function(success){
		res.json(success);
	}, function(err){
		res.send(500, err);
	});
});

module.exports = router;