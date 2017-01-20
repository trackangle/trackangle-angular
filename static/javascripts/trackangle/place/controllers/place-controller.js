
define([], function(){

    var PlaceController = function($scope, $routeParams, PlaceService){

        $scope.photos = [];
        $scope.avg_rating = 0;
        $scope.max_rate = 5;

        function init(){

            var placeId = $routeParams.id;

            //Get place by place id from place service
            PlaceService.place(placeId).then(getSuccessFunction, errorFunction);

            function getSuccessFunction(data, status, headers, config) {
                $scope.place = data.data;

                // Get place photos from google api
                var service = new google.maps.places.PlacesService(document.getElementById("map"));
                service.getDetails({
                    placeId: placeId
                }, function(place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {

                        if(place.photos) {
                            $scope.$apply(function () {
                                $scope.gplace = place;
                                for (var i = 0; i < place.photos.length; i++) {
                                    var url = "";
                                    if (i == 0) {
                                        url = place.photos[i].getUrl({maxWidth: 640});
                                    }
                                    else {
                                        url = place.photos[i].getUrl({maxWidth: 320});// + "key=AIzaSyAEIv2pKK8byL7QqmPWq1a2m1D2ONT17_c";
                                    }
                                    $scope.photos.push(url);
                                }
                            });
                        }


                    }
                });
            }
            function errorFunction(data, status, headers, config) {
                console.log("An error occured: " + data.error);
            }

            PlaceService.routes(placeId).then(function(data, status, headers, config){
                $scope.routes = data.data;
                get_avg_rating(placeId);
            }, function(data, status, headers, config){
                console.log("An error occured: " + data.error);
            });

            function get_avg_rating (placeId){
                var total_rating = 0;
                var rating_count = 0;
                for(var i = 0; i < $scope.routes.length; i++){
                    for(var j = 0; j < $scope.routes[i].places.length; j++){
                        if($scope.routes[i].places[j].id == placeId){
                            for(var k = 0; k < $scope.routes[i].places[j].ratings.length; k++){
                                total_rating += $scope.routes[i].places[j].ratings[k].rate;
                                rating_count += 1;
                            }
                        }
                    }
                }
                $scope.avg_rating = total_rating / rating_count;
            }


        }
        init();



    };

    PlaceController.$inject = ['$scope', '$routeParams', 'PlaceService'];
    return PlaceController;
});