define(['trackangle', '/static/javascripts/angular/route/services/route.service.js', '/static/javascripts/angular/route/directives/repeatDirective.js', 'google-maps', 'jquery'], function (trackangle) {
    trackangle.register.controller('RouteEssentialsController', ['$scope', '$routeParams', '$window', function ($scope, $routeParams, $window){

        //$scope.details1 = '';
        console.log($routeParams.id);
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
            var id = "autocomplete_" + ($scope.numberOfCities);
            $scope.numberOfCities += 1;
        };
        $scope.addNewAutocomplete();


        $scope.ctrlFn = function(autocomplete) {
            autocompleteArray.push(autocomplete);
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

