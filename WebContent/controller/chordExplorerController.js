angular.module('conchordance')
.controller('main', ['$scope', '$sce', '$music', '$conchordance', 
    function($scope, $sce, $music, $conchordance) {
		$scope.noteNameHtml = function(interval) {
			return $sce.trustAsHtml($music.noteNameHtml(interval));	
		};
		
		$scope.intervalNameHtml = function(interval) {
			return $sce.trustAsHtml($music.intervalNameHtml(interval));
		};
		
		$scope.findChords = function() {
			$scope.showWelcome = false;
			
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
				// TODO it would be better to directly inform the freboardView component than to broadcast
				$scope.$broadcast('fretboard-updated', result);
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
			});
		};

		$scope.instrumentSelected = function() {
			$scope.$broadcast('instrument-selected', $scope.selectedInstrument);
		};

		$scope.chordFingeringSelected = function(chordFingering) {
			$scope.selectedChordFingering = chordFingering;
			$scope.$broadcast('chordFingering-selected', chordFingering);
		};
	
		$scope.showWelcome = true;
		$scope.notes = $music.sharpNotes;
		$scope.instruments = [];
		$scope.chordTypes = [];
		$scope.chordFingerings = [];
		$scope.selectedInstrument = null;
		$scope.selectedRoot = $scope.notes[0];
		$scope.selectedChordType = null;

		// Load the musical data from the server
		$conchordance.getInstruments()
		.success(function(results) {
			$scope.instruments = results;
			$scope.selectedInstrument = results[0];
            $scope.instrumentSelected();
        });

		$conchordance.getChordTypes()
		.success(function(results) {
			$scope.chordTypes = results;
			$scope.selectedChordType = results[0];
		});
	}
]);