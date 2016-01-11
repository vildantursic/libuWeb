var libu = angular.module('libu');

libu.controller('singleUserCtrl', function userCtrl($scope, $firebaseObject, $state) {

	$("#add").hide();

	var uid = $state.params.uid;
	
	var fireUser = new Firebase(url+"user/"+uid);
	
	$scope.user = $firebaseObject(fireUser);

	console.log($scope.user)

	if($scope.user.isAdmin){
	    $cookies.put('admin', true);
	}



	$scope.edit = function(id) {	

	//	$("#id"+id).replaceWith('<input id="id'+id+'" class="form-control" value="'+ $("#id"+id).html() +'">');
		$("#name"+id).replaceWith('<input id="name'+id+'" class="form-control" value="'+ $("#name"+id).html() +'">');
		$("#email"+id).replaceWith('<input id="email'+id+'" class="form-control" value="'+ $("#email"+id).html() +'">');
		$("#phone"+id).replaceWith('<input id="phone'+id+'" class="form-control" value="'+ $("#phone"+id).html() +'">');
		$("#address"+id).replaceWith('<input id="address'+id+'" class="form-control" value="'+ $("#address"+id).html() +'">');
	
		$("#edit"+id).hide();
		$("#add"+id).show();

	}

	$scope.addUser = function (id, user){

		var data = new Firebase(url).child("user/"+user.$id);

		console.log(user.$id);

	//	var newId = $("#id"+id).val();
		var newName = $("#name"+id).val();
		var newEmail = $("#email"+id).val();
		var newPhone = $("#phone"+id).val();
		var newAddress = $("#address"+id).val();

		data.set(			
				{
					//id: newId,
					name: newName,
					email: newEmail,
					phone: newPhone,
					address: newAddress
				}
		);

	//	$("#id"+id).replaceWith('<p id="id'+id+'">'+ $("#id"+id).val() +'</p>');
		$("#name"+id).replaceWith('<p id="name'+id+'">'+ $("#name"+id).val() +'</p>');
		$("#email"+id).replaceWith('<p id="email'+id+'">'+ $("#email"+id).val() +'</p>');
		$("#phone"+id).replaceWith('<p id="phone'+id+'">'+ $("#phone"+id).val() +'</p>');
		$("#address"+id).replaceWith('<p id="address'+id+'">'+ $("#address"+id).val() +'</p>');

		$("#edit"+id).show();
		$("#add"+id).hide();
	};


	$scope.deleteUser = function (user){

		var data = new Firebase(url).child("user/"+user.$id);

		data.set(
			null
		);

	};

});
