define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', 'google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('RouteEssentialsController', ['$scope', '$timeout', '$window', function ($scope, $timeout, $window){

        //$scope.details1 = '';
        $scope.placeId;
        $scope.numberOfCities = 0;
        $scope.getNumber = function() {
            return new Array($scope.numberOfCities);
        }

        var autocompleteArray = [];

        var options = {
            types: ['(cities)']
        };

        $scope.addNewAutocomplete = function() {

            $scope.numberOfCities += 1;
            var id = "autocomplete_" + ($scope.numberOfCities-1);
            $timeout(function() {
                var input = document.getElementById(id);
                var autocomplete = new google.maps.places.Autocomplete(input, options);
                autocompleteArray.push(autocomplete);
            }, 1000);

        };

        $scope.addNewAutocomplete();

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
            console.log(placeIdArray);
            console.log(JSON.stringify(placeIdArray));
            console.log(placeIdStr);
            //$window.open("/route/create/details/" + JSON.stringify(placeIdArray));
            $window.location.href = "/route/create/details/" + placeIdStr;
            //"/route/create/details/{{placeId}}"
        }

    }]);
});

