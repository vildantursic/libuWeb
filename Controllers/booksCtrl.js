var libu = angular.module('libu');

libu.controller('booksCtrl', function booksCtrl($scope, $firebaseArray, $firebaseObject) {

	var fireRef = new Firebase(url+"book");

	$scope.books = $firebaseArray(fireRef);

	$scope.edit = function(isbn) {	

		$("#"+isbn).replaceWith('<input id="'+isbn+'" class="form-control" value="'+ $("#"+isbn).html() +'">');
		$("#name"+isbn).replaceWith('<input id="name'+isbn+'" class="form-control" value="'+ $("#name"+isbn).html() +'">');
		$("#year"+isbn).replaceWith('<input id="year'+isbn+'" class="form-control" value="'+ $("#year"+isbn).html() +'">');
		$("#writer"+isbn).replaceWith('<input id="writer'+isbn+'" class="form-control" value="'+ $("#writer"+isbn).html() +'">');
		$("#description"+isbn).replaceWith('<input id="description'+isbn+'" class="form-control" value="'+ $("#description"+isbn).html() +'">');
		$("#pdf"+isbn).replaceWith('<input id="pdf'+isbn+'" class="form-control" value="'+ $("#pdf"+isbn).html() +'">');
		$("#image"+isbn).replaceWith('<input id="image'+isbn+'" class="form-control" value="'+ $("#image"+isbn).html() +'">');

		$("#edit"+isbn).hide();
		$("#add"+isbn).show();
	}
	
	$scope.addBook = function (isbn, book){

		var data = new Firebase(url).child("book/"+book.$id);

		var test = "book/"+book.$id;

		var newIsbn = $("#"+isbn).val();
		var newName = $("#name"+isbn).val();
		var newYear = $("#year"+isbn).val();
		var newWriter = $("#writer"+isbn).val();
		var newDescription = $("#description"+isbn).val();
		var newPdf = $("#pdf"+isbn).val();
		var newImage = $("#image"+isbn).val();

		console.log(test);

		data.set(			//stavlja u bazu
				{
					name: newName,
					isbn: newIsbn,
					year: newYear,
					writer: newWriter,
					description: newDescription,
					pdf: newPdf,
					image: newImage
				}
		);

		$("#"+isbn).replaceWith('<p id="'+isbn+'">'+ $("#"+isbn).val() +'</p>');
		$("#name"+isbn).replaceWith('<p id="name'+isbn+'">'+ $("#name"+isbn).val() +'</p>');
		$("#year"+isbn).replaceWith('<p id="year'+isbn+'">'+ $("#year"+isbn).val() +'</p>');
		$("#writer"+isbn).replaceWith('<p id="writer'+isbn+'">'+ $("#writer"+isbn).val() +'</p>');
		$("#description"+isbn).replaceWith('<p id="description'+isbn+'">'+ $("#description"+isbn).val() +'</p>');
		$("#pdf"+isbn).replaceWith('<p id="pdf'+isbn+'">'+ $("#pdf"+isbn).val() +'</p>');
		$("#image"+isbn).replaceWith('<p id="image'+isbn+'">'+ $("#image"+isbn).val() +'</p>');

		$("#edit"+isbn).show();
		$("#add"+isbn).hide();

	};

	$scope.add = function (book){

		var data = new Firebase(url).child("book/"+makeid());

		console.log(book);

		var newIsbn = book.isbn;
		var newName = book.nameOfBook;
		var newYear = book.year;
		var newWriter = book.author;
		var newDescription = book.description;
		var newPdf = book.pdf;
		var newImage = book.image;

		data.set(			
				{
					name: newName,
					isbn: newIsbn,
					year: newYear,
					writer: newWriter,
					description: newDescription,
					pdf: newPdf,
					image: newImage
				}
		);

	};

	function makeid()
	{
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 15; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	$scope.deleteBook = function (book){

		var data = new Firebase(url).child("book/"+book.$id);

		data.set(
			null
		);

	};

});
