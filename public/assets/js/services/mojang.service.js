App.factory('Mojang', function($http, $log){

	var Mojang = {
		auth: function(mail, password){
			var req = {
			 method: 'POST',
			 url: '/mojang/auth',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {username: mail, password: password}
			};
			return $http(req);
		},
		skstatFreebuild: function(){
			var req = {
			 method: 'GET',
			 url: '/skstats',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Mojang;
});