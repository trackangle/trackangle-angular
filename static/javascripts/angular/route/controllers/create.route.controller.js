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

      $scope.result2 = '';
      $scope.options2 =
      {
           watchEnter: true,
           country: $scope.details1.address_components[0].short_name.toLowerCase()
      };
      $scope.details2 = '';
  }
})();