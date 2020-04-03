var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res) {
	var article = models.Article.build();
	
	article.retrieveAll(function(articles) {
		if (articles) {				
		  res.json(articles);
		} else {
		  res.send(404, "Les articles n'ont pas été trouvés");
		}
	  }, function(error) {
		res.send(404, "Articles not found");
	  });
});

router.get('/:id', function(req, res) {
	var article = models.Article.build();
	article.retrieveById(req.params.id, function(articles) {
		if (articles) {				
		  res.json(articles);
		} else {
		  res.send(404, "L'article n'a pas été trouvé");
		}
	  }, function(error) {
		res.send(404, "Article not found");
	  });
});

module.exports = router;