angular.module('conchordance')
.controller('chordDetails', ['$scope', 'conchordanceURL', '$music',
    function($scope, conchordanceURL, $music) {
        $scope.chordName =
            $music.noteNameHtml($scope.selections.chordFingering.chord.root)
                + "-" + $scope.selections.chordFingering.chord.typeName
                + " on " + $scope.selections.instrument.name;

        conchordanceURL.showChordParameter($scope.selections);
        conchordanceURL.showFingeringParameter($scope.selections);
        conchordanceURL.showInstrumentParameter($scope.selections);
	}
]);