'use strict';

app.controller('registerCtrl', ['$scope','$rootScope','$location', 'VerifyProfileNameFactory', 'VerifyEmailFactory', 'RegisterFactory',  function(scope, rootScope, location, VerifyProfileNameFactory, VerifyEmailFactory, RegisterFactory){
	scope.title = 'Register';
    
    scope.verifyProfileName = function(profileName) {
        if(profileName) {
            VerifyProfileNameFactory.verify(profileName,
                function(data){
                    console.log(data);
                    if(data[0] == "f") {
                        rootScope.profileNameVerified = "Available";   
                    } else {
                        rootScope.profileNameVerified = "Not available";   
                    }
                },
                function(error) {
                    console.log(error)   // Error details

                }
            );
        }
    }
    
    scope.verifyEmailAddress = function(emailAddress) {
        if (emailAddress) {
            VerifyEmailFactory.verify(emailAddress,
                function(data){
                    console.log(data);
                    if(data[0] == "f") {
                        rootScope.emailVerified = "Available";   
                    } else {
                        rootScope.emailVerified = "Not available";   
                    }
                },
                function(error) {
                    console.log(error)   // Error details

                }
            );
        }
    }
    
    scope.submitRegistration = function(userRegister){		
		      
        //TODO: validation - email regex and password match
        
        RegisterFactory.register(userRegister,
            function(data) {
                console.log(data);
                if(data.verificationCode) {
                    rootScope.registeredUserUnverified = data;
                    location.path( "/verification");
                }
            },
            function(error) {
                console.log("error: " + error);   
            }
        );
    }
    
}])
