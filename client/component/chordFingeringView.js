angular.module('conchordance')
.directive('chordFingeringView', ['$music', function($music) {
	return {
        restrict: 'E',
        scope: {
        	chord: '=fingering',
        	highlight: '=highlight',
        	renderMode: '@'
        },
        link: function(scope, element, attrs) {
        	element.addClass('chord-sample');

        	scope.width = 120;
        	scope.height = 200;

        	scope.renderDiagram = function() {
        		var numFrets = 5;
        		var numStrings = scope.chord == null ? 6 : scope.chord.numStrings;

        		var chordWidth = Math.min(80, scope.width-20);
            	var chordHeight = Math.min(100, scope.height-10);

                var fretSpacing = chordHeight/numFrets;
                var stringSpacing = chordWidth/(numStrings-1);

                var chordLeft = (scope.width - chordWidth)/2;
                var chordRight = chordLeft + chordWidth;
                var chordTop = (scope.height - chordHeight)/2;
                var chordBottom = chordTop + chordHeight;

                var svg = SimpleSVG({width: scope.width+"px", height: scope.height+"px"})
                    .defaults({fill: "white", stroke: "black", strokeWidth:"1px"});

                // chord border
                svg.line(chordLeft, chordTop, chordRight, chordTop);
                svg.line(chordLeft, chordBottom, chordRight, chordBottom);

                // chord position number
                if (scope.chord.position > 0)
                    svg.text(scope.chord.position, chordLeft-17, chordTop+10, {class: "chord-position"});

                // frets
                for (var f=1; f<numFrets; ++f) {
                    var fretY = chordTop+f*fretSpacing;
                    svg.line(chordLeft, fretY, chordRight, fretY, {class: "fret"});
                }
                // strings
                for (var s=0; s<numStrings; ++s) {
                    var stringX = chordLeft+s*stringSpacing;
                    svg.line(stringX, chordTop, stringX, chordBottom, {class: "string"});
                }

                // fretdots
                if (scope.chord != null) {
                    for (var s = 0; s<scope.chord.numStrings; ++s) {
                        var fret = scope.chord.diagramFrets[s];
                        var x = chordLeft+(scope.chord.numStrings-s-1)*stringSpacing;
                        var y = chordTop+fret*fretSpacing-fretSpacing/2;
                        if (fret > 0)
                            svg.circle(x, y, fretSpacing/4, {class: "fretdot"});
                        else if (fret == 0)
                            svg.circle(x, y, fretSpacing/4, {class: "fretdot open"});
                    }
                }

                element.append(svg);
        	};

        	scope.renderTab = function() {
                var renderer = new Vex.Flow.Renderer(element[0], Vex.Flow.Renderer.Backends.RAPHAEL);

                var ctx = renderer.getContext();
                // Create and draw the tablature stave
                var tabstave = new Vex.Flow.TabStave(0, 16, 120);
                tabstave.addTabGlyph();
                tabstave.setContext(ctx).draw();

                // Create some notes
                var notes = [$music.vexFlowTabChord(scope.chord)];

                Vex.Flow.Formatter.FormatAndDraw(ctx, tabstave, notes);
        	};

        	scope.renderNotes = function() {
        		var renderer = new Vex.Flow.Renderer(element[0], Vex.Flow.Renderer.Backends.RAPHAEL);

				var ctx = renderer.getContext();
				var stave = new Vex.Flow.Stave(0, 35, 120);
				stave.setContext(ctx).draw();
				
				stave.addClef("treble").draw();
				
				var chordNotes = new Array(scope.chord.sortedNotes.length);
				for (var i = 0; i<chordNotes.length; ++i) {
					chordNotes[i] = scope.chord.sortedNotes[i].note;
				}
				
				var notes = [$music.vexFlowChord(chordNotes)];
				
				// Create a voice in 4/4
				  var voice = new Vex.Flow.Voice({
				    num_beats: 1,
				    beat_value: 4,
				    resolution: Vex.Flow.RESOLUTION
				  });

				  // Add notes to voice
				  voice.addTickables(notes);

				  new Vex.Flow.Formatter()
				  	.joinVoices([voice])
				  	.format([voice], 120);

				  // Render voice
				  voice.draw(ctx, stave);
        	};

        	if (scope.renderMode == 'notes')
        		scope.render = scope.renderNotes;
            if (scope.renderMode == 'diagram')
                scope.render = scope.renderDiagram;
            if (scope.renderMode == 'tab')
                scope.render = scope.renderTab;
        	
        	scope.render();
        }
    };
}]);
