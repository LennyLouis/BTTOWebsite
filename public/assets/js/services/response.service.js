App.factory('Response', function($http, $log){

	var Response = {
		getResponsesByNewsId: function(response_id){
			var req = {
			 method: 'GET',
			 url: '/responses/'+response_id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		createResponse: function(response){
			console.log(response);
			var req = {
			 method: 'POST',
			 url: '/responses/',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {author: response.author, content: response.content, MessageId: response.MessageId}
			};
			return $http(req);
		}
	};

	return Response;
});