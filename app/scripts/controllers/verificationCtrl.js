'use strict';

app.controller('verificationCtrl', ['$scope','$rootScope','$location', 'VerifyPhoneFactory', function(scope, rootScope, location, VerifyPhoneFactory){
	scope.title = 'Verification';
    
    scope.submitVerification = function(userVerify) {
        console.log(userVerify);
        
        VerifyPhoneFactory.verify(rootScope.registeredUserUnverified, userVerify.verificationCode,
                function(data){
                    console.log(data);
                },
                function(error) {
                    console.log(error)   // Error details

                }
            );
        
    }
}])
