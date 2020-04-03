App.controller('VoteController', function($scope, Vote, Auth){
	console.log('VoteController !!!');

	$scope.vote = [];
	$scope.user = null;

	if(Auth.isAuthenticated()){
		$scope.user = Auth.getUser();
	}

	Vote.getVotes().then(function(response){
		console.log(response);
		if(response.status==200){
			$scope.vote = response.data;
		}
	}, function(err){
		console.log(err);
	});
});