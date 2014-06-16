'use strict';

app.controller('verificationCtrl', ['$scope','$rootScope','$location', 'VerifyPhoneFactory', function(scope, rootScope, location, VerifyPhoneFactory){
	scope.title = 'Verification';
    
    scope.submitVerification = function(registeredUserUnverified) {
        VerifyPhoneFactory.verify(rootScope.registeredUserUnverified,
                function(data){
                    console.log(data);
                    if(data.verified == true) {
                        scope.verficationSuccessMessage = "You have successfully been verified."
                    }
                },
                function(error) {
                    console.log("error: ");
                    console.log(error)   // Error details
                    scope.verficationSuccessMessage = "Verification was unsuccessful."
                }
            );
        
    }
}])
