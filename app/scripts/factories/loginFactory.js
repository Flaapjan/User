'use strict';

app.factory('loginFactory', ['$resource',
	function($resource){
		return $resource('http://localhost:8080/authenticate', {}, {
			authenticate: {method:'GET'}
		});
	}
]);

/*app.factory('loggedinFactory', ['$resource',
	function($resource){
        return $resource('http://localhost:8080/login', {}, {
			login: {method:'GET'}
		});
	}
]);*/
