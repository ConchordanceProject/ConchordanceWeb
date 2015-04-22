angular.module('conchordance')
.controller('main', ['$scope', '$state', '$music', 'conchordanceURL', '$conchordance',
    function($scope, $state, $music, conchordanceURL, $conchordance) {
        var chordsHaveBeenSearched = false;

		$scope.findChords = function() {
            chordsHaveBeenSearched = true;
            $scope.searchInProgress = true;
            $scope.chordFingerings = [];
			
			if (!$scope.validateChordRequest())
                return;

			// Search chords from webservice
			$conchordance.getChords(
				$scope.selections.instrument.name,
				$scope.selections.root,
				$scope.selections.chordType.name
			).success(function(results) {
				// calculate diagram positions for these fingerings
				for (var f in results)
					$music.calcDiagram(results[f]);

				$scope.chordFingerings = results;
                $scope.searchInProgress = false;
			});
		};

        $scope.validateChordRequest = function() {
            return $scope.selections.instrument != null
                && $scope.selections.root != null
                && $scope.selections.chordType != null;
        }

        $scope.chordParametersUpdated = function() {
            conchordanceURL.showParameters($scope.parameters,
                $scope.selections.root,
                $scope.selections.chordType,
                $scope.selections.instrument,
                null);

            $scope.chordFingerings = [];

            if ($scope.validateChordRequest()) {
                // Get the fretboard layout
                $conchordance.getFretboard(
                        $scope.selections.instrument.name,
                        $scope.selections.root,
                        $scope.selections.chordType.name
                    ).success(function(result) {
                        $scope.fretboard = result;
                    });

                // If no search has been made yet, start a search
                if (!chordsHaveBeenSearched) {
                    $scope.findChords();
                }
            }
        }

		$scope.chordFingeringSelected = function(chordFingering) {
            $scope.selections.chordFingering = chordFingering;
            $state.go('chordDetails');
		};

        $scope.searchInProgress = false;

        $scope.$watch('selections.instrument', $scope.chordParametersUpdated);
        $scope.$watch('selections.root', $scope.chordParametersUpdated);
        $scope.$watch('selections.chordType', $scope.chordParametersUpdated);

        conchordanceURL.showParameters($scope.parameters,
            $scope.selections.root,
            $scope.selections.chordType,
            $scope.selections.instrument,
            null);
    }
]);