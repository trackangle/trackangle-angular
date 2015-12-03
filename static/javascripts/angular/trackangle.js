(function () {
	'use strict';

	angular
		.module('trackangle', [
			'trackangle.config',
			'trackangle.routes',
			'trackangle.authentication',
			'trackangle.route'
		]);


		angular.module('trackangle.config', []);
		angular.module('trackangle.routes', ['ngRoute']);

		angular.module('trackangle').run(run);

		run.$inject = ['$http'];

		/**
		* @name run
		* @desc Update xsrf $http headers to align with Django's defaults
		*/
		function run($http) {
			$http.defaults.xsrfHeaderName = 'X-CSRFToken';
			$http.defaults.xsrfCookieName = 'csrftoken';
		}
})();
