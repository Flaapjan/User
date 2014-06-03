'use strict';

app.factory('AuthenticationFactory', ['$resource',
	function($resource){
		return $resource('http://localhost:8080/authenticate', {}, {
			authenticate: {
                method: 'POST'
            }
		});
	}
]);

app.factory('LoggedFactory', ['$resource',
	function($resource){
        return $resource('http://localhost:8080/login', {}, {
			login: {method:'POST'}
		});
	}
]); 

app.factory('BillingCompanyFactory', ['$resource',
	function($resource){
        return $resource('http://localhost:8080/getBillingCompanies', {}, {
			billingCompanies: {method:'POST', isArray: true}
		});
	}
]); 



/*app.factory('LoginFactory', ['$resource',
 function($resource) {
  return {
    authenticate: $resource('http://localhost:8080/authenticate', {}),
    login:  $resource('http://localhost:8080/login', {})
    //billingcompanies:  $resource('/groups/:id', {id: '@id'})
  };
}]);*/