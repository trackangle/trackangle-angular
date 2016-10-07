define(['trackangle', 'route', 'google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('RouteEssentialsController', ['$scope', 'Route', '$routeParams', '$window', '$compile', function ($scope, Route, $routeParams, $window, $compile){

        var geocoder = new google.maps.Geocoder;
        var autocompleteArray = [];
        var route;


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


        if($routeParams.id){

            Route.route($routeParams.id).then(getSuccessFunction, errorFunction);
            function getSuccessFunction(data, status, headers, config) {

                route = data.data;
                for(var i = 0; i < route.cities.length; i++) {
                    var cityName = route.cities[i].name;
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



            if($routeParams.id){

                var cityArray = [];
                for(var i = 0; i < autocompleteArray.length; i++){
                    var place = autocompleteArray[i].getPlace();
                    var existingCityArr = route.cities.filter(function (el) {
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
                route.title = "title1";
                route.description = "desc1";
                route.url_title = "url_title";
                route.cities = cityArray;
                Route.update($routeParams.id, route).then(postSuccessFunction, postErrorFunction);
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
                    title: "title1",
                    description: "desc1",
                    url_title: 'url_title',
                    cities: cityArray
                };
                Route.create(routeJSON).then(postSuccessFunction, postErrorFunction);
            }

            function postSuccessFunction(data, status, headers, config){
                var routeId = data.data.id;
                $window.location.href = "/route/create/details/" + routeId;
            }
            function postErrorFunction(data, status, headers, config){
                console.log(data);
                console.log("An error occured: " + data.error);
            }

        }

    }]);
});

