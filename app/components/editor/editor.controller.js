(function () {
	
	"use strict";
	
	angular.module("app").controller('EditorController', ['$scope', '$http', ($scope, $http) => {
		
		$scope.editing = true;
		$scope.notes = [];
		$scope.test = "lol";
		
		$http.get('http://localhost:5000/notes').
			success((data) => {
				$scope.notes = data;
		}).
			error((err) => {
				console.log(err);
				$scope.error = 'Could not load notes';
		})
		
	}]);
	
})();