'use strict';

app.factory('RegisterFactory', ['$resource',
	function($resource){
		return $resource('http://localhost:8080/register', {}, {
			register: {
                method: 'POST'
            }
		});
	}
]);

app.factory('VerifyProfileNameFactory', ['$resource',
	function($resource){
		return $resource('http://localhost:8080/verifyProfileName', {}, {
			verify: {
                method: 'POST'
            }
		});
	}
]);

app.factory('VerifyEmailFactory', ['$resource',
	function($resource){
		return $resource('http://localhost:8080/verifyEmailAddress', {}, {
			verify: {
                method: 'POST'
            }
		});
	}
]);

app.factory('VerifyPhoneFactory', ['$resource',
	function($resource){
		return $resource('http://localhost:8080/verifyTelephoneNumber', {}, {
			verify: {
                method: 'POST'
            }
		});
	}
]);