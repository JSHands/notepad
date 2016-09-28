(function () {
	
	"use strict";
	
	angular.module("app").controller('EditorController', ['$scope', '$http', ($scope, $http) => {
		
		$scope.editing = true;
		$scope.notes = [];
		$scope.test = "lol";
		
		$scope.view = (index) => {
			$scope.editing = false;
			$scope.content = $scope.notes[index];
		};
		
		$scope.create = () => {
			$scope.editing = true;
			$scope.content = {
				title: '',
				content: ''
			}
		};
		
		$scope.save = () => {
			$scope.content.date = new Date();
			
			if ($scope.content.id) {
				$http.put('http://localhost:5000/notes/' + $scope.content.id, $scope.content).success((data) => {
					$scope.editing = false;
				}).error((err) => {
					$scope.error = 'Could not update note';
				})
			}
			
		};
		
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