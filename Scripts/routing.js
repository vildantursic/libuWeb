var libu = angular.module('libu');
var url = 'https://libu.firebaseio.com/';

libu.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    var $cookies;
    angular.injector(['ngCookies']).invoke(['$cookies', function(_$cookies_) {
      $cookies = _$cookies_;
    }]);

  	
  	// For any unmatched url, redirect to /state1
  	$urlRouterProvider.otherwise("/");
  	//
  	// Now set up the states
    $stateProvider   //
      .state('home', {
          url: "/",
          templateUrl: "Views/home.html"
      })

    if($cookies.get('admin')){
      
      $stateProvider
      .state('books', {
          url: "/books",
          templateUrl: "Views/books.html",
          controller: "booksCtrl"
      })
      .state('user', {
          url: "/user",
          templateUrl: "Views/user.html",
          controller: "userCtrl"
      })
      .state('booksUser', {
          url: "/booksUser",
          templateUrl: "Views/booksUser.html",
          controller: "booksUserCtrl"
      })
      .state('bookDetail', {
          url: "/bookDetail/:id",
          templateUrl: "Views/bookDetail.html",
          controller: "bookDetailCtrl"
      })
      .state('singleUser', {
          url: "/singleUser/:uid",
          templateUrl: "Views/singleUser.html",
          controller: "singleUserCtrl"
      });

    }
	  
    if ($cookies.get('session')) {
      $stateProvider
      .state('booksUser', {
          url: "/booksUser",
          templateUrl: "Views/booksUser.html",
          controller: "booksUserCtrl"
      })
      .state('bookDetail', {
          url: "/bookDetail/:id",
          templateUrl: "Views/bookDetail.html",
          controller: "bookDetailCtrl"
      })
      .state('singleUser', {
          url: "/singleUser/:uid",
          templateUrl: "Views/singleUser.html",
          controller: "singleUserCtrl"
      });
    };

});
