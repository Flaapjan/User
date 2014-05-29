'use strict';

app.controller('loginCtrl', ['$scope','$rootScope','$location', function(scope, rootScope, location){
	scope.title = 'User Login';
	
	scope.submitLogin = function(userLogin){
		if(userLogin.emailAddress == 'test@gmail.com'){
			location.path('/profile/phillip');
		}
		else if(userLogin.emailAddress == 'test2@gmail.com'){
			location.path('/billing_company/phillip');
		}
	}
}])
