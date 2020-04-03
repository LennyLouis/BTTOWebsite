App.controller('AppController', function($scope, Auth, $location, $state){
	$scope.form_login = {
		mail: '',
		password: ''
	};
	$scope.form_register = {
		mail: '',
		username: '',
		password: ''
	};
	$scope.errors_login = [];
	$scope.errors_register = [];
	$scope.current_user = null;

	if(Auth.isAuthenticated()){
		$scope.current_user = Auth.getUser();
	}

	$scope.login = function(){
		console.log('login()')
		$scope.errors_login = [];
		//check $scope.form_login
		if($scope.form_login.mail.length==0){
			$scope.errors_login.push('Compléter le champ "Adresse mail" !');
		}
		if($scope.form_login.password.length==0){
			$scope.errors_login.push('Compléter le champ "Mot de passe" !');
		}
		if($scope.errors_login.length==0){
			Auth.login($scope.form_login.mail, $scope.form_login.password).then(function(response){
				console.log(response);
				if (response){
					if(response.status==200) {
						response.data.lastConnection=Date.now();
						localStorage.setItem("user", JSON.stringify(response.data));
						$scope.current_user = response.data;
						$scope.initForms();
						$('#modal-login').modal('hide');
					}
					else{
						$scope.errors_login.push(response.data.message);
					}
				}
			}, function(err){
				console.log(err);
				$scope.errors_login.push(err.data.message);
			});
		}
	};

	$scope.register = function(){
		$scope.errors_register = [];
		//check $scope.form_register
		if($scope.form_register.mail.length==0){
			$scope.errors_register.push('Compléter le champ "Adresse mail" !');
		}
		if($scope.form_register.username.length==0){
			$scope.errors_register.push('Compléter le champ "Username" !');
		}
		if($scope.form_register.password.length==0){
			$scope.errors_register.push('Compléter le champ "Mot de passe" !');
		}
		if($scope.errors_register.length==0){
			Auth.register($scope.form_register.mail, $scope.form_register.username, $scope.form_register.password, '0').then(function(response){
				console.log(response);
				if(response){
					if(response.status==200){
						localStorage.setItem("user", JSON.stringify(response.data));
						$scope.current_user = response.data;
						$scope.initForms();
						$('#modal-login').modal('hide');
					}
					else{
						$scope.errors_register.push(response.data.message);
					}
				}
			}, function(err){
				console.log(err);
				$scope.errors_register.push(err.data.message);
			});
		}
	};

	$scope.logout = function(){
		console.log('logout...');
		Auth.logout();
		$scope.current_user = null;
		$state.go('home');
	};

	$scope.initForms = function(){
		$scope.errors_login = [];
		$scope.errors_register = [];
		$scope.form_login = {
			mail: '',
			password: ''
		};
		$scope.form_register = {
			mail: '',
			username: '',
			password: ''
		};
	}

});