define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'ngAutocomplete'], function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope','RouteService', function ($scope, RouteService){

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


      $scope.saveRoute = function() {

            var places = [];
            places.push({id: $scope.details_shop.place_id, type:0});
            places.push({id: $scope.details_museum.place_id, type:1});
            places.push({id: $scope.details_food.place_id, type:2});
            var routeJSON = {
                title: $scope.title,
                description: $scope.description,
                url_title: 'url_title',
                places: places
            }
            RouteService.createRoute(routeJSON).then(function(res) {
                console.log("Res:"+ res.config.data.id);
                console.log("Res:"+ res.config.data.title);
            })
      }
  }]);
});
