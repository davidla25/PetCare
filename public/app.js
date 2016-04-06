var app = angular.module('petCare',	['ngRoute', 
									 'ngCookies', 
									 'ngMessages',
									 'admin', 
									 'account', 
									 'application', 
									 'message',
									 'user', 
									 'pet_posting',
									 'petsitter_posting',
									 'search', 
									 'user', 
									 'forum',
									 'modal']);

app.run(function ($rootScope, $location, $route, authService, activeLinkService, $window, $cookies) {
	$rootScope.$on('$routeChangeStart', function (event, next, current) {
	    authService.getUserStatus();
        activeLinkService.prepForBroadcast($location.path());
		if (next.access.restricted) {
			if (!authService.isLoggedIn()) {
				$rootScope.loginRequired = true;
	        	$location.path('/signin');
	        	$route.reload();
	        }
	    };
	    if (next.$$route.originalPath == '/admin') {
	    	if ($cookies.get('userRole') != 'admin') {
	    		$location.path('/');
	    	}
	    }
  	});
  	$rootScope.$on('$routeChangeSuccess', function (event, next, current) {   
        if (authService.isBanned()) {
        	$location.path('/signin');
        }
  	});

  	// default search query values
	$cookies.put('pet', "none");
	$cookies.put('location', "none");
	$cookies.put('price', "none");
});

app.controller('mainController', function() {
});

app.controller('navController', ['$scope', '$location', 'authService', '$cookies', '$http', 'activeLinkService',
	function($scope, $location, authService, $cookies, $http, activeLinkService) {

	$scope.authService = authService;
	$scope.numb_new_msg = 0;
	$scope.numb_new_app = 0;

	$scope.forumActive = false;
	$scope.sitterPostingActive = false;
	$scope.petPostingActive = false;

    $scope.$on('handleBroadcast', function() {
		$scope.forumActive = activeLinkService.forumActive;
		$scope.sitterPostingActive = activeLinkService.sitterPostingActive;
		$scope.petPostingActive = activeLinkService.petPostingActive;
    });

	$scope.logout = function() {
		authService.logout().then(function () {
        	$location.path('/login');
        });
	};

	// Get the number of unread (new) messages and applications
	$scope.getNews = function() {
		if (authService.isLoggedIn()) {
		    $http.get('/api/users/' + $cookies.get('userID') + "/" + $cookies.get('token') + "/news").success(function(data){
	        	$scope.numb_new_msg = data.messages;
	        	$scope.numb_new_app = data.applications;
	    	});
		}
	};
}]);