App.factory('Right', function($http, $log, Account, Auth){

	var Right = {
		hasAdminRight: function(){
			console.log()
			if(Auth.isAuthenticated){
				var user = Auth.getUser();
				return Account.getAccountByMail(user.mail, user.token);
			}
			else{
				return false;
			}
		}
	};

	return Right;
});