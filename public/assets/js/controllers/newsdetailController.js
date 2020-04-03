App.controller('NewsdetailController', function($scope, Auth, $stateParams, News, Comment, $sce){
	$scope.news=null;
	$scope.user = null;
	$scope.comments = [];
	$scope.new_comment = {
		author: '',
		content: '',
		NewsId: null
	};
	if(Auth.isAuthenticated()){
		$scope.user = Auth.getUser();
	}
	if($stateParams.id){
		News.getNewsById($stateParams.id).then(function(res_news){
			if(res_news.status==200){
				$scope.news = res_news.data;
				$scope.news.content = $sce.trustAsHtml($scope.news.content);
				Comment.getCommentsByNewsId($stateParams.id).then(function(res_comments){
					if(res_comments.status==200){
						$scope.comments = res_comments.data;
					}
				}, function(err_comments){
					console.log(err_comments);
				});
			}
		}, function(err_news){
			console.log(err_news);
		});
	}

	$scope.convertDateTimeToDate = function(datetime){
		if(datetime!=undefined){
			var elements = datetime.split('T')[0].split('-');
			return elements[2]+'/'+elements[1]+'/'+elements[0];
		}
		else{
			return '';
		}
	};

	$scope.convertDateTimeToDateAndTime = function(datetime){
		if(datetime!=undefined){
			var elementsDate = datetime.split('T')[0].split('-');
			var elementsTime = datetime.split('T')[1].split('.')[0];
			return elementsDate[2]+'/'+elementsDate[1]+'/'+elementsDate[0]+' à '+elementsTime;
		}
		else{
			return '';
		}
	};

	$scope.createComment = function(){
		$scope.errors_comment=[];
		if(Auth.isAuthenticated()){
			if($scope.new_comment.content==null||$scope.new_comment.length==0){
				$scope.errors_comment.push("Le commentaire ne peut pas être vide");
			}
			if($scope.errors_comment.length==0){
				$scope.new_comment.author = $scope.user.mail;
				$scope.new_comment.NewsId = $stateParams.id;
				Comment.createComment($scope.new_comment).then(function(res){
					console.log(res);
					if(res.status==200){
						refreshComments();
					}
				}, function(err){
					console.log(err);
				});
			}
		}
		else{
			$scope.errors_comment.push("Vous n'êtes pas connecté !");
		}
	};

	function refreshComments(){
		Comment.getCommentsByNewsId($stateParams.id).then(function(res_comments){
			if(res_comments.status==200){
				$scope.comments = res_comments.data;
			}
		}, function(err_comments){
			console.log(err_comments);
		});
	};

	$scope.removeComment = function(comment){
		Comment.removeComment(comment.id).then(function(res){
			console.log(res);
			refreshComments();
		}, function(err){
			console.log(err);
		});
	};

	function initComment(){
		$scope.new_comment = {
			author: '',
			content: '',
			NewsId: null
		};
	}
});