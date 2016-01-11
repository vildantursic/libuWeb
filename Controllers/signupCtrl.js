var libu = angular.module('libu');
var url = 'https://libu.firebaseio.com/';

libu.controller('signupCtrl', function loginCtrl($scope) {

	var signup = new Firebase(url);

	$scope.createAccount = function (newUser){
		signup.createUser({
			email: newUser.email,
			password: newUser.password
		}, function(error, userData) {
			if (error) {
				switch (error.code) {
					case "EMAIL_TAKEN":
					console.log("The new user account cannot be created because the email is already in use.");
					break;
					case "INVALID_EMAIL":
					console.log("The specified email is not a valid email.");
					break;
					default:
					console.log("Error creating user:", error);
				}
			} else {
				console.log("Successfully created user account with uid:", userData.uid);
				$scope.addUserOnSingUp(newUser, userData.uid);
			}
		});
	};

	$scope.addUserOnSingUp = function (newUser, id) {

		var data = new Firebase(url).child("user/"+id);

		var newName = newUser.userName;
		var newEmail = newUser.email;
		var newPhone = newUser.phone;
		var newAddress = newUser.address;

		data.set(			
			{
				name: newName,
				email: newEmail,
				phone: newPhone,
				address: newAddress
			}
		);

	}

});
