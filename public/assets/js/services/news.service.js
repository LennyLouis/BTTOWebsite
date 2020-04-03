App.factory('News', function($http, $log){

	var New = {
		getNews: function(){
			var req = {
			 method: 'GET',
			 url: '/news/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getNewsById: function(id){
			var req = {
			 method: 'GET',
			 url: '/news/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		createNews: function(news, token){
			console.log(news);
			var req = {
			 method: 'POST',
			 url: '/news/?token='+token,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {title: news.title, description: news.description, content: news.content, author: news.author, image: news.image, modifiedBy: null, AccountId: news.AccountId}
			};
			return $http(req);
		},
		updateNews: function(news, token){
			console.log(news.modifiedBy);
			var req = {
			 method: 'PUT',
			 url: '/news/'+news.id+"?token="+token,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {title: news.title, description: news.description, content: news.content, author: news.author, image: news.image, modifiedBy: news.modifiedBy, AccountId: news.AccountId}
			};
			return $http(req);
		},
		removeNews: function(id, token){
			var req = {
			 method: 'DELETE',
			 url: '/news/'+id+"?token="+token,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return New;
});