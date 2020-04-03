App.factory('Vote', function($http, $log){

	var Vote = {
		getVotes: function(){
			var req = {
			 method: 'GET',
			 url: '/vote/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getVoteById: function(id){
			var req = {
			 method: 'GET',
			 url: '/vote/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Vote;
});