'use strict';

app.controller('mainCtrl', function ($scope,$rootScope) {
    $scope.title = 'Landing Page';
    
    console.log('test2');

    $scope.loginFunc = function(val){
        $rootScope.loginDirec = "";
    }
});
