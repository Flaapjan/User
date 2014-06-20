'use strict';

app.controller('profileCtrl', ['$scope', '$rootScope', '$location', 'user_roles', function(scope, rootScope, location, user_roles){
	scope.title = 'Profile';
    
    scope.isAuthorized = function(user_role) {
        console.log(user_role);
    }
}]);