App.factory('User', function($http, $log){

	var User = {
		getUsers: function(){
			var req = {
			 method: 'GET',
			 url: '/users/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		removeUser: function(id){
			var req = {
			 method: 'DELETE',
			 url: '/users/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return User;
});