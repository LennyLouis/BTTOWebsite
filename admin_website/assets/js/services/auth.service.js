colorAdminApp.factory('AuthenticationService', function($localStorage, $http){

    var Auth = {
    	isAuthenticated: function(){
			if ($localStorage.currentUser!=null) {
				return true;
			}
			else{
				return false;
			}
		},
        login: function(mail, password){
            var req = {
             method: 'POST',
             url: '/auth/admin/login',
             headers: {
               'Content-Type': 'application/json'
             },
             data: { mail: mail, password: password }
            };
            return $http(req);
        },
        logout: function(){
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
        },
        getUser: function(){
            return $localStorage.currentUser;
        }
    }

    return Auth;
});