angular.module('conchordance')
.directive('fretboardView', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            element.addClass('fretboard');
            
            var width = 800;
            var height = 120;

            var FRETDOT_MUTED = "#888"; // TODO somehow derive from CSS
            var FRETDOT_HIGHLIGHT = "#05F"; // TODO somehow derive from CSS
        	
            scope.unscaledFretPositions = [0.0, 0.056, 0.109, 0.159, 0.206, 0.251, 0.293, 0.333, 0.370, 0.405, 0.439, 0.470, 0.5, 0.528, 0.555, 0.580, 0.603, 0.625, 0.646, 0.666, 0.685];
            scope.scaledFretPositions = new Array(scope.unscaledFretPositions.length);
            scope.scaledFretPositions[0] = 0;

            scope.canvas = Raphael(element[0], 0, 0, width, height);
            scope.canvas.setSize(width, height); // Somehow, the size doesn't take and this is necessary

            scope.$on('instrument-selected', function(event, instrument) {
            	scope.chordFingering = null;
            	scope.fretboard = null;
                scope.instrument = instrument;
                scope.render();
            });

            scope.$on('fretboard-updated', function(event, fretboard) {
                scope.fretboard = fretboard;
                scope.render();
            });

            scope.$on('chordFingering-selected', function(event, chordFingering) {
                scope.chordFingering = chordFingering;
                scope.render();
            });
            
            scope.drawFretdot = function(string, fret, highlight) {
            	var y = scope.fretboardTop + string*scope.stringSpacing;
            	var fill = highlight ? FRETDOT_HIGHLIGHT : FRETDOT_MUTED;

            	if (fret > 0) {
            		// Center the dot in the space behind its fret
    				this.canvas.circle(scope.fretboardLeft + scope.scaledFretPositions[fret] - 
    					(scope.scaledFretPositions[fret] - scope.scaledFretPositions[fret-1])/2, y, 5)
    					.attr("stroke", "#000")
         				.attr("fill", fill);
    			} else if (fret == 0) {
    				// Draw the dot to the left of the nut
    				this.canvas.circle(scope.fretboardLeft/2, y, 5)
						.attr("stroke", "#000")
	         			.attr("fill", fill);
    			}
            };

            scope.render = function() {
                var strings = scope.instrument == null ? 6 : scope.instrument.tuning.length;
                var numFrets = scope.instrument == null ? 14 : scope.instrument.frets;

                var fretboardWidth = 700;
                var fretboardHeight = 100;

                // I never want to think about this fret placement math again.
                for (var f = 1; f<=numFrets+1; ++f) {
                    scope.scaledFretPositions[f] = (scope.unscaledFretPositions[f]*fretboardWidth/
                        scope.unscaledFretPositions[numFrets]);
                }

                scope.stringSpacing = fretboardHeight / (strings-1);

                scope.fretboardLeft = (width-fretboardWidth)/2;
                scope.fretboardRight = scope.fretboardLeft + fretboardWidth;

                scope.fretboardTop = (height-fretboardHeight)/2;

                scope.canvas.clear();
                scope.canvas.rect(0, 0, width, height, 0).attr({fill: "#fff", stroke: "none"});
                scope.canvas.rect(scope.fretboardLeft, scope.fretboardTop, fretboardWidth, fretboardHeight, 0)
                	.attr({fill: "#fff", stroke: "#000"});

                // frets
                var fretWidth = 4;
                for (var f = 1; f<numFrets; ++f) {
                    var fx = scope.fretboardLeft + scope.scaledFretPositions[f] - fretWidth;
                    scope.canvas.rect(fx, scope.fretboardTop, fretWidth, fretboardHeight)
                        .attr({fill: "#888", stroke: "none"});
                }

                // strings
                var stringThickness = 3;
                for (var s = 0; s<strings; ++s) {
                	var y = scope.fretboardTop + s*scope.stringSpacing - stringThickness/2;
                    scope.canvas.rect(scope.fretboardLeft, y, fretboardWidth, stringThickness)
                    	.attr({fill: "#000", stroke: "none"});
                    scope.canvas.path("M" + scope.fretboardLeft + "," + (y) + "H" + scope.fretboardRight);
                    scope.canvas.path("M" + scope.fretboardLeft + ","+ (y + stringThickness) + "H" + scope.fretboardRight);
                }

                // fret-nut
                scope.canvas.rect(scope.fretboardLeft-10, scope.fretboardTop-5, 10, scope.fretboardHeight+10)
                	.attr({fill: "#888", stroke: "none"});

                // highlight the positions included in the selected chord
                if (scope.fretboard != null) {
                	for (var s = 0; s<strings; ++s) {
        		    	for (var f = 0; f<=numFrets; ++f) {        		    	
	        		    	if (!scope.fretboard[s][f])
	        		    		continue;
	        		    	
	        		    	scope.drawFretdot(s, f, false);
        		    	}
        		    }
                }

            	// Draw selected chord fingering
                if (scope.chordFingering != null) {
        	    	for (var s = 0; s<strings; ++s) {
        		    	var f = scope.chordFingering.absoluteFrets[s];
        		    	scope.drawFretdot(s, f, true);
        		    }
                }
            };
        }
    };
});