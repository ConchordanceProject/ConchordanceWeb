angular.module('conchordance')
    .factory('conchordanceURL', ['$location', function($location) {
        return {
            showChordParameter: function(selections) {
                if (selections.root && selections.chordType)
                    $location.search('chord', selections.root + "-" + selections.chordType.name);
            },

            showFingeringParameter: function(selections) {
                if (selections.chordFingering) {
                    var fingerString = "";
                    var frets = selections.chordFingering.capoRelativeFrets;
                    for (var s = selections.chordFingering.numStrings-1; s>=0; --s)
                        fingerString += frets[s] == -1 ? "x" : frets[s] ;

                    $location.search('position', fingerString);
                }
            },

            showInstrumentParameter: function(selections) {
                if (selections.instrument)
                    $location.search('instr', selections.instrument.name);
            },

            readParameters: function(defaults) {
                var search = $location.search();

                // Read the instrument name
                var instrumentName;
                if (search.instr)
                    instrumentName = decodeURIComponent(search.instr);
                else
                    instrumentName = defaults.instrumentName;

                // Parse the root and chord type
                var root;
                var chordTypeName
                if (search.chord) {
                    var decodedChord = decodeURIComponent(search.chord);
                    var delimiterIndex = decodedChord.indexOf('-');
                    root = decodedChord.substring(0, delimiterIndex);
                    chordTypeName = decodedChord.substring(delimiterIndex + 1);
                } else {
                    root = defaults.root;
                    chordTypeName = defaults.chordTypeName;
                }

                return {
                    instrumentName: instrumentName,
                    root: root,
                    chordTypeName: chordTypeName
                }
            }
        };
    }]);
