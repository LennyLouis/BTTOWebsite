App.factory('Server', function($http, $log){

	var Server = {
		getServers: function(){
			var req = {
			 method: 'GET',
			 url: '/servers/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getServerById: function(id){
			var req = {
			 method: 'GET',
			 url: '/servers/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getServersByGame: function(id_game, id){
			var req = {
			 method: 'GET',
			 url: '/games/'+id_game+'/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Server;
});