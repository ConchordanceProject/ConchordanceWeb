angular.module('conchordance')
.controller('chordDetails', ['$scope', '$sce', '$music', '$conchordance',
    function($scope, $sce, $music, $conchordance) {
        $scope.otherChordFingering = $scope.selectedChordFingering

        $scope.chordName =
            $music.noteNameHtml($scope.selectedChordFingering.chord.root)
                + "-" + $scope.selectedChordFingering.chord.typeName
                + " on " + $scope.selectedInstrument.name;
	}
]);