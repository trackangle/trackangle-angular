/**
* Register controller
* @namespace trackangle.route.controllers
* @namespace trackangle.route.controllers
*/
(function () {
  'use strict';

  angular
    .module('trackangle.route.controllers')
    .controller('RoutesController', RoutesController);

  RoutesController.$inject = ['$location', '$scope', '$http', 'RouteService'];

  /**
  * @namespace RegisterController
  */
  function RoutesController($location, $scope, $http, RouteService) {
      console.log("asdasdasd");
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