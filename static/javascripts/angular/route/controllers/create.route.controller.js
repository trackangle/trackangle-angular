define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'google-maps', 'ngMap'], function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope','RouteService', function ($scope, RouteService){

       /*create route page navbar fuctions*/
        $scope.markers_city = [];
        $scope.markers_food = [];
        $scope.markers_accomodation = [];
        $scope.markers_nightlife = [];
        $scope.markers_entertainment = [];
        $scope.markers_architecture = [];
        $scope.markers_outdoor = [];

        var selected = this;
        $scope.set_right_navbar = function (placetype) {

            for(var i=0; i< $scope.markers_city.length; i++) {
                $scope.bounds = {"lat":$scope.markers_city[i].location_lat, "lng":$scope.markers_city[i].location_lng}
            }
            if($scope.bounds){
                $scope.lat = $scope.bounds.lat;
                $scope.lng = $scope.bounds.lng;
            }
            selected.li = placetype;
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
        $scope.accomodationTypes = [
            {types: 'hostels', displayName: 'Hostel'},
            {types: 'hotels', displayName: 'Hotel'},
            {types: 'campings', displayName: 'Camping'},
            {types: 'home_rentals', displayName: 'Home Rental'},
            {types: 'couchsurfings', displayName: 'Couchsurfing'}
        ];
        $scope.selectedAccomodationType = $scope.accomodationTypes[0];
          /*Route Essentials*/
        $scope.title = { route_title: "" };
        $scope.description = { route_description: "" };


        $scope.saveRoute = function() {
            var places = [];
            places = places.concat($scope.markers_accomodation)
            .concat($scope.markers_architecture)
            .concat($scope.markers_entertainment)
            .concat($scope.markers_food)
            .concat($scope.markers_nightlife)
            .concat($scope.markers_outdoor);
            console.log(places);

              var routeJSON = {
                  title: $scope.title.route_title,
                  description: $scope.description.route_description,
                  url_title: 'url_title',
                  places: places
              }
              console.log(routeJSON);
              RouteService.createRoute(routeJSON).then(function(res) {
                  console.log("Res:"+ res.config.data.id);
                  console.log("Res:"+ res.config.data.title);
              })
        }
      }]);
});

