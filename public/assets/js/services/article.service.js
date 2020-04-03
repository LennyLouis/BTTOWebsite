App.factory('Article', function($http, $log){

	var Article = {
		getArticles: function(){
			var req = {
			 method: 'GET',
			 url: '/articles/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getArticleById: function(id){
			var req = {
			 method: 'GET',
			 url: '/articles/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getArticleByServerId: function(id){
			var req = {
			 method: 'GET',
			 url: '/articles/'+id_server,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getArticlesByCategory: function(id_cat, id){
			var req = {
			 method: 'GET',
			 url: '/categories/'+id_cat+'/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Article;
});