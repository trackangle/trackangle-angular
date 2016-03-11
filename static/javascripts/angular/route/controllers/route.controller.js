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

  RouteController.$inject = ['$location', '$scope', '$http', '$routeParams', 'RouteService'];

  /**
  * @namespace RegisterController
  */
  function RouteController($location, $scope, $http, $routeParams, RouteService) {
    console.log($routeParams.id);
    $http.get('/api-1.0/route/' + $routeParams.id + '/').then(getSuccessFunction, errorFunction);

    function getSuccessFunction(data, status, headers, config) {
    	$scope.route = data.data;
    };

    function errorFunction(data, status, headers, config) {
    	console.log("An error occured: " + data.error);
    }
 
  }
})();