angular.module('conchordance').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/chordExplorer');

    $stateProvider
        .state('chordExplorer', {
            url: '/chordExplorer',
            templateUrl: 'client/views/chordExplorer.html'
        })
        .state('chordTheory', {
            url: '/chordTheory',
            templateUrl: 'client/views/chordTheory.html'
        })
        .state('chordDetails', {
            url: '/chordDetails',
            templateUrl: 'client/views/chordDetails.html'
        })
        .state('instruments', {
            url: '/instruments',
            templateUrl: 'client/views/instrumentExplorer.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'client/views/about.html'
        });
});
