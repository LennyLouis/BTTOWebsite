colorAdminApp.controller('CreateNewsController', function($scope, AuthenticationService, News, $state, $stateParams){
	angular.element(document).ready(function () {
        $('.summernote').summernote({
            placeholder: 'Hi, this is summernote. Please, write text here! Super simple WYSIWYG editor on Bootstrap',
            height: $(window).height() - $('.summernote').offset().top - 180
        });
    });
    $scope.news = {};
    $scope.errors = [];
    $scope.label = {
    	button: ""
    };

    if($stateParams.news){
    	$scope.label = {
	    	button: "Modifier"
	    };
    	$scope.news = $stateParams.news;
    }
    else{
    	$scope.label = {
	    	button: "Créer"
	    };
    	$scope.news = {
			title: "",
			description: "",
			content: "",
			author: "",
			image: "",
			modifiedBy: "",
			AccountId: null
		};
    }

	$scope.createNews = function(){
		resetErrors();
		if($stateParams.news){
			associateArticleUpdated();
			if($scope.news.title==null||$scope.news.title==""){
				$scope.errors.push("Le titre ne doit pas être vide.");
			}
			if($scope.news.description==null||$scope.news.description==""){
				$scope.errors.push("La description ne doit pas être vide.");
			}
			if($scope.news.content==null||$scope.news.content==""){
				$scope.errors.push("La description ne doit pas être vide.");
			}
			if($scope.news.modifiedBy==null||$scope.news.modifiedBy==""){
				$scope.errors.push("Vous devez être connecté pour modifier un article !");
			}
			News.updateNews($scope.news, AuthenticationService.getUser().token).then(function(response){
				if(response.status==200){
					$state.go('app.news.list_news');
				}
				else{
					$scope.errors.push("(err:"+err.status+") Echec lors de la modification de l'article");
				}
			}, function(err){
				$scope.errors.push("(err:"+err.status+") Echec lors de la modification de l'article");
			});
		}
		else{
			associateArticle();
			if($scope.news.title==null||$scope.news.title==""){
				$scope.errors.push("Le titre ne doit pas être vide.");
			}
			if($scope.news.description==null||$scope.news.description==""){
				$scope.errors.push("La description ne doit pas être vide.");
			}
			if($scope.news.content==null||$scope.news.content==""){
				$scope.errors.push("La description ne doit pas être vide.");
			}
			if($scope.news.author==null||$scope.news.author==""){
				$scope.errors.push("Vous devez être connecté pour créer un nouvel article !");
			}
			News.createNews($scope.news, AuthenticationService.getUser().token).then(function(response){
				if(response.status==200){
					$state.go('app.news.list_news');
				}
				else{
					$scope.errors.push("(err:"+err.status+") Echec lors de la création de l'article");
				}
			}, function(err){
				$scope.errors.push("(err:"+err.status+") Echec lors de la création de l'article");
			});
		}
	}

	function associateArticle(){
		$scope.news.author = AuthenticationService.getUser().username;
		$scope.news.content = $('#inputContent').summernote('code');
	}

	function associateArticleUpdated(){
		$scope.news.modifiedBy = AuthenticationService.getUser().username;
		$scope.news.content = $('#inputContent').summernote('code');
	}

	function resetErrors(){
		$scope.errors = [];
	}

});