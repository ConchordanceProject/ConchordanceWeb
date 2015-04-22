angular.module('conchordance').config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/chordExplorer');

    $stateProvider
        .state('chordExplorer', {
            url: '/chordExplorer',
            templateUrl: 'app/chordExplorer/chordExplorer.html'
        })
        .state('chordTheory', {
            url: '/chordTheory',
            templateUrl: 'app/chordTheory/chordTheory.html'
        })
        .state('chordDetails', {
            url: '/chordDetails',
            templateUrl: 'app/chordDetails/chordDetails.html'
        })
        .state('instruments', {
            url: '/instruments',
            templateUrl: 'app/instrument/instrumentExplorer.html'
        })
        .state('about', {
            url: '/about',
            templateUrl: 'app/about/about.html'
        })
        .state('all', {
            url: '/all',
            templateUrl: 'app/allChords/allChords.html'
        });
});
