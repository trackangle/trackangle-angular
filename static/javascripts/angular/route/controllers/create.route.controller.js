define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'angular-google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope', '$routeParams', 'RouteService', function ($scope, $routeParams, RouteService){


        var geocoder = new google.maps.Geocoder;
        $scope.cityList = [];
        initMap();

        var accomodation = 0;
        var architecture = 1;
        var entertainment = 2;
        var food = 3;
        var nightlife = 4;
        var outdoor = 5;

        $scope.placeTypes = {
            'accomodation': accomodation,
            'architecture': architecture,
            'entertainment': entertainment,
            'food': food,
            'nightlife': nightlife,
            'outdoor': outdoor
        };


        $scope.markers = [];

        var clickedMarkerId = -1;

        function addMarker(place, cityIndex){
            var marker_id = 0;
            if($scope.map.markers.length != 0){
                marker_id = $scope.map.markers[$scope.map.markers.length - 1].id + 1
            }

            var marker = {
                id: marker_id,
                latitude: place.location_lat,
                longitude: place.location_lng,
                type: place.type,
                place_id: place.id,
                city: $scope.cityList[cityIndex].formatted_address.split(',')[0],
                comment: "",
                rating: "",
                budget: ""
            };


            if($scope.currentCityIndex == cityIndex && place.type == $scope.get_right_navbar()){
                $scope.map.markers.push(marker);
            }
            $scope.markers[cityIndex].push(marker);
        }

        function initMap() {

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
                        clickedMarkerId = model.id;
                        $scope.map.window.templateParameter = {
                            rating: model.rating,
                            budget: model.budget,
                            comment: model.comment
                        };
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
                            var placeObj = {
                                id: place.place_id,
                                location_lat: place.geometry.location.lat(),
                                location_lng: place.geometry.location.lng(),
                                type: $scope.get_right_navbar()
                            }
                            addMarker(placeObj, $scope.currentCityIndex);
                        }
                    }
                }
            }; //TODO:  set location based on users current gps location

            var placeIdArr = $routeParams.placeId.split("|");

            for(var i = 0; i < placeIdArr.length; i++) {
                var cityId = placeIdArr[i];
                geocoder.geocode({'placeId': cityId}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $scope.cityList.push(results[0]);
                            $scope.markers[$scope.cityList.length - 1] = [];

                            if ($scope.cityList.length == 1) {
                                $scope.changeCity(0);
                            }
                            if($scope.cityList.length == placeIdArr.length){
                                initMarkers();
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

            function initMarkers() {
                if($routeParams.routeId) {
                    RouteService.route($routeParams.routeId).then(getSuccessFunction, errorFunction);
                    function getSuccessFunction(data, status, headers, config) {
                        var route = data.data;
                        var cityNameList = [];
                        for (var i = 0; i < $scope.cityList.length; i++) {
                            cityNameList.push($scope.cityList[i].formatted_address.split(',')[0])
                        }
                        for (var i = 0; i < route.places.length; i++) {
                            var cityIndex = cityNameList.indexOf(route.places[i].city);
                            addMarker(route.places[i], cityIndex);
                        }
                    }

                    function errorFunction(data, status, headers, config) {
                        console.log("An error occured: " + data.error);
                    }
                }
            }

        }

        $scope.changeCity = function(cityIndex){
            $scope.currentCityIndex = cityIndex;
            $scope.set_right_navbar(accomodation);

            var city = $scope.cityList[$scope.currentCityIndex];
            var bounds = new google.maps.LatLngBounds();
            var position = new google.maps.LatLng(city.geometry.location.lat(), city.geometry.location.lng());
            bounds.extend(position); // your marker position, must be a LatLng instance
            $scope.map.searchbox.options.bounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
            $scope.map.center = {
                latitude: bounds.getCenter().lat(),
                longitude: bounds.getCenter().lng()
            }

        };

        $scope.isCitySelected = function(cityIndex){
            return $scope.currentCityIndex === cityIndex;
        };

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

            $(".autocomplete-box").val("");
            $scope.map.zoom = 12;
            $scope.map.window.closeClick();

            selected.li = placetype;
            $scope.map.markers = $scope.markers[$scope.currentCityIndex].filter(function (el) {
                return el.type == $scope.get_right_navbar();
            });
        };
        $scope.get_partial = function (){
            return "/static/javascripts/angular/route/templates/"+selected.li+".html";
        };
        $scope.get_right_navbar = function (){
            return selected.li;
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


        $scope.saveRoute = function() {

            var places = [];
            for(var i = 0; i < $scope.markers.length; i++) {
                for (var j = 0; j < $scope.markers[i].length; j++) {
                    var place = {
                        id: $scope.markers[i][j].place_id,
                        location_lat: $scope.markers[i][j].latitude,
                        location_lng: $scope.markers[i][j].longitude,
                        city: $scope.markers[i][j].city,
                        type: $scope.markers[i][j].type
                    };
                    places.push(place);
                }
            }

            var routeJSON = {
                title: "title1",
                description: "desc1",
                url_title: 'url_title',
                places: places,
                id: -1
            };

            if($routeParams.routeId){
                routeJSON.id = $routeParams.routeId;
            }

            console.log(routeJSON);
            RouteService.createRoute(routeJSON).then(function(res) {
                console.log("Res:"+ res.config.data.id);
                console.log("Res:"+ res.config.data.title);
            })
        }
      }]);
});

