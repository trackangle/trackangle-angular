
define(['app', '/static/javascripts/angular/authentication/services/authentication.service.js'], function (app) {
    app.register.controller('RegisterController', ['$scope','Authentication', function ($scope, Authentication){

    $scope.register = function() {
      console.log("asdasdasd");
      Authentication.register($scope.email, $scope.password, $scope.username);
    }
  }])
});