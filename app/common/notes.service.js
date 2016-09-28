(function () {
	
	"use strict";
	
	angular.module('app').factory('Notes', ['$resource', function ($resource) {
		return $resource('http://localhost:5000/notes/:id',
			{},
			{
				update: {
					method: 'PUT'
				}
			}
		)
	}]);
	
})();
