angular.module('conchordance')
.controller('main', ['$scope', '$state', '$music', '$conchordance',
    function($scope, $state, $music, $conchordance) {
        $scope.showParameters = function() {
            $scope.showChordParameter();
            $scope.showInstrumentParameter();
        }

		$scope.findChords = function() {
			$scope.showWelcome = false;
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
            $scope.showParameters();
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
            }
        }

		$scope.chordFingeringSelected = function(chordFingering) {
            $scope.selections.chordFingering = chordFingering;
            $state.go('chordDetails');
		};

        $scope.showWelcome = true;
        $scope.searchInProgress = false;

        $scope.showParameters();

        $scope.$watch('selections.instrument', $scope.chordParametersUpdated);
        $scope.$watch('selections.root', $scope.chordParametersUpdated);
        $scope.$watch('selections.chordType', $scope.chordParametersUpdated);
    }
]);