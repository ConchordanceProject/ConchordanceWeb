angular.module('conchordance')
.directive('fretboardView', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            element.addClass('fretboard');
        	
            scope.unscaledFretPositions = [0.0, 0.056, 0.109, 0.159, 0.206, 0.251, 0.293, 0.333, 0.370, 0.405, 0.439, 0.470, 0.5, 0.528, 0.555, 0.580, 0.603, 0.625, 0.646, 0.666, 0.685];
            scope.scaledFretPositions = new Array(scope.unscaledFretPositions.length);
            scope.scaledFretPositions[0] = 0;

            scope.canvas = Raphael(element[0], 0, 0, 800, 120);

            scope.$on('instrument-selected', function(event, instrument) {
                scope.instrument = instrument;
                scope.render();
            });

            scope.render = function() {
                var width = 800;
                var height = 120;

                var strings = scope.instrument.tuning.length;
                var numFrets = scope.instrument.frets;

                var fretboardWidth = 700;
                var fretboardHeight = 100;

                for (var f = 1; f<=numFrets+1; ++f) {
                    scope.scaledFretPositions[f] = (scope.unscaledFretPositions[f]*fretboardWidth/
                        scope.unscaledFretPositions[numFrets]);
                }

                var stringSpacing = fretboardHeight/(strings-1);

                var fretboardLeft = (width-fretboardWidth)/2;
                var fretboardRight = fretboardLeft + fretboardWidth;

                var fretboardTop = (height-fretboardHeight)/2;

                scope.canvas.clear();
                scope.canvas.rect(0, 0, width, height, 0).attr({fill: "#fff", stroke: "none"});
                scope.canvas.rect(fretboardLeft, fretboardTop, fretboardWidth, fretboardHeight, 0).attr({fill: "#fff", stroke: "#000"});

                // frets
                var fretWidth = 4;
                for (var f = 1; f<numFrets; ++f) {
                    var fx = fretboardLeft + scope.scaledFretPositions[f] - fretWidth;
                    scope.canvas.rect(fx, fretboardTop, fretWidth, fretboardHeight)
                        .attr({fill: "#888", stroke: "none"});
                }

                // strings
                var stringThickness = 3;
                for (var i = 0; i<strings; ++i) {
                    scope.canvas.rect(fretboardLeft, fretboardTop+i*stringSpacing-stringThickness/2,
                        fretboardWidth, stringThickness).attr({fill: "#000", stroke: "none"});
                    scope.canvas.path("M"+fretboardLeft+","+(fretboardTop+i*stringSpacing-stringThickness/2)+"H"+fretboardRight);
                    scope.canvas.path("M"+fretboardLeft+","+(fretboardTop+i*stringSpacing+stringThickness/2)+"H"+fretboardRight);
                }

                // fret-nut
                scope.canvas.rect(fretboardLeft-10, fretboardTop-5, 10, fretboardHeight+10).attr({fill: "#888", stroke: "none"});

                // TODO highlight the positions included in a selected chord

                // TODO highlight the positions included in a selected chord fingering
            };
        }
    }
});