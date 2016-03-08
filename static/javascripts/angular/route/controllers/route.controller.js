/**
* Register controller
* @namespace trackangle.route.controllers
* @namespace trackangle.route.controllers
*/
(function () {
  'use strict';

  angular
    .module('trackangle.route.controllers', ['ngAutocomplete'])
    .controller('RouteController', RouteController);

  RouteController.$inject = ['$location', '$scope', '$http', '$routeParams', 'RouteService'];

  /**
  * @namespace RegisterController
  */
  function RouteController($location, $scope, $http, $routeParams, RouteService) {
    console.log($routeParams.id);
 
  }
})();