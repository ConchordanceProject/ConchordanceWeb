angular.module('conchordance')
    .directive('chordTypeSelector', ['$music', '$sce', function($music, $sce) {
        return {
            restrict: 'E',
            templateUrl: 'component/chordTypeSelector/chordTypeSelector.html',
            scope: {
                types: '=',
                selectedType: '='
            }
        };
    }]);