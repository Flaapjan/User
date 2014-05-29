'use strict';

app.controller('loginCtrl', ['$scope','$rootScope','$location','loginFactory', function(scope, rootScope, location,loginFactory){
	scope.title = 'User Login';
		
	scope.submitLogin = function(userLogin){		
		scope.logged = loginFactory.get(scope.userLogin,
			function(data){
					scope.loggedUser = data.data;
					//after Auth, login, retrieving data
					//if System Admin
					//Companies linked to user
					// 0 <= companies < =1 - redirect to profile
					// 1 > companies - redirect to billing company
				},
			function(error) {
				console.log(error)   // Error details
				console.log(scope.userLogin)   // Data being sent through
			}
		);
	}
}])
