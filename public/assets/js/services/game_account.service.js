App.factory('Game_account', function($http, $log){

	var Game_account = {
		getGameAccounts: function(token){
			var req = {
			 method: 'GET',
			 url: '/game_accounts/?token='+token,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		createGameAccount: function(token, GameId, username, game_id){
			var req = {
			 method: 'POST',
			 url: '/game_accounts/',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {token: token, GameId: GameId, username: username, game_id: game_id}
			};
			return $http(req);
		},
		deleteGameAccount: function(token, id){
			var req = {
			 method: 'DELETE',
			 url: '/game_accounts/',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {token: token, id: id}
			};
			return $http(req);
		}
	};

	return Game_account;
});