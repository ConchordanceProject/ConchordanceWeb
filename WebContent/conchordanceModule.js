angular.module('conchordance', ['ui.router'])
.factory('$music', function() {
	return Music;
})
.config(function($httpProvider) {
    // Enable CORS
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

