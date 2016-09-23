define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', '/static/javascripts/angular/route/directives/repeatDirective.js', 'google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('RouteEssentialsController', ['$scope', '$http', '$routeParams', '$window', '$compile', function ($scope, $http, $routeParams, $window, $compile){

        var geocoder = new google.maps.Geocoder;
        var autocompleteArray = [];


        $scope.addNewAutocomplete = function(cityName) {
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
                            console.log(results[0]);
                            $(el[0]).val(cityName);
                            autocomplete.set("place", results[0]);
                        }
                    }
                });
            }
            autocompleteArray.push(autocomplete);
        };


        if($routeParams.id){

            $http.get('/api/v1/route/' + $routeParams.id + '/').then(getSuccessFunction, errorFunction);
            function getSuccessFunction(data, status, headers, config) {

                var cities = [];
                for(var i = 0; i < data.data.places.length; i++) {
                    var cityName = data.data.places[i].city;
                    if (cities.indexOf(cityName) == -1) {
                        cities.push(cityName);
                        $scope.addNewAutocomplete(cityName);
                    }
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

            placeIdArray = [];
            var placeIdStr = "";
            for(var i = 0; i < autocompleteArray.length; i++){
                if(i != 0){
                   placeIdStr += "|"
                }
                placeIdStr += autocompleteArray[i].getPlace().place_id;
                placeIdArray.push(autocompleteArray[i].getPlace().place_id);
            }
            $window.location.href = "/route/create/details/" + placeIdStr;
        }

    }]);
});

