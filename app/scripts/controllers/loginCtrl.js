'use strict';

app.controller('loginCtrl', ['$scope','$rootScope','$location','AuthenticationFactory', 'LoggedFactory', 'BillingCompanyFactory', function(scope, rootScope, location, AuthenticationFactory, LoggedFactory, BillingCompanyFactory){
	scope.title = 'User Login';
		
	scope.submitLogin = function(userLogin){		
		scope.authenticatedUser = AuthenticationFactory.authenticate(userLogin,
			function(data){
                if(data.authenticate == true) {
                    scope.currentUser = LoggedFactory.login(scope.authenticatedUser, function(data){
                        scope.loggedinUser = data;
                        rootScope.billingCompanies = BillingCompanyFactory.billingCompanies(scope.loggedinUser, function(data){
                            if(rootScope.billingCompanies.length >= 2) {
                                location.path( "/billing_company/" + scope.loggedinUser.userID);
                            } else {
                                location.path( "/profile/" + scope.loggedinUser.userID);
                            }
                        });                                                           
                    });
                } else {
                    console.log(data)
                    scope.loginError = "The email or password is incorrect."
                }
                
                
                //scope.loggedUser = data.data;
                //console.log(scope.loggedUser);
                //scope.currentUser = loggedinFactory.login(scope.userLogin,
			         //function(data){
                         //scope.loggedinUser = data.data;
                         //console.log(loggedinUser);
                    // });
                
                //after Auth, login, retrieving data 
                //----------------------------------
                //Login Create token or user
                //if System Admin
                //Companies linked to user
                // 0 <= companies < =1 - redirect to profile
                // 1 > companies - redirect to billing company
				},
			function(error) {
				console.log(error)   // Error details
				//console.log(scope.userLogin)   // Data being sent through
                scope.loginError = "An error has occurred"
			}
		);
	}
}])
