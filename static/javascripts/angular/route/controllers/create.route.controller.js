/**
* Register controller
* @namespace trackangle.route.controllers
* @namespace trackangle.route.controllers
*/
(function () {
  'use strict';

  angular
    .module('trackangle.route.controllers')
    .controller('CreateRouteController', CreateRouteController);

  CreateRouteController.$inject = ['$location', '$scope', '$http', 'Authentication'];

  /**
  * @namespace RegisterController
  */
  function CreateRouteController($location, $scope, $http, RouteService) {
      console.log("Second controller");

      $scope.result1 = '';
      $scope.options1 = 
      {
        watchEnter: true
      };
      $scope.details1 = '';
  }
})();