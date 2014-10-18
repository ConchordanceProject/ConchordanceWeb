angular.module('conchordance')
.controller('chordDetails', ['$scope', '$sce', '$music',
    function($scope, $sce, $music) {
        $scope.chordName =
            $music.noteNameHtml($scope.selections.chordFingering.chord.root)
                + "-" + $scope.selections.chordFingering.chord.typeName
                + " on " + $scope.selections.instrument.name;
	}
]);