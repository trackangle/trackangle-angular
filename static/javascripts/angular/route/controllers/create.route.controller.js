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

  CreateRouteController.$inject = ['$location', '$scope', '$http', 'RouteService'];

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
      $scope.options2 = {};
      $scope.details2 = '';

      $scope.$watch('details1', function(){
        console.log("Has changed");
        if($scope.details1) {
          $scope.options2 = {
               watchEnter: true,
               types: '(cities)',
               country: $scope.details1.address_components[0].short_name.toLowerCase()
            };
        }
      });

      $scope.saveRoute = function() {
        RouteService.createRoute('tr', 'konya').then(function(res) {
          console.log("Res:"+ res);
        })
      }
  }
})();