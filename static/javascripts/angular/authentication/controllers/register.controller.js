
define(['trackangle', '/static/javascripts/angular/authentication/services/authentication.service.js'], function (trackangle) {
    trackangle.register.controller('RegisterController', ['$scope','Authentication', function ($scope, Authentication){

    $scope.register = function() {
      console.log("asdasdasd");
      Authentication.register($scope.email, $scope.password, $scope.username);
    }
  }])
});