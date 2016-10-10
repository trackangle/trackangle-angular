define(['trackangle', 'route', 'google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('RouteEssentialsController', ['$scope', 'Route', '$routeParams', '$window', '$compile', function ($scope, Route, $routeParams, $window, $compile){

        var geocoder = new google.maps.Geocoder;
        var autocompleteArray = [];
        $scope.route = {};


        $scope.addNewAutocomplete = function(cityName) {
            if($(".autocomplete-container").children().length){
                var br = document.createElement("br");
                $(".autocomplete-container").append(br);
            }
            var el = $compile("<input type='text' size='50' placeholder='Enter a city' />")($scope);
            $(".autocomplete-container").append(el);
            var options = {
                types: ['(cities)']
            };
            var autocomplete = new google.maps.places.Autocomplete(el[0], options);
            if(cityName){
                geocoder.geocode({'address': cityName}, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $(el[0]).val(cityName);
                            autocomplete.set("place", results[0]);
                        }
                    }
                });
            }
            autocompleteArray.push(autocomplete);
        };


        if($routeParams.url_title){

            Route.route($routeParams.url_title).then(getSuccessFunction, errorFunction);
            function getSuccessFunction(data, status, headers, config) {

                $scope.route = data.data;
                for(var i = 0; i < $scope.route.cities.length; i++) {
                    var cityName = $scope.route.cities[i].name;
                    $scope.addNewAutocomplete(cityName);
                }
            }


            function errorFunction(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            }
        }
        else{
            $scope.addNewAutocomplete();
        }

        $scope.addRouteDetails = function(){

            if($routeParams.url_title){

                var cityArray = [];
                for(var i = 0; i < autocompleteArray.length; i++){
                    var place = autocompleteArray[i].getPlace();
                    var existingCityArr = $scope.route.cities.filter(function (el) {
                        return el.id === place.place_id;
                    });
                    if(existingCityArr.length > 0){
                        cityArray.push(existingCityArr[0]);
                    }
                    else{
                        var cityObj = {
                            id: place.place_id,
                            name: place.name,
                            location_lat: place.geometry.location.lat(),
                            location_lng: place.geometry.location.lng(),
                            places: []
                        };
                        cityArray.push(cityObj);
                    }
                }
                $scope.route.cities = cityArray;
                Route.update($routeParams.url_title, $scope.route).then(postSuccessFunction, postErrorFunction);
            }
            else{
                var cityArray = [];
                for(var i = 0; i < autocompleteArray.length; i++){
                    var place = autocompleteArray[i].getPlace();
                    var cityObj = {
                        id: place.place_id,
                        name: place.name,
                        location_lat: place.geometry.location.lat(),
                        location_lng: place.geometry.location.lng(),
                        places: []
                    };
                    cityArray.push(cityObj);
                }
                var routeJSON = {
                    title: $scope.route.title,
                    description: $scope.route.description,
                    cities: cityArray
                };
                Route.create(routeJSON).then(postSuccessFunction, postErrorFunction);
            }

            function postSuccessFunction(data, status, headers, config){
                var url_title = data.data.url_title;
                $window.location.href = "/route/create/details/" + url_title;
            }
            function postErrorFunction(data, status, headers, config){
                console.log("An error occured: " + data.error);
            }

        }

    }]);
});

