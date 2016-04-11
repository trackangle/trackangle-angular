define(['trackangle', '/static/javascripts/angular/route/services/route.service.js','/static/javascripts/angular/route/directives/places.js', 'ngAutocomplete'], function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope','RouteService', function ($scope,$location, RouteService){


            var selected = this
      $scope.set_right_navbar = function (asd) {
        selected.li = asd;
      };
      $scope.get_right_navbar = function (){
        return selected.li;
      };

      $scope.choices = [{id: 'choice1'}];
      $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.unshift({'id':'choice'+newItemNo});
      };

      $scope.previous_tab = function() {
        if($scope.get_right_navbar() == "food"){
          $scope.set_right_navbar("accomodation");
        }else if($scope.get_right_navbar() == "nightlife"){
          $scope.set_right_navbar("food");
        }else if($scope.get_right_navbar() == "entertainment_arts"){
          $scope.set_right_navbar("nightlife");
        }else if($scope.get_right_navbar() == "architecture_buildings"){
          $scope.set_right_navbar("entertainment_arts");
        }else if($scope.get_right_navbar() == "outdoor"){
          $scope.set_right_navbar("architecture_buildings");
        }
      }
      $scope.next_tab = function() {
        if($scope.get_right_navbar() == "accomodation"){
          $scope.set_right_navbar("food");
        }else if($scope.get_right_navbar() == "food"){
          $scope.set_right_navbar("nightlife");
        }else if($scope.get_right_navbar() == "nightlife"){
          $scope.set_right_navbar("entertainment_arts");
        }else if($scope.get_right_navbar() == "entertainment_arts"){
          $scope.set_right_navbar("architecture_buildings");
        }else if($scope.get_right_navbar() == "architecture_buildings"){
          $scope.set_right_navbar("outdoor");
        }
      }

       $scope.result_city = '';
      $scope.options_city =
      {
        watchEnter: true,
        types: '(cities)'
      };

      $scope.details_city = '';
      $scope.result_food = '';
      $scope.options_food = {};
      $scope.details_food = '';

      $scope.result_nightlife = '';
      $scope.options_nightlife = {};
      $scope.details_nightlife = '';

      $scope.result_entertainment_arts = '';
      $scope.options_entertainment_arts = {};
      $scope.details_entertainment_arts = '';

      $scope.result_architecture_buildings = '';
      $scope.options_architecture_buildings = {};
      $scope.details_architecture_buildings = '';

      $scope.result_outdoor = '';
      $scope.options_outdoor = {};
      $scope.details_outdoor = '';

      $scope.$watch('details_city', function(){
        if($scope.details_city) {
          var country_index = $scope.details_city.address_components.length - 1;
          $scope.options_food = {
            watchEnter: true,
            type: 'establishment',
            country: $scope.details_city.address_components[country_index].short_name.toLowerCase()
          };
        }
      });
      $scope.food_details = function () {
        console.log("ersan dedi");
        $scope.$watch('details_food', function () {
          if ($scope.details_food) {
            console.log("atz2");
          }
        });
      }
      $scope.saveRoute = function() {

            console.log($scope.details_food);
            console.log($scope.details_food.place_id);
            console.log($scope.details_food.geometry.location.lat());
            console.log($scope.details_food.geometry.location.lng());
            var places = [];
            places.push({id: $scope.details_food.place_id, type:0, location_lat:$scope.details_food.geometry.location.lat(), location_lng:$scope.details_food.geometry.location.lng()});
            //places.push({id: $scope.details_museum.place_id, type:1, location_lat:$scope.details_museum.geometry.location.lat(), location_lng:$scope.details_museum.geometry.location.lng()});
            //places.push({id: $scope.details_food.place_id, type:2, location_lat:$scope.details_food.geometry.location.lat(), location_lng:$scope.details_food.geometry.location.lng()});
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
