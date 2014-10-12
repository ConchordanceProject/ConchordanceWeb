angular.module('conchordance')
.controller('main', ['$scope', '$state', '$music', '$conchordance',
    function($scope, $state, $music, $conchordance) {
		$scope.findChords = function() {
			$scope.showWelcome = false;
            $scope.searchInProgress = true;
            $scope.chordFingerings = [];
			
			// Abort if parameters are invalid
			if ($scope.selectedInstrument == null
				|| $scope.selectedRoot == null
				|| $scope.selectedChordType == null) {
				$scope.chordFingerings = [];
				return;
			}

			// Get the fretboard layout
			$conchordance.getFretboard(
				$scope.selectedInstrument.name, 
				$scope.selectedRoot,
				$scope.selectedChordType.name
			).success(function(result) {
				$scope.fretboard = result;
			});
			
			// Search chords from webservice
			$conchordance.getChords(
				$scope.selectedInstrument.name, 
				$scope.selectedRoot,
				$scope.selectedChordType.name
			).success(function(results) {
				// calculate diagram positions for these fingerings
				for (var f in results)
					$music.calcDiagram(results[f]);

				$scope.chordFingerings = results;
                $scope.searchInProgress = false;
			});
		};

		$scope.instrumentSelected = function() {
            $scope.setSelectedInstrument($scope.instrumentChooserSelection);
            $scope.chordFingerings = [];
        };

        $scope.chordTypeSelected = function() {
            $scope.chordFingerings = [];
        };

        $scope.rootSelected = function() {
            $scope.chordFingerings = [];
        };

		$scope.chordFingeringSelected = function(chordFingering) {
            $scope.setSelectedChordFingering(chordFingering);
            $state.go('chordDetails');
		};
	
		$scope.showWelcome = true;
		$scope.notes = $music.sharpNotes;
		$scope.instruments = [];
		$scope.chordTypes = [];
		$scope.chordFingerings = [];
		$scope.instrumentChooserSelection = null;
		$scope.selectedRoot = $scope.notes[0];
		$scope.selectedChordType = null;
        $scope.searchInProgress = false;

		// Load the musical data from the server
		$conchordance.getInstruments()
		.success(function(results) {
			$scope.instruments = results;
			$scope.instrumentChooserSelection = results[0];
            $scope.instrumentSelected();
        });

		$conchordance.getChordTypes()
		.success(function(results) {
			$scope.chordTypes = results;
			$scope.selectedChordType = results[0];
		});
	}
]);