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

      $scope.result_city = '';
      $scope.options_city =
      {
        watchEnter: true,
        types: '(cities)'
      };
      $scope.details_city = '';

      $scope.result_museum = '';
      $scope.options_museum = {};
      $scope.details_museum = '';

      $scope.result_food = '';
      $scope.options_food = {};
      $scope.details_food = '';

      $scope.result_shop = '';
      $scope.options_shop = {};
      $scope.details_shop = '';

      $scope.$watch('details_city', function(){
        if($scope.details_city) {
          var country_index = $scope.details_city.address_components.length - 1;
          $scope.options_museum = {
               watchEnter: true,
               types: 'establishment',
               country: $scope.details_city.address_components[country_index].short_name.toLowerCase()
          };
          $scope.options_food = {
               watchEnter: true,
               types: 'establishment',
               country: $scope.details_city.address_components[country_index].short_name.toLowerCase()
          }
          $scope.options_shop = {
               watchEnter: true,
               types: 'establishment',
               country: $scope.details_city.address_components[country_index].short_name.toLowerCase()
          }
        }
      });

      $scope.$watch('details_museum', function(){
          if($scope.details_museum) {
              $scope.museum_data = $scope.details_museum.place_id;
          }
      });
       $scope.$watch('details_food', function(){
          if($scope.details_food) {
              $scope.food_data = $scope.details_food.place_id;
          }
      });
      $scope.$watch('details_shop', function(){
          if($scope.details_shop) {
              $scope.shop_data = $scope.details_shop.place_id;
          }
      });

      $scope.saveRoute = function() {
          RouteService.createRoute($scope.title, $scope.description, 'urltitle', $scope.museum_data, $scope.food_data, $scope.shop_data).then(function(res) {
            console.log("Res:"+ res);
          })
      }
  }
})();