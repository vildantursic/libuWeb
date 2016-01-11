var libu = angular.module('libu');

libu.controller('booksUserCtrl', function booksCtrl($scope, $firebaseArray) {

	var fireRef = new Firebase(url+"book");

	$scope.books = $firebaseArray(fireRef);

});
