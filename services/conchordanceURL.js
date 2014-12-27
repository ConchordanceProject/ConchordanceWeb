angular.module('conchordance')
    .factory('conchordanceURL', ['$location', function($location) {
        return {
            showParameters: function(parameters, root, chordType, instrument, chordFingering) {
                // If a root and chord type are given, show that in the URL
                if (root && chordType) {
                    var chordParam = root + "-" + chordType.name;
                    $location.search('chord', chordParam);
                    parameters.root = root;
                    parameters.chordType = chordType.name;
                } else {
                    parameters.root = null;
                    parameters.chordType = null;
                }

                // If a chord fingering is given, show its shape in the URL
                if (chordFingering) {
                    var fingerString = "";
                    var frets = chordFingering.capoRelativeFrets;
                    var numStrings = chordFingering.notes.length;
                    for (var s = numStrings-1; s>0; --s)
                        fingerString += (frets[s] == -1 ? "x" : frets[s]) + "-";
                    fingerString += frets[0] == -1 ? "x" : frets[0]

                    $location.search('position', fingerString);
                    parameters.position = fingerString;
                } else {
                    parameters.position = null;
                }

                // If an instrument is given, show its name in the URL
                if (instrument) {
                    $location.search('instrument', instrument.name);
                    parameters.instrumentName = instrument.name;
                } else {
                    parameters.instrumentName = null;
                }
            },

            readParameters: function(defaults) {
                var search = $location.search();

                // Read the instrument name
                var instrumentName;
                if (search.instr)
                    instrumentName = decodeURIComponent(search.instr);
                else
                    instrumentName = defaults.instrumentName;

                var position = search.position;

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
                    chordTypeName: chordTypeName,
                    position: position
                }
            }
        };
    }]);
