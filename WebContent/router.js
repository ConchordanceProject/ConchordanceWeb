angular.module('conchordance').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        .state('chordTheory', {
            url: '/chordTheory',
            templateUrl: 'views/chordTheory.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'views/about.html'
        });
});
