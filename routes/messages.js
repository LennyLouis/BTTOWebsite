var express = require('express');
var router = express.Router();
var models  = require('../models');

router.get('/', function(req, res) {
	var message = models.Message.build();
	message.retrieveAll(function(messages) {
		console.log(messages);
		if(messages){	
		  console.log('il y a des messages');
		  res.json(messages);
		} else {
		  res.send(404, "Messages non trouvé");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(404, "Messages non trouvé");
	  });
});

router.get('/:message_id', function(req, res) {
	var message = models.Message.build();
	console.log(req.params.message_id);
	message.retrieveById(req.params.message_id, function(messages) {
		console.log(messages);
		if (messages) {				
		  res.json(messages);
		} else {
		  res.send(404, "Messages non trouvé");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(404, "Messages non trouvé");
	  });
});

router.put('/:messages_id', function(req, res) {
	console.log('PUT Message !!!!');
	var message = models.Message.build({name: req.body.name, mail: req.body.message, title: req.body.title, content:req.body.content, read: req.body.read});
	console.log(req.params.message_id);
	message.updateById(req.params.message_id, function(messages) {
		console.log(messages);
		if (messages) {				
		  res.json(messages);
		} else {
		  res.send(500, "Message non mis à jour");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(500, "Message non mis à jour");
	  });
});

router.post('/', function(req, res) {
	console.log('POST Message !!!!');
	var content = req.body.content;
	var name = req.body.name;
	var mail = req.body.mail;
	var title = req.body.title;
	var message = models.Message.build({name: name, mail: mail, title: title, content: content, read: false});
	message.add(function(messages) {
		console.log(messages);
		if (messages) {				
		  res.json(messages);
		} else {
		  res.send(500, "Message non ajouté ");
		}
	  }, function(error) {
	  	console.log(error);
		res.send(500, "Message non ajouté");
	  });
});

router.delete('/:message_id', function(req, res){
	var message = models.Message.build();
	message.removeById(req.params.message_id, function(success){
		res.json(success);
	}, function(err){
		res.send(500, err);
	});
});

module.exports = router;