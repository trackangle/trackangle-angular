
define(['trackangle', 'google-maps', 'ngMap'], function (trackangle) {
    trackangle.register.controller('RoutesController', function ($scope, $http) {

        $http.get('/api/v1/route/').then(getSuccessFunction, errorFunction);

        function getSuccessFunction(data, status, headers, config) {

            for(var i = 0; i < data.data.length; i++){
                data.data[i].map = {
                    control: {},
                    center: {
                        latitude: 52.47491894326404,
                        longitude: -1.8684210293371217
                    },
                    zoom: 12,
                    markers: []
                }

                for(var j = 0; j < data.data[i].places.length; j++) {
                    var place = data.data[i].places[j];
                    var marker = {
                        id: j,
                        latitude: place.location_lat,
                        longitude: place.location_lng
                    };
                    data.data[i].map.markers.push(marker);
                }

            }

            $scope.routes = data.data;


        };

        function errorFunction(data, status, headers, config) {
            console.log("An error occured: " + data.error);
        }

  });
});
