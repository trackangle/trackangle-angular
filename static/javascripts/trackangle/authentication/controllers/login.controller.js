
define([], function () {

    var LoginController = function($scope, $location, AuthenticationService) {

        activate();

        function activate() {
            // If the user is authenticated, they should not be here.
            if (AuthenticationService.isAuthenticated()) {
                $location.url('/');
            }
        }

        $scope.login = function () {
            AuthenticationService.login($scope.email, $scope.password);
        };

        $scope.logout = function () {
            AuthenticationService.logout();
        }

    };
    LoginController.$inject = ['$scope', '$location', 'AuthenticationService'];
    return LoginController;
});