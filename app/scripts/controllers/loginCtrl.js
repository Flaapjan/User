'use strict';

app.controller('loginCtrl', ['$scope','$rootScope','$location','AuthenticationFactory', 'LoggedFactory', 'BillingCompanyFactory', 'user_roles', function(scope, rootScope, location, AuthenticationFactory, LoggedFactory, BillingCompanyFactory, user_roles){
	scope.title = 'User Login';
    var incompleteUser;
    
    scope.submitLogin = function(userLogin){
        
        //Authenticate
		scope.authenticatedUser = AuthenticationFactory.authenticate(userLogin,
			function(data){
                scope.incompleteUser = data;
                if(data.authenticate == true) {
                    
                    //Login
                    scope.currentUser = LoggedFactory.login(scope.authenticatedUser, function(data){
                        rootScope.loggedinUser = data;
                        
                        //console.log(user_roles.sysAdmin);
                        
                        if(rootScope.loggedinUser.userRole.description == user_roles.sysAdmin) {
                            console.log("sysadmin true");   
                        }
                        
                        //if(rootScope.loggedinUser && rootScope.loggedinUser.userRole.description == "System Administrator") {
                        //    rootScope.sysAdmin = true;   
                        //}
                        
                        //Get billing companies
                        rootScope.billingCompanies = BillingCompanyFactory.billingCompanies(rootScope.loggedinUser, function(data){
                            if(rootScope.billingCompanies.length >= 2) {
                                location.path( "/billing_company/" + scope.loggedinUser.userID);
                            } else {
                                location.path( "/profile/" + scope.loggedinUser.userID);
                            }
                        });                                                           
                    });
                } else {
                    scope.loginError = "The email or password is incorrect."
                }
            },
			function(error) {
				console.log(error)   // Error details
				scope.loginError = "An error has occurred"
			}
		);
	}
}])
