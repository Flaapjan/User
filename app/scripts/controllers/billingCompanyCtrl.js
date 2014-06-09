'use strict';

app.controller('billingCompanyCtrl', ['$scope', '$rootScope','$location', function(scope, rootScope, location){
    scope.title = 'Billing Company';
    
    scope.setCompany = function(option){
        rootScope.company = option;
        //console.log(rootScope.company);
        //$('#btnSelectBillingCompany').removeAttr('disabled');
        location.path( "/profile/" + rootScope.loggedinUser.userID);
        //console.log(rootScope.loggedinUser);
    }
}]);