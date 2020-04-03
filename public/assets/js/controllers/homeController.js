App.controller('HomeController', function($scope, News){
	$scope.news = [];
	$scope.pages = [];
	$scope.actual_page = null;
	$scope.actual_news = [];
	var nb_per_page = 2;

	$scope.btto = {
	    host: window.location.host
	};

	News.getNews().then(function(res){
		if(res.status==200){
			$scope.news = res.data;
			createPages();
		}
	}, function(err){
		console.log(err);
	});

	$scope.convertDateTimeToDate = function(datetime){
		var elements = datetime.split('T')[0].split('-');
		return elements[2]+'/'+elements[1]+'/'+elements[0];
	};

	$scope.convertDateTimeToDay = function(datetime){
		var elements = datetime.split('T')[0].split('-');
		return elements[2];
	};

	$scope.convertDateTimeToMonth = function(datetime){
		var elements = datetime.split('T')[0].split('-');
		if(elements[1]=="01"){
			return "JANVIER";
		}
		else if(elements[1]=="02"){
			return "FEVRIER";
		}
		else if(elements[1]=="03"){
			return "MARS";
		}
		else if(elements[1]=="04"){
			return "AVRIL";
		}
		else if(elements[1]=="05"){
			return "MAI";
		}
		else if(elements[1]=="06"){
			return "JUIN";
		}
		else if(elements[1]=="07"){
			return "JUILLET";
		}
		else if(elements[1]=="08"){
			return "AOUT";
		}
		else if(elements[1]=="09"){
			return "SEPTEMBRE";
		}
		else if(elements[1]=="10"){
			return "OCTOBRE";
		}
		else if(elements[1]=="11"){
			return "NOVEMBRE";
		}
		else if(elements[1]=="12"){
			return "DECEMBRE";
		}
	};

	function createPages(){
		var counter_pages = [];
		var counter = 0;
		$scope.news.forEach(function(element, index, array){
			counter_pages.push(element);
			if(array.length-1==index){
				counter++;
				$scope.pages.push({id:counter, articles:counter_pages});
				if(counter>0){
					$scope.actual_page = 1;
					$scope.actual_news = $scope.pages[0].articles;
				}
			}
			if(counter_pages.length==nb_per_page){
				counter++;
				$scope.pages.push({id:counter, articles:counter_pages});
				counter_pages = [];
				counter_pages.push(element);
			}
		});
	}

	$scope.changePage = function(index){
		$scope.actual_page = index;
		$scope.pages.some(function(element, index, array){
			if($scope.actual_page==element.id){
				$scope.actual_news = element.articles;
				return true;
			}
		});
	}

});