angular.module('conchordance')
.controller('chordDetails', ['$scope', '$sce', '$music',
    function($scope, $sce, $music) {
        $scope.otherChordFingering = $scope.selectedChordFingering

        $scope.chordName =
            $music.noteNameHtml($scope.selectedChordFingering.chord.root)
                + "-" + $scope.selectedChordFingering.chord.typeName
                + " on " + $scope.selectedInstrument.name;
	}
]);