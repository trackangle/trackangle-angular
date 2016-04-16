define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'ngAutocomplete'], function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope','RouteService', function ($scope,$location, RouteService){

       /*create route page navbar fuctions*/
      var selected = this;
      $scope.set_right_navbar = function (asd) {
        selected.li = asd;
      };
      $scope.get_partial = function (){
        return "/static/javascripts/angular/route/templates/"+selected.li+".html";
      };
      $scope.get_right_navbar = function (){
        return selected.li;
      };
        /*create route page adding new place*/
      $scope.choices = [{id: 'choice1'}];
      $scope.addNewChoice = function() {
        var newItemNo = $scope.choices.length+1;
        $scope.choices.unshift({'id':'choice'+newItemNo});
      };
        /*create route page tab changing buttons*/
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
      };
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
      };
        /*Route Essentials*/
      $scope.title = { route_title: "" };
      $scope.description = { route_description: "" };
      $scope.result_city = { route_result: "" };
      $scope.options_city =
      {
        watchEnter: true,
        types: '(cities)'
      };
      $scope.details_city = { route_details: "" };

        /* Fodd Details*/
      $scope.result_food = { food_result: "" };
      $scope.options_food = {};
      $scope.details_food = { food_details: "" };
      $scope.food_star_rating = { star_rating: ""};
      $scope.food_budget = {budget: ""};
      $scope.food_comment = {comment: ""};

        /*Nightlife Details*/
      $scope.result_nightlife = { nightlife_result: "" };
      $scope.options_nightlife = {};
      $scope.details_nightlife = { nightlife_details: "" };

        /*Entertainment and Arts Details*/
      $scope.result_entertainment_arts = { entertainment_arts_result: "" };
      $scope.options_entertainment_arts = {};
      $scope.details_entertainment_arts = { entertainment_arts_details: "" };

        /*Architecture and Buildings Details */
      $scope.result_architecture_buildings = { architecture_buildings_result: "" };
      $scope.options_architecture_buildings = {};
      $scope.details_architecture_buildings = { architecture_buildings_details: "" };

        /*Outdoor Details*/
      $scope.result_outdoor = { outdoor_result: "" };
      $scope.options_outdoor = {};
      $scope.details_outdoor = { outdoor_details: "" };

      $scope.$watch('details_city.route_details', function(){
        if($scope.details_city.route_details) {
          var country_index = $scope.details_city.route_details.address_components.length - 1;
            $scope.options_food = {
            watchEnter: true,
            type: 'establishment',
            country: $scope.details_city.route_details.address_components[country_index].short_name.toLowerCase()
          };
        }
      });
      $scope.saveRoute = function() {
          //console.log($scope.details_city);
          //console.log($scope.details_food.food_details);
          //console.log($scope.food_star_rating.star_rating);
          //console.log($scope.food_budget.budget);
          //console.log($scope.food_comment.comment);
            var places = [];
            places.push({
              id: $scope.details_food.food_details.place_id,
              type:0,
              location_lat:$scope.details_food.food_details.geometry.location.lat(),
              location_lng:$scope.details_food.food_details.geometry.location.lng(),
              rating: $scope.food_star_rating.star_rating,
              budget: $scope.food_budget.budget,
              comment: $scope.food_comment.comment
            });
            //places.push({id: $scope.details_museum.place_id, type:1, location_lat:$scope.details_museum.geometry.location.lat(), location_lng:$scope.details_museum.geometry.location.lng()});
            //places.push({id: $scope.details_food.place_id, type:2, location_lat:$scope.details_food.geometry.location.lat(), location_lng:$scope.details_food.geometry.location.lng()});
            var routeJSON = {
                title: $scope.title.route_title,
                description: $scope.description.route_description,
                url_title: 'url_title',
                places: places
            };
            console.log(routeJSON);
            RouteService.createRoute(routeJSON).then(function(res) {
                console.log("Res:"+ res.config.data.id);
                console.log("Res:"+ res.config.data.title);
            })
      }
  }]);
});
