var express = require('express');
var router = express.Router();
var models  = require('../models');

/**
 * @swagger
 * definition:
 *   Comment:
 *     properties:
 *       id:
 *         type: integer
 *       author:
 *         type: string
 *       content:
 *         type: string
 *       NewsId:
 *         type: integer
 */

router.get('/:news_id', function(req, res) {
	var comment = models.Comment.build();
	console.log(req.params.news_id);
	comment.retrieveByNewsId(req.params.news_id, function(comments) {
		console.log(comments);
		if (comments) {				
		  res.json(comments);
		} else {
		  res.send(404, "Commentaires non trouvé");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(404, "Commentaires non trouvé");
	  });
});

router.put('/:comment_id', function(req, res) {
	console.log('PUT Comment !!!!');
	var comment = models.Comment.build({author: req.body.author, content:req.body.content});
	console.log(req.params.comment_id);
	comment.updateById(req.params.comment_id, function(comments) {
		console.log(comments);
		if (comments) {				
		  res.json(comments);
		} else {
		  res.send(500, "Commentaire non mis à jour");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(500, "Commentaire non mis à jour");
	  });
});

router.post('/', function(req, res) {
	console.log('POST Comment !!!!');
	var content = req.body.content;
	var author = req.body.author;
	var NewsId = req.body.NewsId;
	var comment = models.Comment.build({author: author, content: content, NewsId: NewsId});
	comment.add(function(comments) {
		console.log(comments);
		if (comments) {				
		  res.json(comments);
		} else {
		  res.send(500, "Commentaire non ajouté ");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(500, "Commentaire non ajouté");
	  });
});

router.delete('/:comment_id', function(req, res){
	var comment = models.Comment.build();
	comment.removeById(req.params.comment_id, function(success){
		res.json(success);
	}, function(err){
		res.send(500, err);
	});
});

module.exports = router;