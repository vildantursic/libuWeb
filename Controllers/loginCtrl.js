var libu = angular.module('libu');
var url = 'https://libuweb.firebaseio.com/';

libu.controller('loginCtrl', function loginCtrl($scope, $cookies, $firebaseObject, $timeout, $state, $rootScope) {

	$rootScope.admin = false;
	$rootScope.session = false;

	if ($cookies.get('admin')) {
		$rootScope.admin = true;
	}
	else if($cookies.get('session')){
		$rootScope.session = true;
	}
	else {
		$rootScope.admin = false;
	}

	console.log($rootScope.admin);

	var auth = new Firebase(url);

	$scope.email = "";
	$scope.password = "";

	$scope.authenticate = function (){

		auth.authWithPassword({ //firebase funkcija
			
			email    : $scope.email,
		  	password : $scope.password

		}, function(error, authData) {
		  	if (error) {

		    	switch (error.code) {
			    	case "INVALID_EMAIL":
			        	$scope.errMsg = "The specified user account email is invalid.";
			        	break;
			      	case "INVALID_PASSWORD":
			        	$scope.errMsg = "The specified user account password is incorrect.";
			        	break;
			      	case "INVALID_USER":
			        	$scope.errMsg = "The specified user account does not exist.";
			        	break;
			      	default:
			        	console.log("Error logging user in:", error);
			    }

		    	$("#email").addClass('error');
		    	$("#pass").addClass('error');

		  	} else {
		    	console.log("Authenticated successfully with payload:", authData);

		    	$scope.authUser = auth.getAuth();

		    	if ($scope.authUser.uid == "e5d25a06-5a65-4879-a1a8-ed01750d9597") {
					$cookies.put('admin', true);
				};
				if ($scope.authUser.uid) {
					$cookies.put('session', true);
				};

		    	$scope.errMsg = "";

				$("#email").removeClass('error');
		    	$("#pass").removeClass('error');

		    	$('#myModal').modal('hide');

		    	location.reload();
				$state.go('singleUser');
		  	}
		} 
		//	{ remember: "sessionOnly" }
		);
	};

	$scope.authFb = function() {
		auth.authWithOAuthRedirect("facebook", function(error) {
		 	if (error) {
		    	console.log("Login Failed!", error);
		  	} else {
		    	// We'll never get here, as the page will redirect on success.
		  	}
		});
	}

	$scope.authUser = auth.getAuth();

	$scope.unauthenticate = function (){
		auth.unauth();
		$cookies.remove('admin');
		$cookies.remove('session');

		location.reload();
		$state.go('home');
	};

	$timeout(function () {

		var authData = auth.getAuth();

		if(authData){
			$("#login").hide();
			$("#logout").show();
		}
		else {
			$("#login").show();
			$("#logout").hide();
		}

	},100);

});
