App.factory('Auth', function($http, $log){

	var Auth = {
		isAuthenticated: function(){
			if (localStorage.getItem('user')!=null) {
				return true;
			}
			else{
				return false;
			}
		},
		login: function(mail, password){
			var req = {
			 method: 'POST',
			 url: '/auth/login',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: { mail: mail, password: password }
			};
			return $http(req);
		},
		logout: function(){
			localStorage.removeItem('user');
		},
		register: function(mail, username, password){
			var req = {
			 method: 'POST',
			 url: '/auth/register',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: { mail: mail, username: username, password: password }
			};
			return $http(req);
		},
		getUser: function(){
			return JSON.parse(localStorage.getItem('user'));
		},
		checkRight: function(token){
			var req = {
			 method: 'GET',
			 url: '/auth/checkRight?token='+token,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	}

	return Auth;
});