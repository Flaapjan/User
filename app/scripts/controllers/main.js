'use strict';

 app.controller('mainCtrl', function ($scope,$rootScope) {
    $scope.title = 'Landing Page';
	
	$scope.loginFunc = function(val){
		$rootScope.loginDirec = "";
	}
  });
