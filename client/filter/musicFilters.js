angular.module('conchordance')
    .filter('noteName', ['$sce', '$music', function($sce, $music) {
        return function(note) {
            return $sce.trustAsHtml($music.noteNameHtml(note));
        };
    }])
    .filter('scaleDegree', ['$sce', '$music', function($sce, $music) {
        return function(interval) {
            return $sce.trustAsHtml($music.intervalNameHtml(interval));
        };
    }])