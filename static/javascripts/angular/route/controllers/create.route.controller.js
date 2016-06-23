define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'angular-google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope','RouteService', function ($scope, RouteService){

       /*create route page navbar fuctions*/
        $scope.markers_city = [];
        $scope.markers_food = [];
        $scope.markers_accomodation = [];
        $scope.markers_nightlife = [];
        $scope.markers_entertainment = [];
        $scope.markers_architecture = [];
        $scope.markers_outdoor = [];

        $scope.defaultBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(40.82148, -73.66450),
            new google.maps.LatLng(40.66541, -74.31715));




        $scope.map = {
            control: {},
            center: {
                latitude: 52.47491894326404,
                longitude: -1.8684210293371217
            },
            zoom: 12,
            markers: [],
            markersEvents: {
                click: function(marker, eventName, model) {
                    console.log(marker);
                    console.log(model);
                    $scope.map.window.model = model;
                    $scope.map.window.show = true;
                }
            },
            window: {
                marker: {},
                show: false,
                closeClick: function() {
                    this.show = false;
                },
                options: {}, // define when map is ready
                templateUrl: '/static/javascripts/angular/route/templates/infowindow.html',
                templateParameter: {
                    rating:'inputRating',
                    budget: '$5',
                    comment: 'nayso'
                }
            },
            searchbox: {
                template: '/static/javascripts/angular/route/templates/searchbox.html',
                options: {
                    autocomplete:true,
                    //types: ['(cities)', 'establishment']
                    //types: ['establishment']
                },
                position:"TOP_LEFT",
                control: {},
                events: {
                    place_changed: function (searchBox) {
                        var place = searchBox.getPlace();
                        if (!place || place == 'undefined' || place.length == 0) {
                            console.log('no place data :(');
                            return;
                        }
                        var marker_id = 0
                        if($scope.map.markers.length != 0){
                            marker_id = $scope.map.markers[$scope.map.markers.length - 1].id + 1
                        }

                        var marker = {
                            id: marker_id,
                            latitude: place.geometry.location.lat(),
                            longitude: place.geometry.location.lng()
                        };

                        $scope.map.markers.push(marker);
                    }
                }
            }
        }; //TODO:  set location based on users current gps location

        $scope.savePlaceDetails = function(){
            console.log("AAAAAAAAAAAAAAAAAAAAa");
            console.log($("#inputRating").val());
        };


        var selected = this;
        $scope.set_right_navbar = function (placetype) {


            $scope.map.window.closeClick();

            if($scope.get_right_navbar() == "route_essentials"){

                $scope.markers_city = $scope.map.markers;
                var bounds = new google.maps.LatLngBounds();
                for (var i in $scope.markers_city) { // your marker list here
                    var position = new google.maps.LatLng($scope.markers_city[i].latitude, $scope.markers_city[i].longitude);
                    bounds.extend(position); // your marker position, must be a LatLng instance
                }
                $scope.map.searchbox.options.bounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
            }else if($scope.get_right_navbar() == "accomodation"){
                $scope.markers_accomodation = $scope.map.markers;
            }else if($scope.get_right_navbar() == "food"){
                $scope.markers_food = $scope.map.markers;
            }else if($scope.get_right_navbar() == "nightlife"){
                $scope.markers_nightlife = $scope.map.markers;
            }else if($scope.get_right_navbar() == "entertainment_arts"){
                $scope.markers_entertainment = $scope.map.markers;
            }else if($scope.get_right_navbar() == "architecture_buildings"){
                $scope.markers_architecture = $scope.map.markers;
            }else if($scope.get_right_navbar() == "architecture_buildings"){
                $scope.markers_architecture = $scope.map.markers;
            }else if($scope.get_right_navbar() == "outdoor"){
                $scope.markers_outdoor = $scope.map.markers;
            }


            if(placetype == "route_essentials"){
                $scope.map.markers = $scope.markers_city;
                console.log($scope.map.searchbox.options.bounds);
                delete $scope.map.searchbox.options["bounds"];
                console.log($scope.map.searchbox.options.bounds);
                //$scope.map.searchbox.options.types =['(cities)'];
            }else if(placetype == "accomodation"){
                $scope.map.markers = $scope.markers_accomodation;
                //$scope.map.searchbox.options.types =['establishment'];
            }else if(placetype == "food"){
                $scope.map.markers = $scope.markers_food;
                //$scope.map.searchbox.options.types =['establishment'];
            }else if(placetype == "nightlife"){
                $scope.map.markers = $scope.markers_nightlife;
                //$scope.map.searchbox.options.types =['establishment'];
            }else if(placetype == "entertainment_arts"){
                $scope.map.markers = $scope.markers_entertainment;
                //$scope.map.searchbox.options.types =['establishment'];
            }else if(placetype == "outdoor"){
                $scope.map.markers = $scope.markers_outdoor;
                //$scope.map.searchbox.options.types =['establishment'];
            }


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
            console.log("GET PARTIAL: " + selected.li);
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

