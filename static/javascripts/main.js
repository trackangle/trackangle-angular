'use strict';
require.config({

  //baseUrl: "../javascripts",
  
  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': '../bower_components/angular/angular',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'ngAutocomplete': '../bower_components/ngAutocomplete/src/ngAutocomplete',
    'underscore': '../bower_components/underscore/underscore',
    'ngDialog': '../bower_components/ngDialog/js/ngDialog',
    'snackbar': '../lib/snackbarjs/snackbar.min',
    'google-maps': 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAEIv2pKK8byL7QqmPWq1a2m1D2ONT17_c&libraries=places',
    'lodash': '../bower_components/lodash/dist/lodash.min',
    'angular-simple-logger': '../bower_components/angular-simple-logger/dist/angular-simple-logger.min',
    'angular-google-maps': '../bower_components/angular-google-maps/dist/angular-google-maps.min'
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    angular: {
      exports: 'angular'
    },
    'angular-route': {
      deps: ['angular']
    },
    'angular-cookies': {
      deps: ['angular']
    },
    'angular-simple-logger': {
      deps: ['angular']
    },
    'angular-google-maps': {
      deps: ['angular', 'angular-simple-logger', 'google-maps', 'underscore']
    },
    'bootstrap': {
      deps: ['jquery']
    },
    'ngAutocomplete': {
         deps: ['angular', 'jquery', 'google-maps']
    }
  },

  // kick start application
  deps: ['app']
});