var dependencies =[
    'trackangle',
    'route',
    'angular-google-maps',
    'jquery',
    'authentication'
];

define(dependencies, function (trackangle) {
    trackangle.register.controller('CreateRouteController', ['$scope', '$routeParams', '$window', 'Route', 'Authentication', function ($scope, $routeParams, $window, Route, Authentication){


        var geocoder = new google.maps.Geocoder;
        var markers = {};
        var clickedMarkerId = -1;
        var accomodation = 0;
        var architecture = 1;
        var entertainment = 2;
        var food = 3;
        var nightlife = 4;
        var outdoor = 5;

        console.log(Authentication.isAuthenticated());
        $scope.route = {};


        $scope.init = function() {

            $scope.placeTypes = {
                'accomodation': accomodation,
                'architecture': architecture,
                'entertainment': entertainment,
                'food': food,
                'nightlife': nightlife,
                'outdoor': outdoor
            };

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
                                type: $scope.get_right_navbar(),
                                comments: [{
                                    text:""
                                }],
                                ratings: [{
                                    rate:""
                                }],
                                budgets: [{
                                    budget:""
                                }]
                            };
                            addMarker($scope.currentCity, placeObj, true);
                        }
                    }
                }
            };


            Route.route($routeParams.routeId).then(getSuccessFunction, errorFunction);
            function getSuccessFunction(data, status, headers, config) {
                $scope.route = data.data;
                console.log($scope.route);
                var isCurrentCity = true;
                for(var i = 0; i < $scope.route.cities.length; i++){
                    if(i != 0){
                        isCurrentCity = false;
                    }
                    var city = $scope.route.cities[i];
                    markers[city.id] = [];
                    for(var j = 0; j < city.places.length; j++){
                        addMarker(city, city.places[j], isCurrentCity);
                    }
                }
                $scope.changeCity($scope.route.cities[0]);

            }
            function errorFunction(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            }


        };


        function addMarker(city, place, isCurrentCity){
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
                comment: place.comments.text,
                rating: place.ratings.rate,
                budget: place.budgets.budget
            };


            if(isCurrentCity){
                $scope.map.markers.push(marker);
            }
            markers[city.id].push(marker);
        }

        $scope.removeMarker = function(){
            $scope.map.markers = $scope.map.markers.filter(function( obj ) {
                return obj.id != clickedMarkerId;
            });
            markers[$scope.currentCity.id] = markers[$scope.currentCity.id].filter(function (obj) {
                return obj.id != clickedMarkerId;
            });
        };

        $scope.changeCity = function(city){
            $scope.currentCity = city;
            $scope.set_right_navbar(accomodation);

            var bounds = new google.maps.LatLngBounds();
            var position = new google.maps.LatLng(city.location_lat, city.location_lng);
            bounds.extend(position); // your marker position, must be a LatLng instance
            $scope.map.searchbox.options.bounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
            $scope.map.center = {
                latitude: bounds.getCenter().lat(),
                longitude: bounds.getCenter().lng()
            }

        };

        $scope.isCitySelected = function(id){
            return $scope.currentCity.id === id;
        };


        $scope.savePlaceComment = function(){
            for(var i = 0; i < $scope.map.markers.length; i++){
                var marker_id = $scope.map.markers[i].id;
                if(marker_id == clickedMarkerId){
                    $scope.map.markers[i].comment = $scope.map.window.templateParameter.comment;
                    break;
                }
            }
        };

        $scope.savePlaceRating = function(){
            for(var i = 0; i < $scope.map.markers.length; i++){
                var marker_id = $scope.map.markers[i].id;
                if(marker_id == clickedMarkerId){
                    $scope.map.markers[i].rating = $scope.map.window.templateParameter.rating;
                    break;
                }
            }
        };

        $scope.savePlaceBudget = function(){
            for(var i = 0; i < $scope.map.markers.length; i++){
                var marker_id = $scope.map.markers[i].id;
                if(marker_id == clickedMarkerId){
                    $scope.map.markers[i].budget = $scope.map.window.templateParameter.budget;
                    break;
                }
            }
        };


        var selected = this;
        $scope.set_right_navbar = function (placetype) {

            $(".autocomplete-box").val("");
            $scope.map.zoom = 12;
            $scope.map.window.closeClick();

            selected.li = placetype;
            $scope.map.markers = markers[$scope.currentCity.id].filter(function (el) {
                return el.type == $scope.get_right_navbar();
            });
        };
        $scope.get_partial = function (){
            return "/static/javascripts/angular/route/templates/"+selected.li+".html";
        };
        $scope.get_right_navbar = function (){
            return selected.li;
        };


        $scope.saveRoute = function() {


            console.log(markers);
            console.log($scope.route.cities);
            var cities = [];
            for(var i=0; i < $scope.route.cities.length; i++){
                city = $scope.route.cities[i];
                console.log(city);
                var places = [];
                for(var j = 0; j < markers[city.id].length; j++) {
                    var place = {
                        id: markers[city.id][j].place_id,
                        location_lat: markers[city.id][j].latitude,
                        location_lng: markers[city.id][j].longitude,
                        type: markers[city.id][j].type,
                        comments: {text:markers[city.id][j].comment},
                        budgets: {budget:markers[city.id][j].budget},
                        ratings: {rate:markers[city.id][j].rating}
                    };
                    places.push(place);
                }
                city.places = places;
                cities.push(city);
            }

            var routeJSON = {
                title: "title1",
                description: "desc1",
                url_title: 'url_title',
                cities: cities
            };
            console.log(routeJSON);
            Route.update($scope.route.id, routeJSON).then(postSuccessFunction, postErrorFunction);

            function postSuccessFunction(data, status, headers, config){
                $window.location.href = "/routes"
            }
            function postErrorFunction(data, status, headers, config){
                console.log("An error occured: " + data.error);
            }
        }

    }]);
});

