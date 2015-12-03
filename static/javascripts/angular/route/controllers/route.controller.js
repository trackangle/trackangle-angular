/**
* Register controller
* @namespace trackangle.route.controllers
* @namespace trackangle.route.controllers
*/
(function () {
  'use strict';

  angular
    .module('trackangle.route.controllers')
    .controller('RouteController', RouteController);

  RouteController.$inject = ['$location', '$scope', '$http', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function RouteController($location, $scope, $http, RouteService) {
    $http.get('/api-1.0/route/').then(getSuccessFunction, errorFunction);

    function getSuccessFunction(data, status, headers, config) {
    	console.log("On success: "+ data.data);
    	$scope.routes = data.data;
    };

    function errorFunction(data, status, headers, config) {
    	console.log("An error occured: " + data.error);
    }
 
  }
})();