define([], function () {
    var RouteEssentialsController = function($scope, $routeParams, $window, RouteService) {

        $scope.init = function () {
            if ($routeParams.url_title) {

                RouteService.route($routeParams.url_title).then(getSuccessFunction, errorFunction);
                function getSuccessFunction(data, status, headers, config) {
                    $scope.route = data.data;
                }

                function errorFunction(data, status, headers, config) {
                    console.log("An error occured: " + data.error);
                }
            }
            else {
                $scope.route = {
                    title: "",
                    description: "",
                    cities: [],
                    places: []
                };
            }
            var element = document.getElementById("autocomplete-city");
            var options = {
                types: ['(cities)']
            };
            var autocomplete = new google.maps.places.Autocomplete(element, options);

            autocomplete.addListener('place_changed', function () {
                var place = autocomplete.getPlace();

                var city = {
                    id: place.place_id,
                    name: place.name,
                    location_lat: place.geometry.location.lat().toString(),
                    location_lng: place.geometry.location.lng().toString()
                };
                $scope.route.cities.push(city);
                $scope.$apply();
                //autocomplete.set('place', void(0));
                //autocomplete.set('place', null);
                $("#autocomplete-city").val("");
            });
        };


        $scope.removeCity = function (index) {
            $scope.route.cities.splice(index, 1);
        };


        $scope.addRouteDetails = function () {

            console.log($scope.route);
            if ($routeParams.url_title) {
                RouteService.update($routeParams.url_title, $scope.route).then(postSuccessFunction, postErrorFunction);
            }
            else {
                RouteService.create($scope.route).then(postSuccessFunction, postErrorFunction);
            }

            function postSuccessFunction(data, status, headers, config) {
                var url_title = data.data.url_title;
                $window.location.href = "/route/create/details/" + url_title;
            }

            function postErrorFunction(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            }

        }

    };
    RouteEssentialsController.$inject = ['$scope', '$routeParams', '$window', 'RouteService'];
    return RouteEssentialsController;
});

