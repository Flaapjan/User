'use strict';


var app = angular.module('zaraApp',[
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ]);
  
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'mainCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'registerCtrl'
      })
      .when('/verification', {
        templateUrl: 'views/verification.html',
        controller: 'verificationCtrl'
      })
      .when('/login/forgot_password', {
        templateUrl: 'views/forgotPass.html',
        controller: 'forgotPassCtrl'
      })
      .when('/profile/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'profileCtrl'
      })
      .when('/createCompany', {
        templateUrl: 'views/createCompany.html',
        controller: 'createCompanyCtrl'
      })
      .when('/billing_company/:userId', {
        templateUrl: 'views/billing_company.html',
        controller: 'billingCompanyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
	  
	  
  }]);
