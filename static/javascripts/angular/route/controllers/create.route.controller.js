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
        watchEnter: true,
        types: '(cities)'
      };
      $scope.details1 = '';

      $scope.result2 = '';
      $scope.options2 = {};
      $scope.details2 = '';

      $scope.$watch('details1', function(){
        console.log("Has changed");
        if($scope.details1) {
          console.log($scope.details1);
          var country_index = $scope.details1.address_components.length - 1;
          console.log(country_index);
          $scope.options2 = {
               watchEnter: true,
               types: 'establishment',
               country: $scope.details1.address_components[country_index].short_name.toLowerCase()
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