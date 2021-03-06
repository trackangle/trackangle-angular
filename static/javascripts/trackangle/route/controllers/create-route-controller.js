define(['jquery'], function () {
    function CreateRouteController($scope, $routeParams, RouteService, PlaceService) {

        var clickedMarkerId = -1;
        var accomodation = 0;
        var architecture = 1;
        var entertainment = 2;
        var food = 3;
        var nightlife = 4;
        var outdoor = 5;
        var currentCityIndex = -1;

        $scope.route = {};


        $scope.init = function () {

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
                    click: function (marker, eventName, model) {
                        clickedMarkerId = model.id;
                        $scope.map.window.templateParameter = {
                            name: model.name,
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
                    closeClick: function () {
                        this.show = false;
                    },
                    options: {}, // define when map is ready
                    templateUrl: '/static/javascripts/trackangle/route/templates/infowindow.html',
                },
                searchbox: {
                    template: '/static/javascripts/trackangle/route/templates/searchbox.html',
                    options: {
                        autocomplete: true,
                        types: ['establishment']
                    },
                    position: "TOP_LEFT",
                    control: {},
                    events: {
                        place_changed: function (searchBox) {
                            var place = searchBox.getPlace();

                            if (!place || place == 'undefined' || place.length == 0) {
                                console.log('no place data');
                                return;
                            }
                            var name = "";
                            if (place.name) {
                                name = place.name;
                            }

                            var placeObj = {
                                id: place.place_id,
                                name: name,
                                location_lat: place.geometry.location.lat(),
                                location_lng: place.geometry.location.lng(),
                                type: $scope.get_right_navbar()
                            };
                            PlaceService.place(place.place_id).then(function successHandler(data, status, headers, config) {
                                if (data.data) {
                                    placeObj = data.data;
                                }
                                addMarker(placeObj);
                            }, function errorHandler(data, status, headers, config) {
                                console.log("An error occured: " + data.error);
                            });
                        }
                    }
                }
            };


            RouteService.route($routeParams.url_title).then(getSuccessFunction, errorFunction);
            function getSuccessFunction(data, status, headers, config) {
                $scope.route = data.data;
                $scope.changeCity(0);

            }

            function errorFunction(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            }
        };


        function addMarker(place) {

            $scope.loading = true;
            place.city = $scope.route.cities[currentCityIndex];
            RouteService.addPlace($scope.route.url_title, place).then(function successHandler(data, status, headers, config) {
                var comment = "";
                if (place.comments && place.comments.length == 1 && place.comments[0].text) {
                    comment = place.comments[0].text;
                }
                var budget = "";
                if (place.budgets && place.budgets.length == 1 && place.budgets[0].budget) {
                    budget = place.budgets[0].budget;
                }
                var rating = "";
                if (place.ratings && place.ratings.length == 1 && place.ratings[0].rating) {
                    rating = place.ratings[0].rating;
                }
                var marker = {
                    id: place.id,
                    name: place.name,
                    latitude: place.location_lat,
                    longitude: place.location_lng,
                    comment: comment,
                    budget: budget,
                    rating: rating
                };
                $scope.map.markers.push(marker);
                $scope.route.places.push(place);
                $scope.loading = false;
            }, function errorHandler(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            })
        }

        $scope.removeMarker = function () {
            $scope.loading = true;
            var place = $scope.route.places.filter(function (obj) {
                return obj.id == clickedMarkerId;
            })[0];
            RouteService.removePlace($scope.route.url_title, place).then(function successHandler(data, status, headers, config) {

                $scope.map.markers = $scope.map.markers.filter(function (obj) {
                    return obj.id != clickedMarkerId;
                });
                $scope.route.places = $scope.route.places.filter(function (obj) {
                    return obj.id != clickedMarkerId;
                });
                $scope.map.window.closeClick();
                $scope.loading = false;
            }, function errorHandler(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            });

        };

        $scope.changeCity = function (cityIndex) {

            currentCityIndex = cityIndex;
            var city = $scope.route.cities[cityIndex];
            $scope.set_right_navbar(accomodation, city);

            var bounds = new google.maps.LatLngBounds();
            var position = new google.maps.LatLng(city.location_lat, city.location_lng);
            bounds.extend(position); // your marker position, must be a LatLng instance
            $scope.map.searchbox.options.bounds = new google.maps.LatLngBounds(bounds.getSouthWest(), bounds.getNorthEast());
            $scope.map.center = {
                latitude: bounds.getCenter().lat(),
                longitude: bounds.getCenter().lng()
            }
        };

        $scope.isCitySelected = function (id) {
            return $scope.route.cities[currentCityIndex].id === id;
        };


        $scope.savePlaceComment = function () {
            $scope.loading = true;
            for (var i = 0; i < $scope.map.markers.length; i++) {
                var marker_id = $scope.map.markers[i].id;
                if (marker_id == clickedMarkerId) {
                    $scope.map.markers[i].comment = $scope.map.window.templateParameter.comment;
                    break;
                }
            }
            var commentJSON = {
                text: $scope.map.window.templateParameter.comment
            };
            PlaceService.createComment(commentJSON, clickedMarkerId).then(function (data, status, headers, config) {
                $scope.loading = false;
            }, function (data, status, headers, config) {
                console.log(data);
            });
        };

        $scope.savePlaceRating = function () {
            $scope.loading = true;
            for (var i = 0; i < $scope.map.markers.length; i++) {
                var marker_id = $scope.map.markers[i].id;
                if (marker_id == clickedMarkerId) {
                    $scope.map.markers[i].rating = $scope.map.window.templateParameter.rating;
                    break;
                }
            }
            var ratingJSON = {
                rate: $scope.map.window.templateParameter.rating
            };
            PlaceService.createRating(ratingJSON, clickedMarkerId).then(function (data, status, headers, config) {
                $scope.loading = false;
            }, function (data, status, headers, config) {
                console.log(data);
            });
        };

        $scope.savePlaceBudget = function () {
            $scope.loading = true;
            for (var i = 0; i < $scope.map.markers.length; i++) {
                var marker_id = $scope.map.markers[i].id;
                if (marker_id == clickedMarkerId) {
                    $scope.map.markers[i].budget = $scope.map.window.templateParameter.budget;
                    break;
                }
            }
            var budgetJSON = {
                budget: $scope.map.window.templateParameter.budget
            };
            PlaceService.createBudget(budgetJSON, clickedMarkerId).then(function (data, status, headers, config) {
                $scope.loading = false;
            }, function (data, status, headers, config) {
                console.log(data);
            });
        };


        var selected = this;
        $scope.set_right_navbar = function (placetype, city) {
            if (!city) {
                city = $scope.route.cities[0];
            }
            var places = $scope.route.places.filter(function (obj) {
                return obj.city.id == $scope.route.cities[currentCityIndex].id;
            });
            $scope.map.markers = [];
            for (var i = 0; i < places.length; i++) {
                var place = places[i];
                var comment = "";
                if (place.comments.length == 1 && place.comments[0].text) {
                    comment = place.comments[0].text;
                }
                var budget = "";
                if (place.budgets.length == 1 && place.budgets[0].budget) {
                    budget = place.budgets[0].budget;
                }
                var rating = "";
                if (place.ratings.length == 1 && place.ratings[0].rate) {
                    rating = place.ratings[0].rate;
                }
                if (place.type == placetype) {

                    var marker = {
                        id: place.id,
                        name: place.name,
                        latitude: place.location_lat,
                        longitude: place.location_lng,
                        comment: comment,
                        budget: budget,
                        rating: rating
                    };
                    $scope.map.markers.push(marker);
                }
            }
            $(".autocomplete-box").val("");
            $scope.map.zoom = 12;
            $scope.map.window.closeClick();

            selected.li = placetype;
        };
        $scope.get_partial = function () {
            return "/static/javascripts/angular/route/templates/" + selected.li + ".html";
        };
        $scope.get_right_navbar = function () {
            return selected.li;
        };
    }

    CreateRouteController.$inject = ['$scope', '$routeParams', 'RouteService', 'PlaceService'];
    return CreateRouteController;
});

