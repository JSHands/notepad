(function () {
	
	"use strict";
	
	angular.module("app").controller('EditorController', ['$scope', '$http', ($scope, $http) => {
		
		$scope.editing = true;
		$scope.notes = [];
		
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
			
			console.log("Saving note...");
			
			$scope.content.date = new Date();
			
			if ($scope.content.id) {
				$http.put('http://localhost:5000/notes/' +
					$scope.content.id, $scope.content).success((data) => {
					$scope.editing = false;
				}).error((err) => {
					$scope.error = 'Could not update note';
				})
			} else {
				$scope.content.id = Date.now();
				$http.post('http://localhost:5000/notes', $scope.content).success((data) => {
					$scope.notes.push($scope.content);
					$scope.editing = false;
				}).error((err) => {
					$scope.error = 'Could not create note';
				})
			}
			
		};
		
		$scope.remove = () => {
			$http.delete('http://localhost:5000/notes/' + $scope.content.id).success((data) => {
				let index = data.index;
				
				console.log("INDEX TO BE DELETED: " + index);
				
				if (index > -1) {
					$scope.notes.splice(index,  1);
				}
				
				$scope.content = {
					title: '',
					content: ''
				};
				
			}).error((err) => {
				$scope.error = 'Could not delete note.';
			})
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