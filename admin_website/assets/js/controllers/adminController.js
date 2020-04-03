colorAdminApp.controller('AdminController', function($scope, Auth, $location){

	if(Auth.isAuthenticated()){
		Auth.checkRight(Auth.getUser().token).then(function(response){
			console.log(response);
		}, function(err){
			console.log(err);
			$location.path('/');
		});
	}
	else{
		$location.path('/');
	}

});