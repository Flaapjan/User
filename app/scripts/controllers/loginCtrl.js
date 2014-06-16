'use strict';

app.controller('loginCtrl', ['$scope','$rootScope','$location','AuthenticationFactory', 'LoggedFactory', 'BillingCompanyFactory', function(scope, rootScope, location, AuthenticationFactory, LoggedFactory, BillingCompanyFactory){
	scope.title = 'User Login';
    var incompleteUser;
    
    scope.submitLogin = function(userLogin){		
		scope.authenticatedUser = AuthenticationFactory.authenticate(userLogin,
			function(data){
                scope.incompleteUser = data;
                if(data.authenticate == true) {
                    scope.currentUser = LoggedFactory.login(scope.authenticatedUser, function(data){
                        rootScope.loggedinUser = data;
                        if(rootScope.loggedinUser && rootScope.loggedinUser.userRole.description == "System Administrator") {
                            rootScope.sysAdmin = true;   
                        }
                        rootScope.billingCompanies = BillingCompanyFactory.billingCompanies(rootScope.loggedinUser, function(data){
                            if(rootScope.billingCompanies.length >= 2) {
                                location.path( "/billing_company/" + scope.loggedinUser.userID);
                            } else {
                                location.path( "/profile/" + scope.loggedinUser.userID);
                            }
                        });                                                           
                    });
                } else {
                    //console.log(data)
                    scope.loginError = "The email or password is incorrect."
                }
            },
			function(error) {
				console.log(error)   // Error details
				//console.log(scope.userLogin)   // Data being sent through
                scope.loginError = "An error has occurred"
			}
		);
	}
}])
