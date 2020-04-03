colorAdminApp.factory('News', function($http, $log, $window){

	var host = "http://"+$window.location.host;

	var New = {
		getNews: function(){
			var req = {
			 method: 'GET',
			 url: host+'/news/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getNewsById: function(id){
			var req = {
			 method: 'GET',
			 url: host+'/news/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		createNews: function(news, token){
			var req = {
			 method: 'POST',
			 url: host+'/news/?token='+token,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {title: news.title, description: news.description, content: news.content, author: news.author, image: news.image, modifiedBy: null, AccountId: news.AccountId}
			};
			return $http(req);
		},
		updateNews: function(news, token){
			var req = {
			 method: 'PUT',
			 url: host+'/news/'+news.id+"?token="+token,
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
			 url: host+'/news/'+id+"?token="+token,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return New;
});