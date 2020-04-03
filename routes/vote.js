var express = require('express');
var router = express.Router();
var models  = require('../models');

// middleware to use for all requests
	// router.use(function(req, res, next) {
	//   var account = models.Account.build({});
	//   account.retrieveByToken(req.query.token, function(accounts){
	//   	if(accounts){
	//   		if(req.method=="PUT"){
	//   			if(accounts.right=="admin"){
	//   				next();
	//   			}
	//   			else{
	// 				res.send(401, "Authorization denied !");
	//   			}
	//   		}
	//   		else if(req.method=="GET"){
	//   			if(req._parsedUrl.pathname=='/'){
	//   				console.log('/ OK !');
	//   				if(accounts.right=="admin"){
	// 	  				next();
	// 	  			}
	// 	  			else{
	// 					res.send(401, "Authorization denied !");
	// 	  			}
	//   			}
	//   			else if(req._parsedUrl.pathname.indexOf('/mail')>=0){
	//   				if(accounts.right=="admin"){
	// 	  				next();
	// 	  			}
	// 	  			else{
	// 					res.send(401, "Authorization denied !");
	// 	  			}
	//   			}
	//   			else{
	//   				//faille si un utilisateur s'approprie un compte (admin) qui n'est pas le sien et qu'il chope le token
	//   				if(accounts.id==req._parsedUrl.pathname.split('/')[1]){
	//   					next();
	//   				}
	//   				else{
	//   					res.send(401, "Authorization denied !");
	//   				}
	//   			}
	//   		}
	//   		else{
	//   			res.send(404, "API doesn't exist !");
	//   		}
	//   	}
	//   	else{
	//   		res.send(401, "Authorization denied !");
	//   	}
	//   }, function(err_accounts){
	//   	res.send(401, "Authorization denied !");
	//   });
	// });


router.get('/', function(req, res) {
	var vote = models.Vote.build();
	
	vote.retrieveAll(function(votesite) {
		if (votesite) {				
		  res.json(votesite);
		} else {
		  res.send(404, "Les sites de vote n'ont pas étés trouvés");
		}
	  }, function(error) {
		res.send(404, "Vote websites not found");
	  });
});

module.exports = router;