angular.module('conchordance')
    .directive('chordTypeSelector', ['$music', '$sce', function($music, $sce) {
        return {
            restrict: 'E',
            templateUrl: 'views/chordTypeSelector.html',
            scope: {
                types: '=',
                selectedType: '='
            }
        };
    }]);