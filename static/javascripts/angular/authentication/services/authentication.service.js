define(['trackangle'], function (trackangle) {
    trackangle.register.factory('Authentication', ['$http', function ($http){

    var Authentication = {
        register:function register(email, password, username) {
          return $http.post('/api-1.0/account/', {
            username: username,
            password: password,
            email: email
          });
        }
    }
    return Authentication;
  }]);
});