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
        	scope.showFingers = false;
        	scope.paper = Raphael(element[0], 0, 0, scope.width, scope.height);
        	scope.paper.setSize(scope.width, scope.height); // Somehow, the size doesn't take and this is necessary

            // TODO pull these values from CSS somehow
        	scope.DEFAULT_BG = "#fff";
        	scope.FRETDOT_MUTED = "#888";
        	scope.HIGHLIGHT = "#05F";
        	
        	scope.bgColor = scope.DEFAULT_BG;

        	scope.mouseover = function(e) {
                scope.bgColor = scope.HIGHLIGHT;
                scope.render();
        	};
        	
        	scope.mouseout = function(e) {
                scope.bgColor = scope.DEFAULT_BG;
                scope.render();
        	};

        	scope.drawClef = false;

        	scope.renderDiagram = function() {
        		scope.paper.clear();

        		var numFrets = 5;
        		var numStrings = scope.chord == null ? 6 : scope.chord.numStrings;

        		var chordWidth = Math.min(80, scope.width-20);
            	var chordHeight = Math.min(100, scope.height-10);

        		// Background rect
        		scope.paper.rect(0, 0, scope.width, scope.height).attr({fill: scope.bgColor, stroke: "none"});
            	
            	var fretSpacing = chordHeight/numFrets;
            	var stringSpacing = chordWidth/(numStrings-1);

            	var chordLeft = (scope.width - chordWidth)/2;
            	var chordRight = chordLeft + chordWidth;
            	var chordTop = (scope.height - chordHeight)/2;
            	var chordBottom = chordTop + chordHeight;
            	
            	// chord border
                scope.paper.rect(chordLeft, chordTop, chordWidth, chordHeight, 0).attr({fill: scope.DEFAULT_BG, stroke: "#000"});
                
                // position
                if (scope.chord.position > 0)
                	scope.paper.text(chordLeft-12, chordTop+10, scope.chord.position).attr("font-size", 10);
                
             	// frets
                for (var f=1; f<numFrets; ++f) {
                	var fretY = chordTop+f*fretSpacing;
                	scope.paper.path("M"+chordLeft+","+fretY+"H"+chordRight);
                }
             	// strings
                for (var s=1; s<numStrings-1; ++s) {
                	var stringX = chordLeft+s*stringSpacing;
                	scope.paper.path("M"+stringX+","+chordTop+"V"+chordBottom);
                }
             	
                // fretdots
                if (scope.chord != null) {
        	     	for (var s = 0; s<scope.chord.numStrings; ++s) {
        	     		var fret = scope.chord.diagramFrets[s];
        	     		var x = chordLeft+(scope.chord.numStrings-s-1)*stringSpacing;
        	     		var y = chordTop+fret*fretSpacing-fretSpacing/2;
        	     		if (fret > -1) {
        	     			var c = scope.paper.circle(x, y, fretSpacing/4)
        	         			.attr("stroke", "#000")
        	         			.attr("fill", scope.DEFAULT_BG);
        	     			if (fret > 0) {
        	     				c.attr("fill", scope.FRETDOT_MUTED);
        	     				if (scope.showFingers)
        	     					scope.paper.text(x, y, scope.chord.fingers[s])
        	     						.attr("fill", "#fff");
        	     			}
        	     		}
        	     	}
                }
        	};

        	scope.renderTab = function() {
        		
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
        	
        	scope.render();
        }
    };
}]);
