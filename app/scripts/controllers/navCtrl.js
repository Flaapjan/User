'use strict';

app.controller('navCtrl', ['$scope', '$rootScope','$location', 'user_roles', function(scope, rootScope, location, user_roles){
	
    scope.isAuthorized = function(user_role) {
        console.log("isAuthorized");
        console.log(user_role);
        if(rootScope.loggedinUser && rootScope.loggedinUser.userRole.description == user_role) {
            console.log("returning true");
            return true;   
        }
    }
    
    scope.logout = function () {
        console.log("logout button clicked");
        
        rootScope.loggedinUser = null;
        rootScope.billingCompanies = null;
        rootScope.company = null;
        
        location.path( "/login");
    }
}]);