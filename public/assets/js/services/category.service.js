App.factory('Category', function($http, $log){

	var Category = {
		getCategories: function(){
			var req = {
			 method: 'GET',
			 url: '/categories/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getCategoryById: function(id){
			var req = {
			 method: 'GET',
			 url: '/categories/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getCategoriesByServer: function(id_server, id){
			var req = {
			 method: 'GET',
			 url: '/servers/'+id_server+'/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Category;
});