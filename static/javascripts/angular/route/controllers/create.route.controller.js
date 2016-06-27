define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'angular-google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope', '$routeParams', 'RouteService', function ($scope, $routeParams, RouteService){


        var geocoder = new google.maps.Geocoder;
        $scope.cityNames = [];

        placeIdArr = $routeParams.placeId.split("|")
        for(var i = 0; i < placeIdArr.length; i++){
            getPlaceFromId(placeIdArr[i]);
        }


       /*create route page navbar fuctions*/
        $scope.markers_food = [];
        $scope.markers_accomodation = [];
        $scope.markers_nightlife = [];
        $scope.markers_entertainment = [];
        $scope.markers_architecture = [];
        $scope.markers_outdoor = [];

        var clickedMarkerId = -1;

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
                    clickedMarkerId = model.id;
                    $scope.map.window.templateParameter = {
                        rating: model.rating,
                        budget: model.budget,
                        comment: model.comment
                    }
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
            },
            searchbox: {
                template: '/static/javascripts/angular/route/templates/searchbox.html',
                options: {
                    autocomplete:true,
                    types: ['establishment']
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
                            longitude: place.geometry.location.lng(),
                            comment: "",
                            rating: "",
                            budget: ""
                        };

                        $scope.map.markers.push(marker);
                    }
                }
            }
        }; //TODO:  set location based on users current gps location

        function getPlaceFromId(placeId) {
            geocoder.geocode({'placeId': placeId}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var city = results[0];
                        $scope.cityNames.push(city.formatted_address.split(',')[0]);
                        var bounds = new google.maps.LatLngBounds();
                        var position = new google.maps.LatLng(city.geometry.location.lat(), city.geometry.location.lng());
                        bounds.extend(position); // your marker position, must be a LatLng instance
                        $scope.map.searchbox.options.bounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
                        $scope.map.center = {
                            latitude: bounds.getCenter().lat(),
                            longitude: bounds.getCenter().lng()
                        }
                    }
                    else {
                        window.alert('No results found');
                    }
                }
                else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });
        }

        $scope.savePlaceDetails = function(){
            for(var i = 0; i < $scope.map.markers.length; i++){
                var marker_id = $scope.map.markers[i].id;
                if(marker_id == clickedMarkerId){
                    $scope.map.markers[i].comment = $("#inputComment").val();
                    $scope.map.markers[i].rating = $("#inputRating").val();
                    $scope.map.markers[i].budget = $("#inputBudget").val();
                    break;
                }
            }
            $scope.map.window.closeClick();
        };


        var selected = this;
        $scope.set_right_navbar = function (placetype) {


            $scope.map.window.closeClick();

            if($scope.get_right_navbar() == "accomodation"){
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


            if(placetype == "accomodation"){
                $scope.map.markers = $scope.markers_accomodation;
            }else if(placetype == "food"){
                $scope.map.markers = $scope.markers_food;
            }else if(placetype == "nightlife"){
                $scope.map.markers = $scope.markers_nightlife;
            }else if(placetype == "entertainment_arts"){
                $scope.map.markers = $scope.markers_entertainment;
            }else if(placetype == "outdoor"){
                $scope.map.markers = $scope.markers_outdoor;
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

