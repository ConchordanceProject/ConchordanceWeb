angular.module('conchordance').service('$conchordance', function($http) {
    var requestBase = "http://api.conchordance.com/";
	this.getInstruments = function() {
		return $http({
			method: 'GET',
			url: requestBase + 'instruments'
		});
	};
	this.getFretboard = function(instrument, root, type) {
		return $http({
			method: 'GET',
			url: requestBase + 'fretboards',
			params: {
				instrument: instrument,
				type: type,
				root: root
			}
		});
	};
	this.getChordTypes = function() {
		return $http({
			method: 'GET',
			url: requestBase + 'chords/types'
		});
	};
	this.getChords = function(instrument, root, type) {
		return $http({
			method: 'GET',
			url: requestBase + 'chords/fingerings',
			params: {
				instrument: instrument,
				type: type,
				root: root
			}
		});
	};
    this.getChord = function(root, type) {
        return $http({
            method: 'GET',
            url: requestBase + 'chords',
            params: {
                type: type,
                root: root
            }
        });
    };
    this.getChordFingering = function(root, type, instrument, frets) {
        return $http({
            method: 'GET',
            url: requestBase + 'chords/fingering',
            params: {
                type: type,
                root: root,
                instrument: instrument,
                frets: frets
            }
        });
    };
    this.getAlternateFingerings = function(root, type, instrument, frets) {
        return $http({
            method: 'GET',
            url: requestBase + 'chords/alternate-fingerings',
            params: {
                type: type,
                root: root,
                instrument: instrument,
                frets: frets
            }
        });
    };
    this.getAllFingerings = function(instrument) {
        return $http({
             method: 'GET',
             url: requestBase + 'chords/all',
             params: {
                 instrument: instrument
             }
        });
    };
});