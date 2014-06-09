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
            password: "password"
        }
        
        var fullUserData = {
            userID: 2222, 
            firstName: "Jeff", 
            surname: "Apleton", 
            emailAddress: "japple@email.com", 
            password: "password"
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
                    password: "password"
                }
            );
            
            $httpMock.expectPOST('http://localhost:8080/login').respond(
                {
                    userID: 2222, 
                    firstName: "Jeff", 
                    surname: "Apleton", 
                    emailAddress: "japple@email.com", 
                    password: "password"
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
        
        it('should create logged in user after authentication', function() {
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
    
   /* describe('ForgotPassCtrl', function(){
        var scope, ctrl, $httpBackend;

        beforeEach(module('app'));
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {

            scope = $rootScope.$new();
            ctrl = $controller('forgotPassCtrl', {$scope: scope});
        })); 

        it('Forgot password controller should be defined', function() {
            //expect(ctrl).toBeDefined();
        });
    });

    describe('CosCtrl', function() {
        var scope, $httpBackend;

        beforeEach(module('app'));
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {

            scope = $rootScope.$new();
        })); 

        it('Class of service controller should be defined', inject(function($controller) {
            var cosController = $controller('cosCtrl', {$scope: scope});
            //expect(cosController).toBeDefined();
        }));

    });

    */
    
});
