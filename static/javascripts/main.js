require.config({

  baseUrl: "/static/javascripts",
  
  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': '../bower_components/angular/angular',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angularAMD': '../bower_components/angularAMD/angularAMD',
    'jquery': '../bower_components/jquery/dist/jquery',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'bootstrap-material-designer' : '../bower_components/bootstrap-material-design/dist/js/ripples',
    'underscore': '../bower_components/underscore/underscore',
    'ngDialog': '../bower_components/ngDialog/js/ngDialog',
    'snackbar': '../lib/snackbarjs/snackbar.min',
    'google-maps': 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAEIv2pKK8byL7QqmPWq1a2m1D2ONT17_c&libraries=places',
    'ngMap': '../javascripts/angular/route/directives/ngmap',
    'lodash': '../bower_components/lodash/dist/lodash.min',
    'angular-simple-logger': '../bower_components/angular-simple-logger/dist/angular-simple-logger.min',
    'angular-google-maps': '../bower_components/angular-google-maps/dist/angular-google-maps.min'
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'angular-cookies': ['angular'],
    'angular-simple-logger': ['angular'],
    'angular-google-maps': ['angular', 'angular-simple-logger','google-maps', 'underscore'],
    'bootstrap': ['jquery']
  },

  // kick start application
  deps: ['trackangle']
});