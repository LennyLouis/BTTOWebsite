App.factory('Game', function($http, $log){

	var Game = {
		getGames: function(){
			var req = {
			 method: 'GET',
			 url: '/games/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getGameById: function(id){
			var req = {
			 method: 'GET',
			 url: '/games/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Game;
});