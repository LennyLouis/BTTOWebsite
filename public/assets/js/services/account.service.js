App.factory('Account', function($http, $log, Auth){

	var Account = {
		getAccounts: function(token){
			var req = {
			 method: 'GET',
			 url: '/accounts/'+'?token='+token,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		getAccountByMail: function(mail, token){
			console.log('getAccountByMail...');
			console.log(mail);
			var req = {
			 method: 'GET',
			 url: '/accounts/mail/'+mail+'?token='+token,
			 headers: {
			   'Content-Type': 'application/json'
			 }
			};
			return $http(req);
		},
		updateAccount: function(UserId, right, token){
			var req = {
			 method: 'PUT',
			 url: '/accounts/'+UserId+'?token='+token,
			 headers: {
			   'Content-Type': 'application/json'
			 },
			 data: {right: right}
			};
			return $http(req);
		}
	};

	return Account;
});