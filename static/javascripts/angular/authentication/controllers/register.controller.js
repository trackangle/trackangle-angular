
define(['app', '/static/javascripts/angular/authentication/services/authentication.service.js'], function (app) {
    app.register.controller('RegisterController', ['$scope','Authentication', function ($scope, Authentication){
    var vm = this;

    vm.register = register;

    function register() {
      console.log("asdasdasd");
      Authentication.register(vm.email, vm.password, vm.username);
    }
  }])
});