
angular.module('myApp', [])

.controller('choicesCtrl', function($scope, $http, $interval) {
	
	var responsePromise = $http.get("api.php");
		
	responsePromise.success(function(data,status,headers,config) {
		$scope.choices = data;

	});
	
	responsePromise.error(function(data,status,headers,config) {
		alert("AJAX failed!");

	});
	
	if(isLogged()){
		$scope.notAuth = false;
	}
	else {
		$scope.notAuth = true;
	}
	
	$scope.up = function (choice) {
        var myparams = {function:"up", choice: choice.choice};
		var config = {params: myparams};
		var responsePromise = $http.get("api.php",config);
		responsePromise.success(function(data,status,headers,config) {
			return $scope.choices = data;

		});

    }
	
	$scope.down = function (choice) {
        var myparams = {function:"down", choice: choice.choice};
		var config = {params: myparams};
		var responsePromise = $http.get("api.php",config);
		responsePromise.success(function(data,status,headers,config) {
			$scope.choices = data;

		});
	
    }
	$scope.create = function(){
		
		var newPost = document.getElementById("newPost").value;
		if (newPost != null && newPost != "") {
			var myparams = {function:"insert", choice: newPost};
			var config = {params: myparams};
			var responsePromise = $http.get("api.php",config);
			responsePromise.success(function(data,status,headers,config) {
				$scope.choices = data;
		
			});
		
		}
	
	}
	$scope.user_logged_in = function() {
		//$scope.notAuth = false;
		console.log($scope.notAuth.toString());
		if(isLogged()){
			$scope.notAuth = false;
		}
		else {
			$scope.notAuth = true;
		}
	}
	return;
});


