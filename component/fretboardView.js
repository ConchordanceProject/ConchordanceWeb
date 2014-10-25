angular.module('conchordance')
.directive('fretboardView', ['instrument', function(instrumentService) {
    return {
        restrict: 'E',
        scope: {
            /**
             * Specifies the dimensions and tuning of the instrument
             */
            instrument: '=',

            /**
             * The layout of the fretboard (chord or scale to display)
             */
            fretboard: '=',

            /**
             * Highlighted position
             */
            chordFingering: '=',

            /**
             * "true" or "false" - whether or not to update selectedNote when a note is clicked
             */
            selectOnClick: '@',

            /**
             *
             */
            selectedNote: '='
        },
        link: function(scope, element, attrs) {
            var strings = 6;
            var numFrets = 14;

            scope.$watch('instrument', function(newValue, oldValue) {
                if (newValue != null) {
                    strings = newValue.tuning.length;
                    numFrets = newValue.frets;
                }
                scope.selectedFretdot = null;
                if (scope.selectOnClick)
                    scope.selectedNote = null;
                scope.render();
            });

            scope.$watch('fretboard', function(newValue, oldValue) {
                scope.render();
            });

            scope.$watch('chordFingering', function(newValue, oldValue) {
                scope.render();
            });

            var width = 800;
            var height = 120;

            var svg = SimpleSVG({width: width+"px", height: height+"px"})
                .defaults({fill: "white", stroke: "black", strokeWidth:"1px"});
            element.append(svg);

            scope.unscaledFretPositions = [0.0, 0.056, 0.109, 0.159, 0.206, 0.251, 0.293, 0.333, 0.370, 0.405, 0.439, 0.470, 0.5, 0.528, 0.555, 0.580, 0.603, 0.625, 0.646, 0.666, 0.685];
            scope.scaledFretPositions = new Array(scope.unscaledFretPositions.length);
            scope.scaledFretPositions[0] = 0;

            scope.drawFretdot = function(svg, string, fret, highlight) {
                if (fret == -1)
                    return;

            	var y = scope.fretboardTop + string*scope.stringSpacing;
                var x;
                var css;

                // TODO this needs to be based on the actual fretnut position,
                // don't assume it's 0 (see banjo!)
            	if (fret > 0) {
                    css = highlight ? "fretdot highlight" : "fretdot";

                    // Center the dot in the space behind its fret
                    x = scope.fretboardLeft + scope.scaledFretPositions[fret] -
                        (scope.scaledFretPositions[fret] - scope.scaledFretPositions[fret-1])/2;
    			} else if (fret == 0) {
                    css = highlight ? "fretdot highlight" : "fretdot open";

    				// Draw the dot to the left of the nut
                    x = scope.fretboardLeft/2;
    			}
                svg.circle(x, y, 5, {class: css});
            };

            scope.render = function() {
                svg.clear();
                var fretboardWidth = 700;
                var fretboardHeight = 100;
                var stringThickness = 3;

                // I never want to think about this fret placement math again.
                for (var f = 1; f<=numFrets+1; ++f) {
                    scope.scaledFretPositions[f] = (scope.unscaledFretPositions[f]*fretboardWidth/
                        scope.unscaledFretPositions[numFrets]);
                }

                scope.stringSpacing = fretboardHeight / (strings-1);

                scope.fretboardLeft = (width-fretboardWidth)/2;
                scope.fretboardRight = scope.fretboardLeft + fretboardWidth;

                scope.fretboardTop = (height-fretboardHeight)/2;

                // fret nut
                var nutSpan = strings-1; // Number of strings this nut spans (see banjo)
                if (scope.instrument != null) {
                    for (var s = strings-1; s>=0; --s) {
                        if (scope.instrument.fretNutPositions[s] == 0) {
                            nutSpan = s;
                            break;
                        }
                    }
                }
                svg.rectangle(scope.fretboardLeft-10, scope.fretboardTop-5, 10, nutSpan * scope.stringSpacing+10, {fill: "#888", stroke: "none"});

                // fret markers
                var markedFrets = [3, 5, 7, 9];
                for (var i = 0; i<markedFrets.length; ++i) {
                    var fret = markedFrets[i];
                    if (fret > numFrets)
                        break;
                    var x = scope.fretboardLeft + scope.scaledFretPositions[fret] - (scope.scaledFretPositions[fret] - scope.scaledFretPositions[fret-1])/2;
                    var y = scope.fretboardTop + fretboardHeight/2;
                    svg.circle(x, y, 8, {class: "fret-marker"});
                }
                if (numFrets >= 12) {
                    var x = scope.fretboardLeft + scope.scaledFretPositions[12] - (scope.scaledFretPositions[12] - scope.scaledFretPositions[11])/2;
                    var y1 = scope.fretboardTop + fretboardHeight/2 - scope.stringSpacing;
                    var y2 = scope.fretboardTop + fretboardHeight/2 + scope.stringSpacing;
                    svg.circle(x, y1, 8, {class: "fret-marker"});
                    svg.circle(x, y2, 8, {class: "fret-marker"});
                }

                // frets
                var fretWidth = 4;
                for (var f = 1; f<numFrets; ++f) {
                    var x = scope.fretboardLeft + scope.scaledFretPositions[f] - fretWidth;
                    var fretSpan = strings-1; // Number of strings this fret spans (see banjo)
                    if (scope.instrument) {
                        for (var s = strings-1; s>=0; --s) {
                            if (scope.instrument.fretNutPositions[s] <= f) {
                                fretSpan = s;
                                break;
                            }
                        }
                    }
                    svg.rectangle(x, scope.fretboardTop, fretWidth, fretSpan*scope.stringSpacing, {fill: "#888", stroke: "none"});
                }

                // strings
                for (var s = 0; s<strings; ++s) {
                    var stringOffset = 0;
                    if (scope.instrument != null)
                        stringOffset = scope.scaledFretPositions[scope.instrument.fretNutPositions[s]];
                    var x = scope.fretboardLeft + stringOffset;
                    var y = scope.fretboardTop + s*scope.stringSpacing - stringThickness/2;
                    svg.rectangle(x, y, fretboardWidth-stringOffset, stringThickness, {fill: "#000", stroke: "none"});
                }

                // highlight the positions included in the selected chord
                if (scope.fretboard) {
                    for (var s = 0; s<strings; ++s) {
                        for (var f = 0; f<=numFrets; ++f) {
                            if (!scope.fretboard[s][f])
                                continue;

                            scope.drawFretdot(svg, s, f, true);
                        }
                    }
                }

                // highlight the selected fretdot
                if (scope.selectedFretdot)
                    scope.drawFretdot(svg, scope.selectedFretdot.string, scope.selectedFretdot.fret, true);

                // Draw selected chord fingering
                if (scope.chordFingering != null) {
                    for (var s = 0; s<strings; ++s) {
                        var f = scope.chordFingering.absoluteFrets[s];
                        scope.drawFretdot(svg, s, f, true);
                    }
                }
            };

            scope.getFretdotForPosition = function(x, y) {
                var string = Math.floor((y - scope.fretboardTop + scope.stringSpacing/2) / scope.stringSpacing);

                var offsetX = x - scope.fretboardLeft;
                var fret = scope.instrument.fretNutPositions[string];
                while (fret < numFrets) {
                    var fretX = scope.scaledFretPositions[fret];
                    if (fretX > offsetX)
                        break;
                    ++fret;
                }

                return {string: string, fret: fret};
            }

            element.click(function(event) {
                if (scope.selectOnClick) {
                    scope.selectedFretdot = scope.getFretdotForPosition(event.offsetX, event.offsetY);
                    scope.selectedNote = instrumentService.getNote(scope.instrument, scope.selectedFretdot.string, scope.selectedFretdot.fret);
                    scope.$apply();

                    scope.render();
                }
            });
        }
    };
}]);