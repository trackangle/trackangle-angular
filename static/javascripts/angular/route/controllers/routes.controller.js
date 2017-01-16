
define(['trackangle', 'route', 'google-maps'], function (trackangle) {
    trackangle.register.controller('RoutesController', ['$scope', 'Route', function ($scope, Route){

        $scope.init = function(){
            Route.routes().then(getSuccessFunction, getErrorFunction);

            function getSuccessFunction(data, status, headers, config) {

                $scope.routes = data.data;

                for(var i = 0; i < $scope.routes.length; i++){

                    var route = $scope.routes[i];
                    $scope.routes[i].map = {
                        control: {},
                        center: {
                            latitude: 52.47491894326404,
                            longitude: -1.8684210293371217
                        },
                        zoom: 12,
                        markers: []
                    };

                    for(var j = 0; j < route.places.length; j++) {
                        var place = route.places[j];
                        var marker = {
                            id: j,
                            latitude: place.location_lat,
                            longitude: place.location_lng
                        };
                        $scope.routes[i].map.markers.push(marker);
                    }

                }

            }

            function getErrorFunction(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            }
        };

        $scope.delete_route = function(url_title){
            Route.delete(url_title).then(deleteSuccessFunction, deleteErrorFunction);
            function deleteSuccessFunction(data, status, headers, config) {
                $scope.init();
            }
            function deleteErrorFunction(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            }
        }

  }]);
});
