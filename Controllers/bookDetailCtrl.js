var libu = angular.module('libu');

libu.controller('bookDetailCtrl', function booksCtrl($scope, $firebaseObject, $state) {

	var id = $state.params.id;

	var fireRef = new Firebase(url+"book/"+id); /// poveznica izmedju firebas i aplikacije

	$scope.book = $firebaseObject(fireRef);

	//console.log($scope.book);

	$scope.addComment = function (comment){

		console.log(comment);

		uid = makeid();

		var data = new Firebase(url).child("book/"+id+"/comments/"+uid);

		var newUser = comment.name;
		var newComment = comment.comment;

		data.set(			
				{
					uid: uid,
					name: newUser,
					comment: newComment
				}
		);

		$state.reload();

	};

	function makeid()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 15; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	$scope.deleteComment = function (book_id){

		var data = new Firebase(url).child("book/"+id+"/comments/"+book_id);

		data.remove();

		$state.reload();

	};


});
