var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res) {
	var category = models.Category.build();
	
	category.retrieveAll(function(categories) {
		if (categories) {				
		  res.json(categories);
		} else {
		  res.send(404, "Les catégories n'ont pas été trouvés");
		}
	  }, function(error) {
		res.send(404, "Categories not found");
	  });
});

router.get('/:id', function(req, res) {
	var category = models.Category.build();
	category.retrieveById(req.params.id, function(categories) {
		if (categories) {				
		  res.json(categories);
		} else {
		  res.send(404, "La catégorie n'a pas été trouvé");
		}
	  }, function(error) {
		res.send(404, "Category not found");
	  });
});

module.exports = router;