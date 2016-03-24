
define(['trackangle', '/static/javascripts/angular/authentication/services/authentication.service.js'], function (trackangle) {
    trackangle.register.controller('LoginController', ['$scope', '$location', 'Authentication', function ($scope, $location, Authentication){

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    $scope.login = function() {
      Authentication.login($scope.email, $scope.password);
    }

    $scope.logout = function() {
      Authentication.logout();
    }

  }])
});