angular.module('conchordance')
.directive('fretboardView', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            this.unscaledFretPositions = [0.0, 0.056, 0.109, 0.159, 0.206, 0.251, 0.293, 0.333, 0.370, 0.405, 0.439, 0.470, 0.5, 0.528, 0.555, 0.580, 0.603, 0.625, 0.646, 0.666, 0.685];
            this.scaledFretPositions = new Array(this.unscaledFretPositions.length);
            this.scaledFretPositions[0] = 0;

            this.canvas = Raphael(element[0], 0, 0, 800, 120);

            var self = this;

            scope.$on('instrument-selected', function(event, instrument) {
                self.instrument = instrument;
                scope.render();
            });

            scope.render = function() {
                var width = 800;
                var height = 120;

                var strings = self.instrument.tuning.length;
                var numFrets = self.instrument.frets;

                var fretboardWidth = 700;
                var fretboardHeight = 100;

                for (var f = 1; f<=numFrets+1; ++f) {
                    self.scaledFretPositions[f] = (self.unscaledFretPositions[f]*fretboardWidth/
                        self.unscaledFretPositions[numFrets]);
                }

                var stringSpacing = fretboardHeight/(strings-1);

                var fretboardLeft = (width-fretboardWidth)/2;
                var fretboardRight = fretboardLeft + fretboardWidth;

                var fretboardTop = (height-fretboardHeight)/2;

                self.canvas.clear();
                self.canvas.rect(0, 0, width, height, 0).attr({fill: "#fff", stroke: "none"});
                self.canvas.rect(fretboardLeft, fretboardTop, fretboardWidth, fretboardHeight, 0).attr({fill: "#fff", stroke: "#000"});

                // frets
                var fretWidth = 4;
                for (var f = 1; f<numFrets; ++f) {
                    var fx = fretboardLeft + self.scaledFretPositions[f] - fretWidth;
                    self.canvas.rect(fx, fretboardTop, fretWidth, fretboardHeight)
                        .attr({fill: "#888", stroke: "none"});
                }

                // strings
                var stringThickness = 3;
                for (var i = 0; i<strings; ++i) {
                    self.canvas.rect(fretboardLeft, fretboardTop+i*stringSpacing-stringThickness/2,
                        fretboardWidth, stringThickness).attr({fill: "#000", stroke: "none"});
                    self.canvas.path("M"+fretboardLeft+","+(fretboardTop+i*stringSpacing-stringThickness/2)+"H"+fretboardRight);
                    self.canvas.path("M"+fretboardLeft+","+(fretboardTop+i*stringSpacing+stringThickness/2)+"H"+fretboardRight);
                }

                // fret-nut
                self.canvas.rect(fretboardLeft-10, fretboardTop-5, 10, fretboardHeight+10).attr({fill: "#888", stroke: "none"});

                // TODO highlight the positions included in a selected chord

                // TODO highlight the positions included in a selected chord fingering
            };
        }
    }
});