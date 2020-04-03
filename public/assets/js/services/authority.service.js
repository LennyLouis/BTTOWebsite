App.factory('Authority', function($http, $log){

	var Authority = {
		getAuthorities: function(){
			var req = {
			 method: 'GET',
			 url: '/authorities/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Authority;
});