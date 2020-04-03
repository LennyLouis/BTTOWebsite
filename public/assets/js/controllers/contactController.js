App.controller('ContactController', function($scope, Auth, Message){
	console.log('ContactController !!!');
	$scope.success_send=false;
	$scope.isAuth = Auth.isAuthenticated();
	$scope.new_message = {
		name: '',
		mail: '',
		title: '',
		content: '',
		read: false
	};

	$scope.sendMessage = function(){
		$scope.errors_message = [];
		if(Auth.isAuthenticated()){
			$scope.new_message.mail = Auth.getUser().mail;
			if($scope.new_message.name==null||$scope.new_message.name.length==0){
				$scope.errors_message.push("Compléter le champ 'Nom' !")
			}
			if($scope.new_message.mail==null||$scope.new_message.mail.length==0){
				$scope.errors_message.push("Compléter le champ 'Adresse mail' !")
			}
			if($scope.new_message.title==null||$scope.new_message.title.length==0){
				$scope.errors_message.push("Compléter le champ 'Titre' !")
			}
			if($scope.new_message.content==null||$scope.new_message.content.length==0){
				$scope.errors_message.push("Compléter le champ 'Message' !")
			}
			if($scope.errors_message.length==0){
				Message.createMessage($scope.new_message).then(function(response_message){
					if(response_message.status==200){
						$scope.success_send = true;
						initMessage();
					}
				}, function(err_message){
					$scope.errors_message.push(err_message.data);
				});
			}
		}
		else{
			$scope.errors_message.push("Connectez-vous pour envoyer un message !");
		}
	};

	function initMessage(){
		$scope.new_message = {
			name: '',
			mail: '',
			title: '',
			content: '',
			read: false
		};
	}
});