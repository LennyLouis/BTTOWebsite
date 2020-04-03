App.factory('Message', function($http, $log){

	var Message = {
		getMessages: function(){
			var req = {
			 method: 'GET',
			 url: '/messages/',
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getMessagesById: function(message_id){
			var req = {
			 method: 'GET',
			 url: '/messages/'+message_id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		createMessage: function(message){
			console.log(message);
			var req = {
			 method: 'POST',
			 url: '/messages/',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {name: message.name, mail: message.mail, title: message.title, content: message.content, read: message.read}
			};
			return $http(req);
		},
		updateMessage: function(message){
			var req = {
			 method: 'PUT',
			 url: '/messages/'+message.id,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {read: message.read}
			};
			return $http(req);
		},
		removeMessage: function(message_id){
			var req = {
			 method: 'DELETE',
			 url: '/messages/'+message_id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Message;
});