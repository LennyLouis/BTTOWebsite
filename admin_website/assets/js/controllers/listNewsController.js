colorAdminApp.controller('ListNewsController', function($scope, AuthenticationService, News, $state){

	$scope.news = [];
	$scope.errors = [];
	$scope.row_selected = null;

	$scope.refresh = function(){
		$scope.row_selected = null;
		News.getNews().then(function(response){
			if(response.status==200){
				$scope.news = response.data;
			}
			else{
				$scope.errors.push("(err:"+err.status+") Echec lors de la récupération des articles");
			}
		}, function(err){
			$scope.errors.push("(err:"+err.status+") Echec lors de la récupération des articles");
		});
	}

	$scope.selectRow = function(row){
		if($scope.row_selected!=null&&row.id==$scope.row_selected.id){
			$scope.row_selected = null;
		}
		else{
			$scope.row_selected = row;
		}
	}

	$scope.removeNews = function(){
		console.log("removeNews");
		resetErrors();
		News.removeNews($scope.row_selected.id, AuthenticationService.getUser().token, function(response){
			console.log(response);
			if(response.status==200){
				$scope.refresh();
			}
			else{
				$scope.errors.push("Echec lors de la suppression de l'article !");
			}
		}, function(err){
			$scope.errors.push("Echec lors de la suppression de l'article !");
		});
	}

	function resetErrors(){
		$scope.errors = [];
	}

	$scope.refresh();

});