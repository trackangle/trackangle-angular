
define(['trackangle', '/static/javascripts/angular/authentication/services/authentication.service.js'], function (trackangle) {
    trackangle.register.controller('RegisterController', ['$scope', '$location', 'Authentication', function ($scope, $location, Authentication){

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    $scope.register = function() {
      Authentication.register($scope.email, $scope.password, $scope.username);
    }
  }])
});