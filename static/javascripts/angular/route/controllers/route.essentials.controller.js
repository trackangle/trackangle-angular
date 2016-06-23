define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'angular-google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('RouteEssentialsController', ['$scope','RouteService', function ($scope, RouteService){

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
                templateParameter: {
                    rating:'inputRating',
                    budget: '$5',
                    comment: 'nayso'
                }
            },
            searchbox: {
                template: '/static/javascripts/angular/route/templates/searchbox.html',
                options: {
                    autocomplete:true,
                    types: ['(cities)']
                },
                position:"TOP_LEFT",
                control: {},
                events: {
                    place_changed: function (searchBox) {
                        var place = searchBox.getPlace();
                        $scope.placeId = place.place_id;
                        if (!place || place == 'undefined' || place.length == 0) {
                            console.log('no place data :(');
                            return;
                        }
                        var marker_id = 0
                        if($scope.map.markers.length != 0){
                            marker_id = $scope.map.markers[$scope.map.markers.length - 1].id + 1
                        }

                        var marker = {
                            id: marker_id,
                            latitude: place.geometry.location.lat(),
                            longitude: place.geometry.location.lng()
                        };

                        $scope.map.markers.push(marker);
                    }
                }
            }
        }; //TODO:  set location based on users current gps location

    }]);
});

