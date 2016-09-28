(function () {
	"use strict";
	
	angular.module('app').directive('markdown', () => {
		let converter = new showdown.Converter();
		return {
			scope: {
				markdown: '@'
			},
			link: function (scope, element, attrs) {
				scope.$watch('markdown', function () {
					let content = converter.makeHtml(attrs.markdown);
					element.html(content);
				})
			}
		}
	})
	
})();