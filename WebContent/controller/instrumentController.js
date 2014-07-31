angular.module('conchordance')
.controller('instrument', ['$scope', '$sce', '$music', '$conchordance', 
    function($scope, $sce, $music, $conchordance) {
		$scope.noteNameHtml = function(interval) {
			return $sce.trustAsHtml($music.noteNameHtml(interval));	
		};

		$scope.instrumentSelected = function() {
			$scope.$broadcast('instrument-selected', $scope.selectedInstrument);
			
			if ($scope.selectedInstrument != null) {
				// Render the tuning on a staff
				var canvas = document.getElementById("canvas");
				var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);
	
				var ctx = renderer.getContext();
				ctx.clearRect(0, 0, 700, 200);
				var stave = new Vex.Flow.Stave(10, 0, 500);
				stave.addClef("treble").setContext(ctx).draw();
				
				var vexNotes = new Array($scope.selectedInstrument.tuning.length);
				for (var i = 0; i<vexNotes.length; ++i) {
					var note = $scope.selectedInstrument.tuning[vexNotes.length - i - 1];
					vexNotes[i] = new Vex.Flow.StaveNote(
							{keys: $music.vexFlowNoteKeys(note), duration: "q"}
					);
				}				

				// Create a voice in 4/4
				var voice = new Vex.Flow.Voice({
					num_beats : vexNotes.length,
					beat_value : 4,
					resolution : Vex.Flow.RESOLUTION
				});

				// Add notes to voice
				voice.addTickables(vexNotes);

				// Format and justify the notes to 500 pixels
				new Vex.Flow.Formatter()
					.joinVoices([voice])
					.format([voice], 500);

				// Render voice
				voice.draw(ctx, stave);
			}
        };

		// Load the musical data from the server
		$conchordance.getInstruments()
		.success(function(results) {
			$scope.instruments = results;
			$scope.selectedInstrument = results[0];
            $scope.instrumentSelected();
        });
	}
]);