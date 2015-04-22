/**
 * Renders a monophonic voice, as in a scale or arpeggio
 */
angular.module('conchordance')
.directive('scaleStaff', ['$music', function($music) {
    return {
        restrict: 'E',
        template: '<canvas width=500 height=150></canvas>',
        scope: {
            myNotes: '=notes',
            staffWidth: '@'
        },
        link: function(scope, element, attrs) {
        	var renderStaff = function() {
            	var canvas = element[0].children[0];
                if (scope.staffWidth)
                    canvas.width = scope.staffWidth;
                var width = canvas.width;
                var staffWidth = width-20;
                var height = canvas.height;

            	var renderer = new Vex.Flow.Renderer(canvas, Vex.Flow.Renderer.Backends.CANVAS);

    			var context = renderer.getContext();
    			context.clearRect(0, 0, width, height);
    			
    			var stave = new Vex.Flow.Stave(10, 0, staffWidth);
    			stave.addClef('treble').setContext(context).draw();

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

                    // Format and justify the notes to the space given
                    new Vex.Flow.Formatter()
                        .joinVoices([voice])
                        .format([voice], staffWidth);

                    // Render voice
                    voice.draw(context, stave);
                }
        	};

            scope.$watch('myNotes', function() {
                renderStaff();
            });
        }
    };
}]);