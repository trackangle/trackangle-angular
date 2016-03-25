define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'ngAutocomplete'], function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope','RouteService', function ($scope,$location, RouteService){


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
      var selected = this
      $scope.set_right_navbar = function (asd) {
        selected.li = asd;
        console.log(selected.li)
      };
      $scope.get_right_navbar = function (){
        return selected.li;
      };

      $scope.choices = [{id: 'choice1'}];
      $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.unshift({'id':'choice'+newItemNo});
      };

      $scope.saveRoute = function() {
        RouteService.createRoute($scope.title, $scope.description, 'urltitle', $scope.details_museum.place_id, $scope.details_food.place_id, $scope.details_shop.place_id).then(function(res) {
          console.log("Res:"+ res.config.data.id);
          console.log("Res:"+ res.config.data.title);
        })
      }

  }]);
});
