'use strict';

app.controller('billingCompanyCtrl', ['$scope', '$rootScope','$location', function(scope, rootScope, location){
    scope.title = 'Billing Company';
    
    scope.myOption = rootScope.billingCompanies[0];
    
    scope.setCompany = function(option){
        rootScope.company = option;
        location.path( "/profile/" + rootScope.loggedinUser.userID);
    }
}]);