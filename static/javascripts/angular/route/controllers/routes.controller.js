
define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'google-maps', 'ngMap'], function (trackangle) {
    trackangle.register.controller('RoutesController', ['$scope', 'RouteService', function ($scope, RouteService){

        function initPage(){
            RouteService.routes().then(getSuccessFunction, getErrorFunction);

            function getSuccessFunction(data, status, headers, config) {

                $scope.routes = data.data;

                for(var i = 0; i < $scope.routes.length; i++){
                    $scope.routes[i].map = {
                        control: {},
                        center: {
                            latitude: 52.47491894326404,
                            longitude: -1.8684210293371217
                        },
                        zoom: 12,
                        markers: []
                    };

                    for(var j = 0; j <$scope.routes[i].places.length; j++) {
                        var place = $scope.routes[i].places[j];
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
        }
        initPage();

        $scope.delete_route = function(id){
            console.log(id);
            RouteService.delete(id).then(deleteSuccessFunction, deleteErrorFunction);
            function deleteSuccessFunction(data, status, headers, config) {
                console.log("Successfully removed");
                initPage();
            }
            function deleteErrorFunction(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            }
        }

  }]);
});
