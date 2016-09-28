(function () {
	
	"use strict";
	
	angular.module("app").controller('EditorController', ['$scope', 'Notes', ($scope, Notes) => {
		
		$scope.editing = true;
		$scope.notes = 	$scope.notes = Notes.query();
		
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
		
		$scope.switchEditMode = () => {
			$scope.editing = !$scope.editing;
		};
		
		$scope.save = () => {
			
			$scope.content.date = new Date();
			
			if ($scope.content.id) {
				
				Notes.update(
					{
						id: $scope.content.id
					},
					$scope.content,
					(data) => {
						$scope.editing = false;
				}, (err) => {
						$scope.error = 'Could not update note';
					});
				
			} else {
				$scope.content.id = Date.now();
				
				Notes.save(
					$scope.content,
					(res) => {
						$scope.notes.push($scope.content);
						$scope.editing = false;
					},
					(err) => {
						$scope.error = 'Could not create note';
					}
				);
			}
			
		};
		
		$scope.remove = () => {
			
			Notes.delete(
				{
					id: $scope.content.id
				},
				(response) => {
					let index = response.index;
					
					if (index > -1) {
						$scope.notes.splice(index,  1);
					}
					
					$scope.content = {
						title: '',
						content: ''
					};
				},
				(err) => {
					$scope.error = 'Could not delete note.';
				}
			);
		};
		
	}]);
	
})();