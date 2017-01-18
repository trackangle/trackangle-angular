define([], function () {

    var RegisterController = function($scope, $location, AuthenticationService) {

        activate();

        function activate() {
            // If the user is authenticated, they should not be here.
            if (AuthenticationService.isAuthenticated()) {
                $location.url('/');
            }
        }

        $scope.register = function () {
            AuthenticationService.register($scope.email, $scope.password, $scope.username);
        }
    };
    RegisterController.$inject = ['$scope', '$location', 'AuthenticationService'];
    return RegisterController;
});