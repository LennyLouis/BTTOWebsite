App.factory('Comment', function($http, $log){

	var Comment = {
		getCommentsByNewsId: function(news_id){
			var req = {
			 method: 'GET',
			 url: '/comments/'+news_id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		createComment: function(comment){
			console.log(comment);
			var req = {
			 method: 'POST',
			 url: '/comments/',
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {author: comment.author, content: comment.content, NewsId: comment.NewsId}
			};
			return $http(req);
		},
		updateComment: function(comment){
			var req = {
			 method: 'PUT',
			 url: '/comments/'+comment.id,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {content: comment.content}
			};
			return $http(req);
		},
		removeComment: function(id){
			console.log("removeComment !");
			var req = {
			 method: 'DELETE',
			 url: '/comments/'+id,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		}
	};

	return Comment;
});