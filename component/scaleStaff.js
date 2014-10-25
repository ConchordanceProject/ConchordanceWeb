angular.module('conchordance')
.directive('scaleStaff', ['$music', function($music) {
    return {
        restrict: 'E',
        templateUrl: 'views/scaleStaff.html',
        scope: {
            myNotes: '=notes'
        },
        link: function(scope, element, attrs) {
        	var renderStaff = function() {
                console.log("I'm a staff rendering:");
                console.log(scope.myNotes);
            	var canvas = element[0].children[0];
            	var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

    			var context = renderer.getContext();
    			context.clearRect(0, 0, 700, 200);
    			
    			var stave = new Vex.Flow.Stave(10, 0, 500);
    			stave.addClef("treble").setContext(context).draw();

                if (scope.myNotes) {
                    var vexNotes = new Array(scope.myNotes.length);
                    for (var i = 0; i<vexNotes.length; ++i) {
                        var note = scope.myNotes[i];
                        vexNotes[i] = $music.vexFlowNote(note, 4);
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
                    voice.draw(context, stave);
                }
        	};

            scope.$watch('myNotes', function() {
                renderStaff();
            });
        },
    };
}]);