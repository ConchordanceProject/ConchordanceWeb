angular.module('conchordance')
.directive('chordFingeringNotes', ['$sce', '$music', function($sce, $music) {
    return {
        restrict: 'E',
        templateUrl: 'component/chordFingeringNotes/chordFingeringNotes.html',
        scope: {
            chordFingering: '='
        },

        link: function(scope, element, attrs) {
            scope.noteNameHtml = function(note) {
                return $sce.trustAsHtml($music.noteNameHtml(note));
            };
        }
    };
}]);