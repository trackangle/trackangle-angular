define(['trackangle', 'angular-cookies'], function (trackangle) {
    trackangle.register.factory('Authentication', ['$http', '$cookies', function ($http, $cookies){


    function register(email, password, username) {
        return $http.post('/api/v1/accounts/', {
            username: username,
            password: password,
            email: email
        }).then(registerSuccessFn, registerErrorFn);

        function registerSuccessFn(data, status, headers, config) {
            Authentication.login(email, password);
        }

        function registerErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }
    }

    function login(email, password) {
        return $http.post('/api/v1/auth/login/', {
            email: email, password: password
        }).then(loginSuccessFn, loginErrorFn);

        function loginSuccessFn(data, status, headers, config) {
            Authentication.setAuthenticatedAccount(data.data);
            window.location = '/';
        }

        function loginErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }
    }

    function logout() {
        return $http.post('/api/v1/auth/logout/')
        .then(logoutSuccessFn, logoutErrorFn);

        function logoutSuccessFn(data, status, headers, config) {
            Authentication.unauthenticate();
            window.location = '/';
        }

        function logoutErrorFn(data, status, headers, config) {
            console.error('Epic failure!');
        }
    }

    function getAuthenticatedAccount() {
        if (!$cookies.get('authenticatedAccount')) {
            return;
        }
        return JSON.parse($cookies.get('authenticatedAccount'));
    }

    function isAuthenticated() {
        console.log($cookies.get('authenticatedAccount'));
        return !!$cookies.get('authenticatedAccount');
    }

    function setAuthenticatedAccount(account) {
        $cookies.put('authenticatedAccount', JSON.stringify(account));
    }

    function unauthenticate() {
        $cookies.remove('authenticatedAccount');
        //delete $cookies.authenticatedAccount;
    }

    var Authentication = {
        login: login,
        logout: logout,
        register: register,
        getAuthenticatedAccount: getAuthenticatedAccount,
        isAuthenticated: isAuthenticated,
        setAuthenticatedAccount: setAuthenticatedAccount,
        unauthenticate: unauthenticate
    };
    return Authentication;
  }]);
});