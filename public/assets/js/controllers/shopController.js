App.controller('ShopController', function($scope, $stateParams, Server, Category, Article){

	$scope.servers = [];
	$scope.categories = [];
	$scope.current_server = null;
	$scope.current_category = null;
	$scope.articles = null;
	$scope.articleById = null;

	/*if($stateParams.id){
		Article.getArticleByServerId().then(function(res){
			if(res.status==200){
				$scope.articlesById = res.data;
			}
		}, function(err){
			console.log(err);
		});
	}*/

	$scope.tab = 0;

    $scope.setTab = function(newTab){
      $scope.tab = newTab;
    };

    $scope.isSet = function(tabNum){
      return $scope.tab === tabNum;
    };

	Article.getArticles().then(function(res){
		if(res.status==200){
			$scope.articles = res.data;
			//console.log($scope.articles);
		}
	}, function(err){
		console.log(err);
	});

	if($stateParams.id){
		Article.getArticleById($stateParams.id).then(function(res){
			if(res.status==200){
			$scope.articleById = res.data;
			console.log($scope.articleById);
			}
		}, function(err){
			console.log(err);
		});
	}

	$scope.refresh = function(){
		Server.getServers().then(function(response){
			if(response.status==200){
				$scope.servers = response.data;
				Category.getCategories().then(function(response_cat){
					if(response_cat.status==200){
						$scope.categories = response_cat.data;
						//console.log($scope.categories);
					}
				});
			}
		}, function(err){
			console.log(err);
		});
	}

	$scope.selectServer = function(server){
		$scope.current_server = server;
		$scope.current_category = null;
	}

	$scope.selectServer = function(category){
		$scope.current_category = category;
	}

	$scope.refresh();

});