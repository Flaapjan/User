'use strict';

describe('Zaralab controllers', function () {
    
    beforeEach(function(){
        this.addMatchers({
            toEqualData: function(expected) {
                return angular.equals(this.actual, expected);
            }
        });
    });

    describe('Login controller', function(){
        var scope, ctrl, $httpMock;
        
        var incompleteData = {
            authenticate: true,
            userID: 2222, 
            firstName: "Jeff", 
            surname: "Apleton", 
            emailAddress: "japple@email.com", 
            password: "password",
            userRole: {
                description: "Admin"
            }
        }
        
        var fullUserData = {
            userID: 2222, 
            firstName: "Jeff", 
            surname: "Apleton", 
            emailAddress: "japple@email.com", 
            password: "password",
            userRole: {
                description: "Admin"
            }
        }
        
        var billingCompanies = [{billingCompanyId: 3, companyDescription: "Vida e Caffe"}, {billingCompanyId: 2, companyDescription: "Coke"}];

        beforeEach(module('zaraApp'));
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpMock = _$httpBackend_;

            $httpMock.expectPOST('http://localhost:8080/authenticate').respond(
                {
                    authenticate: true,
                    userID: 2222, 
                    firstName: "Jeff", 
                    surname: "Apleton", 
                    emailAddress: "japple@email.com", 
                    password: "password",
                    userRole: {
                        description: "Admin"
                    }
                }
            );
            
            $httpMock.expectPOST('http://localhost:8080/login').respond(
                {
                    userID: 2222, 
                    firstName: "Jeff", 
                    surname: "Apleton", 
                    emailAddress: "japple@email.com", 
                    password: "password",
                    userRole: {
                        description: "Admin"
                    }
                }
            );
            
            $httpMock.expectPOST('http://localhost:8080/getBillingCompanies').respond(
                [{billingCompanyId: 3, companyDescription: "Vida e Caffe"}, {billingCompanyId: 2, companyDescription: "Coke"}]
            );
            
            scope = $rootScope.$new();
            ctrl = $controller('loginCtrl', {$scope: scope});

        })); 
        
        it('should create incomplete user after authentication', function() {
            expect(scope.incompleteUser).toBeUndefined();
            scope.submitLogin(scope.userLogin);
            $httpMock.flush();
            expect(scope.incompleteUser).toEqualData(incompleteData);
        });
        
        it('should create logged in user after login', function() {
            expect(scope.currentUser).toBeUndefined();
            scope.submitLogin(scope.userLogin);
            $httpMock.flush();
            expect(scope.currentUser).toEqualData(fullUserData);
        });
        
        it('should return two billingcompanies', function() {
            expect(scope.billingCompanies).toBeUndefined();
            scope.submitLogin(scope.userLogin);
            $httpMock.flush();
            expect(scope.billingCompanies).toEqualData(billingCompanies);
            expect(scope.billingCompanies.length).toBe(2);
        });
        
    });
    
    describe('Verify profile name', function () {
        var scope, ctrl, $httpMock;
        
        beforeEach(module('zaraApp'));
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpMock = _$httpBackend_;

            $httpMock.expectPOST('http://localhost:8080/verifyProfileName').respond(
                {
                    0: "t", 1: "r", 2: "u", 3: "e"
                }
            );
            scope = $rootScope.$new();
            ctrl = $controller('registerCtrl', {$scope: scope});
        }));

        it("should return true for an existing profile name", function() {
            expect(scope.profileNameVerified).toBeUndefined();
            scope.verifyProfileName('jeff');
            $httpMock.flush();
            expect(scope.profileNameVerified).toBe("Not available");
        });
    });

    describe('Verify email address', function () {
        var scope, ctrl, $httpMock;
        
        beforeEach(module('zaraApp'));
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpMock = _$httpBackend_;

            $httpMock.expectPOST('http://localhost:8080/verifyEmailAddress').respond(
                {
                    0: "f", 1: "a", 2: "l", 3: "s", 4: "e"
                }
            );

            scope = $rootScope.$new();
            ctrl = $controller('registerCtrl', {$scope: scope});
        }));

        it("should return false for an non-existing email address", function() {
            expect(scope.emailVerified).toBeUndefined();
            scope.verifyEmailAddress('saassas@email.com');
            $httpMock.flush();
            expect(scope.emailVerified).toBe("Available");
        });
    });
    
    describe('Register', function () {
        var scope, ctrl, $httpMock;
        
        var registrationSubmit = {
            emailAddress: "nekotjie1@gmail.com",
            firstName: "Caitlin",
            password: "password",
            profileName: "nekotjie1",
            surname: "Pringle"
        }
        
        var userWithVerifyCode = {
                emailAddress: "nekotjie1@gmail.com",
                firstName: "Caitlin",
                password: "password",
                profileName: "nekotjie1",
                surname: "Pringle",
                verificationCode: "2619"
        }
        
        beforeEach(module('zaraApp'));
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpMock = _$httpBackend_;

            $httpMock.expectPOST('http://localhost:8080/register').respond(
                {
                    emailAddress: "nekotjie1@gmail.com",
                    firstName: "Caitlin",
                    password: "password",
                    profileName: "nekotjie1",
                    surname: "Pringle",
                    verificationCode: "2619"
                }
            );

            scope = $rootScope.$new();
            ctrl = $controller('registerCtrl', {$scope: scope});
        }));

        it("should return a verification code after registration", function() {
            expect(scope.registeredUserUnverified).toBeUndefined();
            scope.submitRegistration(registrationSubmit);
            $httpMock.flush();
            expect(scope.registeredUserUnverified).toEqualData(userWithVerifyCode);
        });
    });
    
    describe('Verify phone number', function () {
        var scope, ctrl, $httpMock;
        
        var verificationSubmit = {
            emailAddress: "nekotjie1@gmail.com",
            firstName: "Caitlin",
            password: "password",
            profileName: "nekotjie1",
            surname: "Pringle", 
            verificationCode: "2619"
        }
        
        beforeEach(module('zaraApp'));
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpMock = _$httpBackend_;

            $httpMock.expectPOST('http://localhost:8080/verifyTelephoneNumber').respond(
                {
                    emailAddress: "nekotjie1@gmail.com",
                    firstName: "Caitlin",
                    password: "password",
                    profileName: "nekotjie1",
                    surname: "Pringle",
                    verificationCode: "2619",
                    verified: "true"
                }
            );

            scope = $rootScope.$new();
            ctrl = $controller('verificationCtrl', {$scope: scope});
        }));

        it("should return verified as true if the code matches", function() {
            expect(scope.verficationSuccessMessage).toBeUndefined();
            scope.submitVerification(verificationSubmit);
            $httpMock.flush();
            expect(scope.verficationSuccessMessage).toBe("You have successfully been verified.");
        });

        it("should return verified as false if the code does not match", function() {
            //TODO - server not supporting this yet. 
        });
        
    });

    
});
