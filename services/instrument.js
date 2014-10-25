angular.module('conchordance')
.factory('instrument', function() {
    return {
        getNote: function(instrument, string, fret) {
            if (fret == 0) {
                return instrument.tuning[string];
            }

            var halfSteps = instrument.tuning[string].halfSteps + fret;
            var octave = Math.floor(halfSteps / 12);
            var offsetFromC = halfSteps % 12;

            var noteNames = ['C', 'C', 'D', 'D', 'E', 'F', 'F', 'G', 'G', 'A', 'A', 'B'];
            var modifiers = [0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0];
            var noteName = noteNames[offsetFromC];
            var modifier = modifiers[offsetFromC];

            return {
                noteName: noteName,
                modifier: modifier,
                octave: octave,
                halfSteps: halfSteps
            }
        }
    };
});