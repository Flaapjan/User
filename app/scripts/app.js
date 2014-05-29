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
      .when('/login/forgot_password', {
        templateUrl: 'views/forgotPass.html',
        controller: 'forgotPassCtrl'
      })
      .when('/profile/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'profileCtrl'
      })
      .when('/billing_company/:userId', {
        templateUrl: 'views/billing_company.html',
        controller: 'billingCompanyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
	  
	  
  }]);
