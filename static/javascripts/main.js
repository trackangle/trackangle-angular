require.config({

  baseUrl: "/static/javascripts",
  
  // alias libraries paths.  Must set 'angular'
  paths: {
    'angular': '../bower_components/angular/angular',
    'angular-route': '../bower_components/angular-route/angular-route',
    'angular-cookies': '../bower_components/angular-cookies/angular-cookies',
    'angularAMD': '../bower_components/angularAMD/angularAMD',
    'ngAutocomplete': '../bower_components/ngAutocomplete/src/ngAutocomplete',
    'jquery': '../bower_components/jquery/dist/jquery',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'bootstrap-material-designer' : '../bower_components/bootstrap-material-design/dist/js/ripples',
    'underscore': '../bower_components/underscore/underscore',
    'ngDialog': '../bower_components/ngDialog/js/ngDialog',
    'snackbar': '../lib/snackbarjs/snackbar.min',
    'google-maps': 'http://maps.googleapis.com/maps/api/js?key=AIzaSyAEIv2pKK8byL7QqmPWq1a2m1D2ONT17_c&libraries=places',
    'ngMap': '../javascripts/angular/route/directives/ngmap'
  },

  // Add angular modules that does not support AMD out of the box, put it in a shim
  shim: {
    'angularAMD': ['angular'],
    'angular-route': ['angular'],
    'angular-cookies': ['angular'],
    'ngAutocomplete': {
			deps: ['angular', 'jquery', 'google-maps']
		}
  },

  // kick start application
  deps: ['trackangle']
});